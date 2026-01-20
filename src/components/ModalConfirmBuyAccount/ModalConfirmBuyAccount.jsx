'use client'
import { buyAccountGame } from '@/api/client/buyAccount';
import ModalCheckLogin from '@/lib/ModalCheckLogin/ModalCheckLogin';
import ModalFailed from '@/lib/ModalFailed/ModalFailed';
import ModalSuccess from '@/lib/ModalSuccess/ModalSuccess';
import useStore from '@/stores/clientStore';
import { formatNumber } from '@/utils/formatNumber';
import { Box, Button, Modal, Title } from '@mantine/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ModalConfirmBuyAccount({ account }) {
    const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);
    const [openLogin, setOpenLogin] = useState(false)
    const [openFormBuy, setOpenFormBuy] = useState(false)
    const [openedModal, setOpenedModal] = useState(false);
    const [openedModalFailed, setOpenedModalFailed] = useState(false);
    const [message, setMessage] = useState('');
    
    const originalPrice = account?.price || 0;
    const discount = account?.discountPercent || 0;
    const discountedPrice = originalPrice - (originalPrice * discount / 100)

    const router = useRouter();
    const { username, moneyBalance } = useStore((state) => ({
        username: state.username,
        moneyBalance: state.moneyBalance,
    }));

    useEffect(() => {
        const checkToken = Cookies.get('client_accessToken');
        if (checkToken && username) {
            setIsBalanceSufficient(moneyBalance >= discountedPrice);
        }
    }, [moneyBalance,username, account]);

    const handlePurchase = async () => {
        try {
            await buyAccountGame(account._id);
            setOpenedModal(true);
            setOpenFormBuy(false)
        } catch (error){
            setOpenedModalFailed(true);
            setMessage(error?.response?.data?.message);
        }
    };

    const handleAddFunds = () => {
        router.push('/tai_khoan/nap_atm');
    };

    const handleOpenForm = () => {
        if(Cookies.get('client_accessToken')){
            setOpenFormBuy(true)
            setOpenLogin(false)
        }else {
            setOpenFormBuy(false)
            setOpenLogin(true)
        }
    } 

    return (
        <>
            <Button color="#1f2c64" className="mt-3 w-full" onClick={handleOpenForm}>Mua ngay</Button>
            {
                Cookies.get('client_accessToken') ? (
                    <Modal
                    opened={openFormBuy}
                    onClose={() => setOpenFormBuy(false)}
                    title={<div className='font-semibold'>Xác nhận mua tài khoản</div>}
                    centered
                >
                    {username ? (
                        <Box >
                            <Title order={4}>Thông tin mua hàng</Title>
                            <div className='flex  border mt-4 mb-5'>
                                <div className='w-[50%] text-center'>
                                    <div className=' bg-[#b91c1c] px-4 py-2 text-white font-semibold' >Số dư hiện tại</div>
                                    <div className='py-2'>{formatNumber(moneyBalance)}đ</div>
                                </div>
                                <div className='w-[50%] text-center'>
                                    <div className=' bg-[#b91c1c] px-4 py-2  text-white font-semibold'>Giá mua</div>
                                    <div className='py-2'>{formatNumber(discountedPrice)}đ</div>
                                </div>
                            </div>
                            <Box mt="md">
                                <Button
                                    variant="filled"
                                    color="blue"
                                    onClick={handlePurchase}
                                    disabled={!isBalanceSufficient}
                                >
                                    {isBalanceSufficient ? "Xác nhận mua" : "Số dư không đủ"}
                                </Button>
                                <Button
                                    variant="outline"
                                    color="green"
                                    style={{ marginLeft: '16px' }}
                                    onClick={handleAddFunds}
                                >
                                    Nạp tiền
                                </Button>
                            </Box>
                        </Box>
                    ) : <></>}
                </Modal>
                ) : (
                    <ModalCheckLogin opened={openLogin} setOpend={setOpenLogin}/>
                )
            }
            <ModalSuccess
                opened={openedModal}
                setOpened={setOpenedModal}
                message="Mua tài khoản thành công. Hãy kiểm tra trong danh sách tài khoản của bạn."
            />
            <ModalFailed
                opened={openedModalFailed}
                setOpened={setOpenedModalFailed}
                message={message}
            />
           
        </>
    );
}

export default ModalConfirmBuyAccount;
