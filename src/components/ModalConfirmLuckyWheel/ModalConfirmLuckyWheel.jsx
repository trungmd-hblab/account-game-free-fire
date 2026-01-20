'use client';
import ModalCheckLogin from '@/lib/ModalCheckLogin/ModalCheckLogin';
import useStore from '@/stores/clientStore';
import { formatNumber } from '@/utils/formatNumber';
import { Box, Button, Image, Modal, Text, Title } from '@mantine/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ModalConfirmLuckyWheel({ account }) {
    const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);
    const [openLogin, setOpenLogin] = useState(false);
    const [openNotEnoughBalance, setOpenNotEnoughBalance] = useState(false);
    const [openFormBuy, setOpenFormBuy] = useState(false);
    const { username, moneyBalance } = useStore((state) => ({
        username: state.username,
        moneyBalance: state.moneyBalance,
    }));
    const router = useRouter();

    useEffect(() => {
        const checkToken = Cookies.get('client_accessToken');
        if (checkToken && username) {
            setIsBalanceSufficient(moneyBalance >= account?.fee?.value);
        }
    }, [moneyBalance, username, account]);

    const handleAddFunds = () => {
        router.push('/tai_khoan/nap_atm');
    };

    const handleOpenForm = () => {
        if (Cookies.get('client_accessToken')) {
            if (!isBalanceSufficient) {
                setOpenNotEnoughBalance(true);
            } else {
                setOpenFormBuy(true);
            }
        } else {
            setOpenLogin(true);
        }
    };

    return (
        <>
            <Button color="#1f2c64" className="mt-3 w-full" onClick={handleOpenForm}>Quay ngay</Button>

            <ModalCheckLogin opened={openLogin} setOpend={setOpenLogin} />

            <Modal
                opened={openNotEnoughBalance}
                onClose={() => setOpenNotEnoughBalance(false)}
                title={<div className='font-semibold'>Không đủ số dư</div>}
                centered
            >
                <Box>
                    <div className="relative">
                        {account?.coverImageUrl && <Image src={account?.coverImageUrl} alt="Vòng quay may mắn" className='max-w-[400px] max-h-[400px] bg-blend-overlay' />}
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                    </div>
                    <Text size="lg" align="center" mt="md" onClick={handleAddFunds}>
                        Bạn không đủ số dư để thực hiện hành động này. Nạp tại đây.
                    </Text>
                    <Button
                        variant="outline"
                        color="green"
                        style={{ marginTop: '16px' }}
                        onClick={handleAddFunds}
                    >
                        Nạp tiền
                    </Button>
                </Box>
            </Modal>
            <Modal
                opened={openFormBuy}
                onClose={() => setOpenFormBuy(false)}
                title={<div className='font-semibold'>Thông tin lượt quay</div>}
                centered
            >
                {username ? (
                    <Box >
                        <Title order={4}>Phí sẽ được thu mỗi lần nhấn nút quay.</Title>
                        <div className='flex  border mt-4 mb-5'>
                            <div className='w-[50%] text-center'>
                                <div className=' bg-[#b91c1c] px-4 py-2 text-white font-semibold' >Số dư hiện tại</div>
                                <div className='py-2'>{formatNumber(moneyBalance)}đ</div>
                            </div>
                            <div className='w-[50%] text-center'>
                                <div className=' bg-[#b91c1c] px-4 py-2  text-white font-semibold'>Giá quay 1 lần</div>
                                <div className='py-2'>{formatNumber(account?.fee?.value)}đ</div>
                            </div>
                        </div>
                        <Box mt="md">
                            <Button
                                variant="outline"
                                color="green"
                                style={{ marginLeft: '16px' }}
                                onClick={() => setOpenFormBuy(false)}
                            >
                                Tôi đã hiểu
                            </Button>
                        </Box>
                    </Box>
                ) : <></>}
            </Modal>
        </>
    );
}

export default ModalConfirmLuckyWheel;
