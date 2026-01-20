import CardCate from "@/lib/CardCate/CardCate";
import { Box, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import styles from './SectionCate.module.css';
import { getCategory } from "@/api/client/category";
import { PATH_TYPE_CATEGORY, TYPE_CATE_RANDOM_GAME_ACCOUNT } from "@/constants/common";
import ClientsLucky from "../ClientsLucky/ClientsLucky";

export default async function SectionCate(props) {
    const data = await getCategory({
        page: '1',
        limit: '10',
        type: props.type
    });

    let translatePath = "";
    PATH_TYPE_CATEGORY.map((item) => {
        if (props.type == item.value) {
            translatePath = item.link;
        }
    })

    return (
        <Box>
            <Box className='flex justify-between items-center gap-2'>
                <Text className="font-semibold text-md md:text-xl lg:text-2xl mb-4 mt-3">{props.title}</Text>
                <Link href={`/danh_sach_danh_muc/${translatePath}`} className='text-[#1f2c64] flex gap-[2px] items-center'>
                    <Text className='font-medium text-sm hover:font-semibold'>Xem thêm </Text>
                    <IconChevronRight size={13} /></Link>
            </Box>
            {props.type == TYPE_CATE_RANDOM_GAME_ACCOUNT &&
                <Box>
                    <ClientsLucky />
                </Box>
            }
            <Box className={styles.gridContainer}>
                {
                    data?.result?.items?.map((cate, index) => {
                        return (
                            <CardCate key={cate._id} card={cate} />
                        )
                    })
                }
            </Box>
        </Box>
    );
}
