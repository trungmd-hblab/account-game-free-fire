import React from 'react';
import { Skeleton, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import classes from '../../lib/Carousel/CarouselCards.module.css'

function LoadingCards() {
    // Sử dụng các media queries để xác định số lượng card hiển thị
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
    const isDesktop = useMediaQuery('(min-width: 1025px)');

    let numCards = 2; // Mặc định là 2 card cho mobile
    if (isTablet || isDesktop) {
        numCards = 4; // 4 card cho tablet và desktop
    }

    return (
        <Carousel
            withIndicators
            slideSize={{ base: '50%', sm: '50%', md: '33.333333%', lg: '25%' }}
            slideGap={{ base: 'xs', sm: 'sm' }}
            loop={true}
            align="start"
            controlSize={40}
            classNames={{ control: classes.control }}
        >
            {Array.from({ length: 10 }).map((_, index) => (
                <Carousel.Slide key={index} style={{ position: 'relative' }}>
                    <Box style={{ background: '#fff', padding: '12px', borderRadius: '12px', flex: '1 0 21%' }}>
                        <Skeleton visible={true} height={150} radius="md" mb={10} />
                        <Skeleton visible={true} height={20} width='90%' mb={8} />
                        <Skeleton visible={true} height={20} width='80%' mb={8} />
                        <Skeleton visible={true} height={20} width='50%' mb={8} />
                        <Box className='flex gap-2 justify-between'>
                            <Skeleton visible={true} height={20} width='50%' mb={8} />
                            <Skeleton visible={true} height={20} width='20%' mb={8} />
                        </Box>
                    </Box>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}

export default LoadingCards;
