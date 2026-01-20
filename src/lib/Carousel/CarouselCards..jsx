import { Carousel } from "@mantine/carousel";
import { Box } from '@mantine/core';
import BadgeSoldOut from '../BadgeSoldOut/BadgeSoldOut';
import CardFlashSale from "../CardFlashSale/CardFlashSale";
import classes from './CarouselCards.module.css';

function CarouselCards(props) {
    const { slides, isInTimeSale, cateId } = props;

    const renderCardsFlashSale = () => {
        return slides?.map((product, index) => (
            <Carousel.Slide key={index} style={{ position: 'relative' }}>
                <CardFlashSale card={product} isInTimeSale={isInTimeSale} cateId={cateId} index={index}/>
                {isInTimeSale && (
                <Box className='absolute' style={{top:'calc(50% - 50px)', left:'calc(50% - 56px)'}}>
                    <BadgeSoldOut />
                </Box>
                )} 
            </Carousel.Slide>
        ));
    };

    return (
        <Carousel
            withIndicators
            slideSize={{ base: '50%', sm: '31%', md: '25%', lg:'20%'}}
            slideGap="sm"
            loop={true}
            align="start"
            controlSize={40}
            classNames={{ control: classes.control }}
        >
            {renderCardsFlashSale()}
        </Carousel>
    );
}

export default CarouselCards;
