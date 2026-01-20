'use client'
import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Image, Text } from '@mantine/core';
import Link from 'next/link';
import useClientConfigStore from '@/stores/clientConfig';

function SectionServices() {
    const { zaloUrl, messUrl } = useClientConfigStore((state) => ({
        zaloUrl: state.clientConfig.zaloUrl,
        messUrl: state.clientConfig.messUrl
    }));

    const services = [
        {
            label: 'Nạp tiền ngay',
            icon: 'money.png',
            link: '/tai_khoan/nap_the_cao',
        },
        {
            label: 'Acc giá rẻ',
            icon: 'acc_game.png',
            link: '/danh_sach_danh_muc/tai_khoan_dong_gia',
        },
        {
            label: 'Thu mua acc',
            icon: 'zalo.png',
            link: zaloUrl,
        },
        {
            label: 'Mini game',
            icon: 'lucky.png',
            link: '/danh_sach_vong_quay_may_man',
        },
        {
            label: 'CSKH 24/7',
            icon: 'care_customer.png',
            link: messUrl,
        },
    ];

    return (
        <Carousel
            slideSize="20%"
            slideGap="md"
            align="start"
            breakpoints={[
                { maxWidth: 'sm', slideSize: '50%' },
                { maxWidth: 'md', slideSize: '33.3333%' },
                { maxWidth: 'lg', slideSize: '25%' },
            ]}
            loop
        >
            {services.map((service, index) => (
                <Carousel.Slide key={index}>
                    <Link href={service.link || '#'} className="flex flex-col gap-2 justify-center items-center min-w-[120px]">
                        <Image src={`/images/${service.icon}`} alt={service.label} className="w-10 h-10" />
                        <Text size='xs' fw={500}>{service.label}</Text>
                    </Link>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}

export default SectionServices;
