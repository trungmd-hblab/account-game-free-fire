'use client';
import { useGetClientsLucky } from "@/api/client/clientsLucky";
import { Box, Text } from "@mantine/core";
import { useEffect, useState } from 'react';
import classes from './ClientsLucky.module.css';
import { QueryProvider } from "../Providers/QueryProvider";

export default function ClientsLucky() {
    const [scrollingText, setScrollingText] = useState('');
    const { data: data, isLoading } = useGetClientsLucky();

    useEffect(() => {
        if (data?.result && data.result?.clients?.length > 0) {
            const messages = data.result?.clients?.map(item => {
                const clientId = item?.clientId?.slice(3);
                return `chúc mừng ***${clientId} đã trúng thưởng tài khoản game siêu vip, `;
            });
            setScrollingText("Danh sách trúng thưởng: " + messages.join(' '));
        }
    }, [data]);

    return (
        <QueryProvider>
            <Box className="relative px-3 rounded-b-2xl">
                {scrollingText && (
                    <Box className={`absolute top-0 w-full py-1 text-center z-10 ${classes.scrolling_text_container}`}>
                        <Text size="md" className={`${classes.scrolling_text}`}>{scrollingText}</Text>
                    </Box>
                )}
            </Box>
        </QueryProvider>
    );
}
