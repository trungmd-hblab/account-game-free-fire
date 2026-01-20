'use client';
import { useGetDetailAccount } from '@/api/client/detailAccount';
import ModalConfirmBuyAccount from "@/components/ModalConfirmBuyAccount/ModalConfirmBuyAccount";
import SliderCards from "@/components/SliderCards/SliderCards";
import { LOGIN_TYPE_ACCOUNT, RANKS } from "@/constants/common";
import { formatNumber } from "@/utils/formatNumber";
import {
    Badge,
    Box,
    Container,
    Flex,
    Image,
    Text,
    Title
} from "@mantine/core";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function PageDetailAccountGame() {
    const [rank, setRank] = useState('')
    const [account, setAccount] = useState({})
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetDetailAccount(id);

    useEffect(() => {
        setAccount(data?.result)
        setRank(data?.result?.rank)

    }, [data])

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p>Error loading data: {error.message}</p>;

    const originalPrice = account?.price || 0;
    const discount = account?.discountPercent || 0;
    const discountedPrice = originalPrice - (originalPrice * discount / 100);

    let loginType = '';
    LOGIN_TYPE_ACCOUNT.forEach((item) => {
        if (item.value === account?.loginType) {
            loginType = item.label;
        }
    });



    return (
        <>
            <Container size="lg" p="md">
                <Flex
                    direction={{ base: "column", md: "row" }}
                    gap="xl"
                    justify="space-between"
                    align={{ base: "flex-start", md: "flex-start" }}
                >
                    <Box className='w-full  md:flex-[0.6]'>
                        <Box>
                            {account?.imageUrls && account?.imageUrls.length > 0 && account?.imageUrls.map((url, index) => (
                                url ? <Image key={index} src={url} alt={`Slide ${index}`} radius="sm" width="100%" /> : <></>
                            ))}
                            {account?.imageUrls && account?.imageUrls.length == 0 && account.thumbnailUrl &&
                                <Image src={account.thumbnailUrl} alt='Anh_minh_hoa_tai_khoan' radius="sm" width="100%" />
                            }

                        </Box>
                    </Box>

                    <Box className='w-full md:flex-[0.4] flex flex-col gap-3'>
                        <Title order={2}>Thông tin tài khoản</Title>
                        {account?.code && <Text size='xs'><strong>Mã tài khoản:</strong>#{account?.code}</Text>}
                        {account?.loginType && <Box>
                            <Text size="sm"><strong>Đăng nhập bằng:  </strong>{loginType}</Text>
                        </Box>}

                        {account?.rank &&
                            <Box className="flex gap-2 items-center">
                                <Box className='flex items-center gap-2'><strong >Rank:</strong>
                                    {rank == RANKS[0] && <Badge size="xs" color="rgba(255, 173, 250, 1)">Không hạng</Badge>}
                                    {rank == RANKS[1] && <Badge size="xs" color="rgba(196, 155, 108, 1)">Đồng</Badge>}
                                    {rank == RANKS[2] && <Badge size="xs" color="gray">Bạc</Badge>}
                                    {rank == RANKS[3] && <Badge size="xs" color="yellow">Vàng</Badge>}
                                    {rank == RANKS[4] && <Badge size="xs" color="cyan">Tinh anh</Badge>}
                                    {rank == RANKS[5] && <Badge size="xs" color="blue">Kim cương</Badge>}
                                    {rank == RANKS[6] && <Badge size="xs" color="pink">Cao thủ</Badge>}
                                </Box>
                            </Box>
                        }
                        {account?.discountPercent && <Box >
                            <Text size="lg" style={{ color: "#848383", textDecoration: "line-through" }}>
                                {formatNumber(originalPrice)}đ
                            </Text>
                        </Box>
                        }

                        <Box className='flex items-center justify-between'>
                            <Text size="32px" style={{ color: "green", fontWeight: 700 }}>
                                {formatNumber(discountedPrice)}đ
                            </Text>
                            {account?.discountPercent && <Badge color="red" variant="filled">
                                Giảm giá {account.discountPercent}%
                            </Badge>}
                        </Box>


                        {account?.description &&
                            <Box className="">
                                <Text>{account?.description}</Text>
                            </Box>
                        }
                        <Box className="w-80">
                            <ModalConfirmBuyAccount account={account} />
                        </Box>
                    </Box>
                </Flex>
                <Box mt={60} className="border-t">
                    <Title order={3} my={24}>Tài khoản cùng danh mục</Title>
                    <SliderCards categoryId={account?.categoryId} />
                </Box>
            </Container>
        </>
    );
}

export default PageDetailAccountGame;
