import CardLuckyWheel from "@/lib/CardLuckyWheel/CardLuckyWheel";
import { Box, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import styles from './SectionLuckyWheel.module.css';
import Link from "next/link";
import { getLuckyWheel } from "@/api/client/luckyWheelHomePage";

async function SectionLuckyWheel(props) {
    const data = await getLuckyWheel({
        page: '1',
        limit: '10',
        status: 'active'
    });
    const page = 1;

    return (
        <Box>
            <Box className='flex justify-between items-center gap-2'>
                <Text className="font-semibold text-md md:text-xl lg:text-2xl mb-4 mt-3">{props.title}</Text>
                <Link href={`/danh_sach_vong_quay_may_man`} className='text-[#1f2c64] flex gap-[2px] items-center'>
                    <Text className='font-medium text-sm hover:font-semibold'>Xem thêm </Text>
                    <IconChevronRight size={13} />
                </Link>
            </Box>
            <Box className={styles.gridContainer}>
                {
                    data?.result?.items?.map((cate, index) => {
                        return (
                            <CardLuckyWheel key={cate._id} card={cate} />
                        )
                    })
                }
            </Box>
        </Box>
    );
}

export default SectionLuckyWheel;