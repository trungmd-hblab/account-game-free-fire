import CardLuckyWheel from "@/lib/CardLuckyWheel/CardLuckyWheel";
import { Box, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import styles from './SectionLuckyWheel.module.css';
import Link from "next/link";
import { getLuckyWheel } from "@/api/client/luckyWheelHomePage";

async function SectionLuckyWheel(props) {
    const { title, type, listPath = '/danh_sach_vong_quay_may_man' } = props;
    const data = await getLuckyWheel({
        page: '1',
        limit: '10',
        status: 'active',
        ...(type ? { type } : {}),
    });

    const basePath = type === 'blind_bag' ? '/tui_mu' : '/vong_quay_may_man';

    return (
        <Box>
            <Box className='flex justify-between items-center gap-2'>
                <Text className="font-semibold text-md md:text-xl lg:text-2xl mb-4 mt-3">{title}</Text>
                <Link href={listPath} className='text-[#1f2c64] flex gap-[2px] items-center'>
                    <Text className='font-medium text-sm hover:font-semibold'>Xem thêm </Text>
                    <IconChevronRight size={13} />
                </Link>
            </Box>
            <Box className={styles.gridContainer}>
                {
                    data?.result?.items?.map((cate) => (
                        <CardLuckyWheel key={cate._id} card={cate} basePath={basePath} />
                    ))
                }
            </Box>
        </Box>
    );
}

export default SectionLuckyWheel;