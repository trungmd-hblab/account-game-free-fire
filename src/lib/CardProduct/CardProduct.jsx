'use client'
import ModalConfirmBuyAccount from "@/components/ModalConfirmBuyAccount/ModalConfirmBuyAccount";
import { LOGIN_TYPE_ACCOUNT } from "@/constants/common";
import { formatNumber } from "@/utils/formatNumber";
import { Badge, Box, Card, Image as ImageMantine, Text } from "@mantine/core";
import { createStyles } from '@mantine/emotion';
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalCheckLogin from "../ModalCheckLogin/ModalCheckLogin";

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
    },
}));

function CardProduct(props) {
    const { card } = props;
    const { classes } = useStyles();
    const [opened, setOpend] = useState(false)
    const router = useRouter();


    const originalPrice = card?.price || 0;
    const discount = card?.discountPercent || 0;
    const discountedPrice = originalPrice - (originalPrice * discount / 100)

    let loginType = ''
    LOGIN_TYPE_ACCOUNT.map((item) => {
        if (item.value == card?.loginType) {
            loginType = item.label
        }
    })

    const handleViewDetailAccount = (id) => {
        router.push(`/tai_khoan_game/${id}`)
    }

    return (
        <Card
            className={`${classes.card}`}
            style={{
                position: 'relative',
            }}

        >
            <Box onClick={() => handleViewDetailAccount(card._id)}>
                {card?.thumbnailUrl &&
                    <ImageMantine
                        src={card?.thumbnailUrl }
                        alt="anh-san-pham"
                        className={classes.image}
                    />
                }
            </Box>
            <Box className={classes.content} onClick={() => handleViewDetailAccount(card._id)}>
                <Text className={classes.title}>{card?.category[0]?.title}</Text>
                <Text className={classes.description}>{card?.description}</Text>
                {card?.loginType && <Text size="xs" mt='2px'>Đăng nhập: {loginType}</Text>}
                {discount > 0 && (
                    <Text className={classes.discountedPrice}>
                        {formatNumber(discountedPrice)}đ
                    </Text>
                )}
                <Box className={classes.priceContainer}>
                   {originalPrice > 0 && <Text className={discount > 0 ? classes.price : classes.discountedPrice}>{formatNumber(originalPrice)}đ</Text> } 
                    {discount > 0 && (
                        <Badge className={classes.discountBadge} color="red">
                            {discount}% OFF
                        </Badge>
                    )}
                </Box>
            </Box>
            <ModalConfirmBuyAccount account={card} />
            <ModalCheckLogin opened={opened} setOpend={setOpend} />
        </Card>
    );
}

export default CardProduct;
