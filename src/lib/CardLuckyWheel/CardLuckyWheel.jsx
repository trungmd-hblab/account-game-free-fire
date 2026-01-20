'use client'
import { formatNumber } from "@/utils/formatNumber";
import { Box, Button, Card, Image as ImageMantine, Text } from "@mantine/core";
import { createStyles } from '@mantine/emotion';
import { useRouter } from "next/navigation";

const useStyles = createStyles((theme, _, u) => ({
    card: {
        height: '100%',
        padding: '10px',
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },
    image: {
        minHeight: '100px',
        width: '100%',
        objectFit: 'cover',
        borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
    },
    content: {
        paddingTop: theme.spacing.xs,
    },
    title: {
        fontSize: theme.fontSizes.md,
        fontWeight: 600,
    },
    description: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginTop: '4px'
    },
    price: {
        fontSize: theme.fontSizes.sm,
        fontWeight: 400,
        color: theme.colors.gray[6],
        textDecoration: 'line-through',
    },
    discountedPrice: {
        fontSize: theme.fontSizes.md,
        fontWeight: 600,
        color: theme.colors.green[6],
        marginTop: '8px',
    },
}));

function CardLuckyWheel(props) {
    const { card } = props;
    const { classes } = useStyles();
    const router = useRouter();

    const handleViewDetailAccount = (id) => {
        router.push(`/vong_quay_may_man/${id}`)
    }

    return (
        <Card
            className={`${classes.card}`}
            style={{
                position: 'relative',
            }}
            onClick={() => handleViewDetailAccount(card._id)}
        >
            <Box
                style={{
                    backgroundImage: 'url(/images/bg-default.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                }} >
                {card?.coverImageUrl &&
                    <ImageMantine
                        src={card?.thumbnailUrl ? card?.thumbnailUrl : card?.coverImageUrl}
                        alt="anh-san-pham"
                        className={classes.image}
                    />
                }
            </Box>
            <Box className={classes.content} >
                <Text className={classes.title}>{card?.name}</Text>
                <Text className={classes.description}>{card?.description}</Text>
                {card?.fee?.value > 0 && <Text className={classes.discountedPrice}>{formatNumber(card?.fee?.value)}đ</Text>}
            </Box>
            <Button color="#1f2c64" className="mt-3 w-full" >Chơi ngay</Button>
        </Card>
    );
}

export default CardLuckyWheel;
