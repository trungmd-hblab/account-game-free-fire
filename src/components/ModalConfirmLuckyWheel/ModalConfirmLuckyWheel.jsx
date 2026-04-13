'use client';
import { clickLuckyWheel } from '@/api/client/luckywheel';
import ModalCheckLogin from '@/lib/ModalCheckLogin/ModalCheckLogin';
import useStore from '@/stores/clientStore';
import { formatNumber } from '@/utils/formatNumber';
import { Box, Button, Image, Modal, Text, Title } from '@mantine/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ModalConfirmLuckyWheel({
    account,
    type,
    paymentSource,
    setPaymentSource,
    setStartGame,
    setEndGame,
    setIndexPrize,
}) {
    const [openLogin, setOpenLogin] = useState(false);
    const [openNotEnoughBalance, setOpenNotEnoughBalance] = useState(false);
    const [loading, setLoading] = useState(false)
    const [internalPaymentSource, setInternalPaymentSource] = useState('atm');
    const { username, atmBalance, cardBalance, promotionBalance } = useStore((state) => ({
        username: state.username,
        atmBalance: state.atmBalance,
        cardBalance: state.cardBalance,
        promotionBalance: state.promotionBalance,
    }));
        const activePaymentSource = paymentSource ?? internalPaymentSource;
        const setActivePaymentSource = setPaymentSource ?? setInternalPaymentSource;

        const selectedBalance = activePaymentSource === 'atm'
      ? atmBalance
            : activePaymentSource === 'card'
        ? cardBalance
        : promotionBalance;
    const feeValue = Number(account?.fee?.value || 0);
    const hasEnoughBalance = Number(selectedBalance || 0) >= feeValue;
    const router = useRouter();

    const handleAddFunds = () => {
        router.push('/tai_khoan/nap_atm');
    };

    const handleConfirmPlayGame = async () => {
        if (!Cookies.get('client_accessToken')) {
            setOpenLogin(true);
            return;
        }

        if (!hasEnoughBalance) {
            setOpenNotEnoughBalance(true);
            return;
        }

        if(type === 'pick') {
            setLoading(true);
            setEndGame(false); 
            try {
                const res = await clickLuckyWheel(account._id, activePaymentSource);
                if (res && res.result) {
                    setIndexPrize(res.result);
                }
                setStartGame(true);
            } catch (error) {
                if (error?.response?.data?.message?.includes('không đủ')) {
                    setOpenNotEnoughBalance(true);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className='flex gap-2 mt-3 mb-3'>
                <Button
                    variant={activePaymentSource === 'atm' ? 'filled' : 'outline'}
                    onClick={() => setActivePaymentSource('atm')}
                >
                    ATM
                </Button>
                <Button
                    variant={activePaymentSource === 'card' ? 'filled' : 'outline'}
                    onClick={() => setActivePaymentSource('card')}
                >
                    Thẻ cào
                </Button>
                <Button
                    variant={activePaymentSource === 'promotion' ? 'filled' : 'outline'}
                    onClick={() => setActivePaymentSource('promotion')}
                >
                    Khuyến mãi
                </Button>
            </div>

            <div className='flex border mb-3'>
                <div className='w-[50%] text-center'>
                    <div className='bg-[#b91c1c] px-4 py-2 text-white font-semibold'>Số dư hiện tại</div>
                    <div className='py-2'>{formatNumber(selectedBalance)}đ</div>
                </div>
                <div className='w-[50%] text-center'>
                    <div className='bg-[#b91c1c] px-4 py-2 text-white font-semibold'>Giá mỗi lần chơi</div>
                    <div className='py-2'>{formatNumber(account?.fee?.value)}đ</div>
                </div>
            </div>

            {type === 'pick' && (
                <Button
                    color="#1f2c64"
                    className="w-full"
                    onClick={handleConfirmPlayGame}
                    loading={loading}
                >
                    Chơi ngay
                </Button>
            )}

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
        </>
    );
}

export default ModalConfirmLuckyWheel;
