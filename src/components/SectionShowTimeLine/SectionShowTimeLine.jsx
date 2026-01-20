'use client'
import CountDown from '@/lib/CountDown/CountDown';
import { checkInRangeTime, checkTimeInRange, getTimeGMT7 } from '@/utils/formatDate';
import { Box, Image, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import LoadingCards from '../LoadingCards/LoadingCards';
import classes from './SectionShowTimeLine.module.css';
import { getUserByInFlashSale, useGetUserByInFlashSale } from '@/api/client/flashsales';
import CarouselCards from '@/lib/Carousel/CarouselCards.';

function SectionShowTimeLine(props) {
    const { sales } = props;
    const [saleIdCurrent, setSaleIdCurrent] = useState(sales ? sales[0]?._id : '');
    const [currentSale, setCurrentSale] = useState(sales ? sales[0] : []);
    const [loading, setLoading] = useState(false);
    const [isOutRangeTime, setIsOutRangeTime] = useState(false);
    const [scrollingText, setScrollingText] = useState('');

    const { data: clients, isLoading: clientsLoading, refetch: refetchClients } = useGetUserByInFlashSale(false);

    useEffect(() => {
        const getCurrentSale = sales?.find(sale => sale._id === saleIdCurrent);
        if (getCurrentSale) {
            const newDate = new Date();
            const startDate = new Date(getCurrentSale.startDateTimeAt);

            const updateSaleData = async () => {
                try {
                    if (startDate.getTime() <= newDate.getTime() && newDate.getTime() <= startDate.getTime() + 30 * 1000) {
                        setLoading(true);
                    } else {
                        setIsOutRangeTime(true);
                        setCurrentSale(getCurrentSale);
                        setLoading(false);
                        await refetchClients();

                        if (clients?.result && clients?.result?.length > 0) {
                            const messages = clients?.result?.map(item => {
                                const clientId = item.clientId.slice(3);
                                const accountId = item.accountId;
                                return `***${clientId} đã mua thành công tài khoản ${accountId}, `;
                            });
                            setScrollingText("Danh sách mua thành công: " + messages.join(' '));
                        }
                    }
                } catch (error) {
                    console.error('Error fetching flash sale data:', error);
                }
            };

            updateSaleData();
        }
    }, [saleIdCurrent, sales, clients, refetchClients]);

    const handleClickTimeLine = (sale) => {
        setSaleIdCurrent(sale._id);
        setIsOutRangeTime(false);
    };

    const renderTimeLine = (
        sales?.map((sale) => (
            <Box bg={sale._id === saleIdCurrent ? '#b91c1c' : '#fafaf9'} className={`px-6 py-1 text-center cursor-pointer min-w-[135px]`} key={sale._id} onClick={() => handleClickTimeLine(sale)}>
                <Text color={sale._id === saleIdCurrent ? '#fafaf9' : '#000'} size='lg' fw={600}>{getTimeGMT7(sale.startDateTimeAt)}</Text>
                <Text color={sale._id === saleIdCurrent ? '#fafaf9' : '#000'} size='sm' fw={600}>{checkTimeInRange(sale.startDateTimeAt, sale.endDateTimeAt)}</Text>
            </Box>
        ))
    );

    return (
        sales && sales.length ? (
            <>
                <Box>
                    <Box className='flex justify-center xs:justify-between gap-4 flex-wrap items-center mb-3 bg-[#1f2c64] p-3 rounded-t-xl'>
                        <Text size='20px' fw={700} className='whitespace-nowrap text-white'>FLASH SALE</Text>
                        <CountDown endDateTimeAt={currentSale?.endDateTimeAt} />
                    </Box>
                    <Box className='flex gap-[1px] overflow-x-auto bg-[#fafaf9] mx-3 mb-3' >
                        {renderTimeLine}
                    </Box>
                </Box>
                <Box className="relative pb-4 px-3 rounded-b-2xl">
                    {clientsLoading || loading ? (
                        <LoadingCards />
                    ) : (
                        <>
                            {scrollingText && (
                                <Box className={`absolute top-0 w-full py-1 text-center z-10 ${classes.scrolling_text_container}`}>
                                    <Text size="md" className={`${classes.scrolling_text}`}>{scrollingText}</Text>
                                </Box>
                            )}
                            <CarouselCards cateId={currentSale._id} slides={currentSale?.flashSaleAccounts} isInTimeSale={checkInRangeTime(currentSale?.startDateTimeAt, currentSale?.endDateTimeAt)} />
                        </>
                    )}
                </Box>
            </>
        ) : (
            <></>
        )
    );
}

export default SectionShowTimeLine;
