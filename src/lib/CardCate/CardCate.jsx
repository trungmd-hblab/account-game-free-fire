'use client'
import { formatNumber } from "@/utils/formatNumber";
import { Badge, Box, Button, Card, Image as ImageMantine, Text } from "@mantine/core";
import { createStyles } from "@mantine/emotion";
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
    marginBottom: theme.spacing.xs,
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

function CardCate(props) {
  const { card } = props;
  const { classes } = useStyles();
  const router = useRouter();
  const handleGetListCard = (id) => {
    router.push(`/danh_muc/${id}`)
  }

  const originalPrice = card?.price || 0;
  const discount = card?.discountPercent || 0;
  const discountedPrice = originalPrice - (originalPrice * discount / 100)


  return (
    <Card
      className={`${classes.card}`}
      style={{
        position: 'relative',
      }}
      onClick={() => handleGetListCard(card._id)}
    >
      <Box>
        {card?.thumbnailUrl &&
          <ImageMantine
            src={card?.thumbnailUrl}
            alt="anh-danh-muc-san-pham"
            className={classes.image}
          />
        }
      </Box>
      <Box className={classes.content}>
        <Text className={classes.title}>{card?.title}</Text>
        <Text className={classes.description}>{card?.description}</Text>
        {card?.availableItemCount && <Text className={classes.description}><strong>Số tài khoàn: </strong>{card?.availableItemCount}</Text>}
        {discount > 0 && (
          <Text className={classes.discountedPrice}>
            {formatNumber(discountedPrice)}đ
          </Text>
        )}
        <Box className={classes.priceContainer}>
          {originalPrice > 0 && <Text className={discount > 0 ? classes.price : classes.discountedPrice}>{formatNumber(originalPrice)}đ</Text>}
          {discount > 0 && (
            <Badge className={classes.discountBadge} color="red">
              {discount}% OFF
            </Badge>
          )}
        </Box>
      </Box>
      <Button color="#1f2c64" className="mt-3" >Mua ngay</Button>
    </Card>
  );
}

export default CardCate;
