import React from 'react';
import { Container, Text, Anchor, Image, Group, Box } from '@mantine/core';
import PluginFacebook from '@/lib/PluginFacebook/PluginFacebook';

const SectionFooter = () => {
  return (
    <section className="screen bg-[#1c1b1b] mt-8" id="footer" >
      <Container className='flex flex-col lg:flex-row justify-between gap-10 text-white p-6 md:p-10 ' style={{ maxWidth: '1536px' }}>
        <Box className='flex-[2]'>
          <Text size='sm' className='mb-2' fw={600} classNames='uppercase'>Supitv.com</Text>
          <Box className='flex flex-col gap-2 '>
            <Text className='text-sm'>Supitv.com - Acc ngon giá rẻ, không đâu rẻ hơn</Text>
            <Text className='text-sm'>Là điểm đến hoàn hảo cho bạn! supitv chuyên cung cấp các tài khoản Free Fire với nhiều mức giá, đầy đủ kiểu có hể sỡ hữu ngay một tài khoản FreeFire.</Text>
          </Box>
        </Box>
        <Box className='flex-[1]'>
          <Text size='sm' className='mb-2' fw={600}>THÔNG TIN CHUNG</Text>
          <Box className='flex flex-col gap-2 '>
            <Text className='text-sm'>Chính sách đổi trả 60 ngày</Text>
            <Text className='text-sm'>Chính sách khuyến mãi</Text>
            <Text className='text-sm'>Chính sách bảo mật</Text>
            <Text className='text-sm'>Chính sách giao hàng</Text>
          </Box>
        </Box>
        <Box className='flex-[1]'>
          <Text size='sm' className='mb-2' fw={600}>CHĂM SÓC KHÁCH HÀNG</Text>
          <Box className='flex flex-col gap-2 '>
            <Text className='text-sm'>Ðiều khoản sử dụng</Text>
            <Text className='text-sm'>Chính sách đổi trả</Text>
            <Text className='text-sm'>Chính sách bán hàng</Text>
            <Text className='text-sm'>Hướng dẫn nạp tiền vào web</Text>
          </Box>
        </Box>
        <Box className='flex-[1]'>
          <Text size='sm' className='mb-2' fw={600} classNames='uppercase'>SUPITV.COM</Text>
         
        </Box>
      </Container>
    </section>
  );
};

export default SectionFooter;
