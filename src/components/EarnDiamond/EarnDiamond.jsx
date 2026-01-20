'use client'

import { Box, Image } from "@mantine/core";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EarnDiamond() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const hiddenIcon = Cookies.get('hidden-icon');
        if (hiddenIcon) {
            setIsVisible(false);
        }

        const handlePageReload = () => {
            Cookies.remove('hidden-icon');
        };

        window.addEventListener('beforeunload', handlePageReload);

        return () => {
            window.removeEventListener('beforeunload', handlePageReload);
        };
    }, []);

    const handleClose = () => {
        Cookies.set('hidden-icon', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <Box className="fixed bottom-10 z-50">
            <Box className="relative p-2">
                <Image
                    src="/images/close-icon.png"
                    className="w-5 absolute top-0 right-0 cursor-pointer"
                    onClick={handleClose}
                    alt="close"
                />
                <Link href="/diem_danh_nhan_kim_cuong">
                    <Image
                        src="/images/earn_diamond.gif"
                        className="w-24 md:w-28 cursor-pointer"
                        alt="diamond"
                    />
                </Link>
            </Box>
        </Box>
    );
}
