'use client';

import { earnDiamond, useGetEarnDiamond } from "@/api/client/earnDiamond";
import ModalCheckLogin from "@/lib/ModalCheckLogin/ModalCheckLogin";
import ModalFailed from "@/lib/ModalFailed/ModalFailed";
import ModalSuccess from "@/lib/ModalSuccess/ModalSuccess";
import { Box, Button, Text } from "@mantine/core";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation } from 'react-query';

export default function PageEarnDiamond() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openedModal, setOpenedModal] = useState(false);
    const [openedModalFailed, setOpenedModalFailed] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isAttendanced, setIsAttendanced] = useState(false);

    const { data, isLoading, isError, error, refetch } = useGetEarnDiamond(!!Cookies.get('client_accessToken'))

    useEffect(() => {
        if (data && data?.result) {
            setIsAttendanced(data?.result?.isAttendanced || false);
        }
    }, [data]);

    useEffect(() => {
        const checkToken = Cookies.get('client_accessToken');
        if (checkToken) {
            setIsLogin(true);
        }
    }, []);

    const mutation = useMutation(earnDiamond, {
        onSuccess: (data) => {
            if (data && data?.statusCode == 200) {
                setOpenedModal(true);
                refetch();
            } else if (data && data?.statusCode == 400) {
                setOpenedModalFailed(true);
                setMessage(data?.message || "Đã xảy ra lỗi.");
                setIsAttendanced(true)
            }
        },
        onError: (error) => {
            setOpenedModalFailed(true);
            setMessage("Khách hàng đã điểm danh ngày này");
        }
    });

    return (
        <>
            <main className="flex flex-col gap-4 md:gap-6">
                <Text size="xl" fw={600}>📣 Điểm danh nhận kim cương miễn phí</Text>
                <Text size="md" fw={400}>🔥 Sự kiện siêu hot. Nạp đầu nhận kim cương miễn phí để thảo sức chơi game mua sắm acc game siêu vip. Số lượng thưởng có hạn, hãy nhanh tay tham gia sự kiện nào.</Text>
                {
                    !isAttendanced ? (
                        <Box className="flex justify-center gap-2">
                            <Link href='/'>
                                <Button color="gray">Trang chủ</Button>
                            </Link>
                            {isLogin ? (
                                <Button
                                    color="#1f2c64"
                                    onClick={() => mutation.mutate()}
                                    loading={mutation.isLoading}
                                    disabled={mutation.isLoading}
                                >
                                    Nhận kim cương
                                </Button>
                            ) : (
                                <Button
                                    color="#1f2c64"
                                    onClick={() => setOpenLogin(true)}
                                >
                                    Nhận kim cương
                                </Button>
                            )}
                        </Box>
                    ) : (
                        <Box className="flex justify-center ">
                            <Button
                                color="#1f2c64"
                                disabled={true}
                                className="w-64"
                            >
                                Bạn đã điểm danh ngày hôm nay
                            </Button>
                        </Box>
                    )
                }

                <ModalCheckLogin opened={openLogin} setOpend={setOpenLogin} />
                <ModalSuccess
                    opened={openedModal}
                    setOpened={setOpenedModal}
                    message="Điểm danh thành công."
                />
                <ModalFailed
                    opened={openedModalFailed}
                    setOpened={setOpenedModalFailed}
                    message={message}
                />
            </main>
        </>
    );
}
