'use client';
import { useGetFlashSaleById } from '@/api/client/flashsales';
import ModalConfirmBuyAccountFlashSale from '@/components/ModalConfirmBuyAccountFlashSale/ModalConfirmBuyAccountFlashSale';
import CountDown from '@/lib/CountDown/CountDown';
import { checkInTime } from '@/utils/formatDate';
import { formatNumber } from "@/utils/formatNumber";
import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Flex,
    Image,
    Text,
    Title
} from "@mantine/core";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function PageDetailAccountGameFashSale() {
    const { id, index } = useParams();
    const [inTimeSale, setInTimeSale] = useState();
    const { data, isLoading, isError, error } = useGetFlashSaleById(id);

    useEffect(() => {
        if (data?.result?.startDateTimeAt && data?.result?.endDateTimeAt) {
            setInTimeSale(checkInTime(data.result.startDateTimeAt, data.result.endDateTimeAt));
        }
    }, [data])

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p>Error loading data: {error.message}</p>;

    const account = data?.result?.flashSaleAccounts ? data?.result?.flashSaleAccounts[index] : {};
    const originalPrice = account?.price || 0;
    const discount = account?.discount || 0;
    const discountedPrice = originalPrice - (originalPrice * discount / 100);

    return (
        <>
            <Container size="lg" p="md">
                <Flex
                    direction={{ base: "column", md: "row" }}
                    gap="lg"
                    justify="space-between"
                    align={{ base: "flex-start", md: "flex-start" }}
                >
                    <Box className=' md:flex-[0.6]'>
                        {account?.imageUrl &&
                            <Image
                                src={account?.imageUrl}
                                alt="anh_account_flash_sale"
                                radius="sm"
                                mb="sm"
                                width="100%"
                            />
                        }
                    </Box>

                    <Box className='w-full md:flex-[0.4]'>
                        <Card shadow='md' className='flex flex-col gap-3'>
                            <Box className='flex justify-center xs:justify-between gap-4 flex-wrap items-center mb-3 bg-[#1f2c64] p-3 rounded-t-xl'>
                                <Text size='20px' fw={700} className='whitespace-nowrap text-white'>FLASH SALE</Text>
                                <CountDown endDateTimeAt={data?.result?.endDateTimeAt} />
                            </Box>
                            <Title order={2}>{account?.title}</Title>
                            <Box className='flex items-center'>
                                <Box className='flex flex-col gap-4'>
                                    <Text size='xs'><strong>Mã tài khoản:</strong>{account?.accountId}</Text>
                                    {account?.description &&
                                        <Box className="flex gap-3 items-center">
                                            <Text size='sm'>{account?.description}</Text>
                                        </Box>
                                    }
                                </Box>
                                <Box className='ml-8'>
                                    {inTimeSale == "out_time" && (
                                        <Box>
                                            <Image src='/images/pngegg.png' alt="badge-sold-out" className='w-20' />
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                            {account?.discount && <Box>
                                <Text size="lg" style={{ color: "#848383", textDecoration: "line-through" }}>
                                    {formatNumber(originalPrice)}đ
                                </Text>
                            </Box>
                            }

                            <Box mb="md" className='flex items-center justify-between'>
                                <Text size="32px" style={{ color: "green", fontWeight: 700 }}>
                                    {formatNumber(discountedPrice)}đ
                                </Text>
                                {account?.discount && <Badge color="red" variant="filled">
                                    Giảm giá {account.discount}%
                                </Badge>}
                            </Box>

                            {
                                data?.result?.startDateTimeAt && (
                                    <Box className="flex justify-center mt-2">
                                        {inTimeSale == "out_time" && <Button className='w-full' color="#1f2c64" disabled>Đã hết thời gian sale</Button>}
                                        {inTimeSale == "future" && <Button className='w-full' color="#1f2c64" disabled>Chưa đến giờ sale</Button>}
                                        {inTimeSale == "in_time" && <ModalConfirmBuyAccountFlashSale account={account} index={index} id={data?.result?._id} />}
                                    </Box>
                                )
                            }
                        </Card>
                    </Box>
                </Flex>
            </Container>
        </>
    );
}

export default PageDetailAccountGameFashSale;
