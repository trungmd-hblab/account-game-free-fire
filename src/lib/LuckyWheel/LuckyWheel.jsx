'use client';

import useStore from '@/stores/clientStore';
import { formatNumber } from '@/utils/formatNumber';
import { Alert, Box, Button, Image, Modal, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ModalCheckLogin from '../ModalCheckLogin/ModalCheckLogin';
import classes from './LuckyWheel.module.css';
import { clickLuckyWheel } from '@/api/client/spinLuckyWheel';

const LuckyWheel = ({ wheelImage, pointerImage, account }) => {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prizeValue, setPrizeValue] = useState('');
  const [prizeType, setPrizeType] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [openFormBuy, setOpenFormBuy] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);
  const [openNotEnoughBalance, setOpenNotEnoughBalance] = useState(false);
  const router = useRouter();
  const { username, moneyBalance } = useStore((state) => ({
    username: state.username,
    moneyBalance: state.moneyBalance,
  }));

  useEffect(() => {
    const checkToken = Cookies.get('client_accessToken');
    if (checkToken) {
      setIsBalanceSufficient(moneyBalance >= account?.fee?.value);
    }
  }, [account, moneyBalance]);

  const handleAddFunds = () => {
    router.push('/tai_khoan/nap_atm');
  };

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
      wheelRef.current.style.transition = 'none';
    }
  };

  const spin = async () => {
    if (Cookies.get('client_accessToken')) {
      if (!isBalanceSufficient) {
        setOpenNotEnoughBalance(true);
      } else {
        if (isSpinning) return;
        if (isConfirm) {
          setIsSpinning(true);
          try {
            const res = await clickLuckyWheel(account._id);

            if (res && res.result) {
              const result = res.result;

              const totalPrizes = result.total || 0;
              const prizeNames = Array.from({ length: totalPrizes }, (_, i) => `Prize ${i + 1}`);

              setPrizes(prizeNames);
              setTargetIndex(result?.index);
              setPrizeValue(result?.name);
              setPrizeType(result?.type);

              const duration = 4;
              const stepValue = 360 / totalPrizes;
              const finalRotate = 3600 + (360 - stepValue * result.index);

              wheelRef.current.style.transform = 'rotate(' + finalRotate + 'deg)';
              wheelRef.current.style.transition = `all ${duration}s ease`;

              setTimeout(() => {
                notifications.show({
                  title: 'Congratulations',
                  message: 'You Won The ' + (prizes[result.index] || 'Unknown Prize') + '.',
                });
                setIsSpinning(false);
                setIsModalOpen(true);
              }, duration * 1000 + 500);
            } else {
              throw new Error('Invalid response from API');
            }
          } catch (error) {
            setIsBalanceSufficient(false);
            setIsSpinning(false);
            setOpenNotEnoughBalance(true);
          }
        } else {
          setOpenFormBuy(true);
        }
      }
    } else {
      setOpenLogin(true);
    }
  };

  const handleConfirmBegin = () => {
    setOpenFormBuy(false);
    setIsConfirm(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPrizes([]);
    setTargetIndex(null);
    setPrizeValue('');
    setPrizeType('');
    setIsSpinning(false);
    resetWheel();
  };

  return (
    <div className={classes['lucky-wheel-container']}>
      <div className={classes['wheel-plate']}>
        <Image
          ref={wheelRef}
          src={wheelImage}
          style={{ width: '500px' }}
          alt='Wheel background'
        />
        <a onClick={spin}>
          <Image
            className={classes['wheel-pointer']}
            src={pointerImage}
            style={{ width: '50px', top: '40%', left: '43%' }}
            alt='Pointer'
          />
        </a>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={handleModalClose}
        title="Chúc mừng"
        size={400}
        centered
      >
        <Alert color="blue" >
          <Box className="flex flex-col items-center justify-center">
            <Image src='/images/success.png' alt='thong_bao_thanh_cong' className="w-40" />
            <Box className='text-center'>

              <span mt={10} className='inline'>
                Chúc mừng bạn đã quay trúng ô {prizeValue}.
              </span>
              {prizeType == "diamond" ?
                <span className='inline'> Số kim cương của bạn đã được cập nhật.</span> :
                <span className='inline'> Xem chi tiếp phần thưởng tại <strong onClick={() => router.push('/tai_khoan/tai_khoan_da_mua')} className='font-medium underline cursor-pointer'>đây.</strong></span>
              }
            </Box>
          </Box>
        </Alert>
      </Modal>
      <ModalCheckLogin opened={openLogin} setOpend={setOpenLogin} />

      <Modal
        opened={openNotEnoughBalance}
        onClose={() => setOpenNotEnoughBalance(false)}
        title={<div className='font-semibold'>Không đủ số dư</div>}
        centered
      >
        <Box>
          <div className="relative">
            {account?.coverImageUrl &&
              <Image src={account?.coverImageUrl} alt="Vòng quay may mắn" className='max-w-[400px] max-h-[400px] bg-blend-overlay' />
            }
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
        title={<div className='font-semibold'>Thông tin lượt chơi</div>}
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
                <div className=' bg-[#b91c1c] px-4 py-2  text-white font-semibold'>Giá mỗi lần chơi</div>
                <div className='py-2'>{formatNumber(account?.fee?.value)}đ</div>
              </div>
            </div>
            <Box mt="md">
              <Button
                variant="outline"
                color="green"
                style={{ marginLeft: '16px' }}
                onClick={handleConfirmBegin}
              >
                Tôi đã hiểu
              </Button>
            </Box>
          </Box>
        ) : <></>}
      </Modal>
    </div>
  );
};

export default LuckyWheel;
