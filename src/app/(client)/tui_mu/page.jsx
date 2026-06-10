'use client';
import { useGetLuckyWheel } from "@/api/client/luckywheel";
import styles from '@/components/SectionLuckyWheel/SectionLuckyWheel.module.css';
import { LIMIT } from "@/constants/common";
import CardLuckyWheel from "@/lib/CardLuckyWheel/CardLuckyWheel";
import { Box, Pagination, Text } from "@mantine/core";
import { useState } from 'react';

function ListBlindBag() {
    const limit = LIMIT;
    const [currentPage, setCurrentPage] = useState(1);

    const { data } = useGetLuckyWheel({
        page: currentPage,
        limit,
        status: 'active',
        type: 'blind_bag',
    });

    return (
        <>
            <main className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                <Text size="xl" fw={600}>🎁 Túi mù</Text>
                <Box>
                    <Box className={styles.gridContainer}>
                        {
                            data?.result?.items?.map((item) => (
                                <CardLuckyWheel key={item._id} card={item} basePath="/tui_mu" />
                            ))
                        }
                    </Box>
                </Box>
                <Box className="flex justify-center mt-6">
                    <Pagination
                        size='md'
                        value={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                        total={Math.ceil(data?.result?.totalItems / limit)}
                    />
                </Box>
            </main>
        </>
    );
}

export default ListBlindBag;
