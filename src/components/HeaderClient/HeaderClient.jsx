'use client'
import { useFetchClientConfig } from '@/api/client/config';
import AvatarUser from '@/lib/AvatarUser/AvatarUser';
import useClientConfigStore from '@/stores/clientConfig';
import { checkLogin } from '@/utils/checkLogined';
import { Box, Card, Drawer, Image, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconMenu } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classes from './HeaderClient.module.css';

const HeaderClient = () => {
  const pathname = usePathname();
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const { clientConfig, setClientConfig } = useClientConfigStore();
  const [isLogin, setIsLogin] = useState(false)
  const { data: config, error } = useFetchClientConfig();
  useEffect(() => {
    if (config) {
      setClientConfig(config.result);
    }
  }, [config, setClientConfig]);

  useEffect(() => {
    setIsLogin(checkLogin())
  }, [])

  const getLink = (href) => (isLogin ? href : '/login');

  return (
    <>
      <Box className={classes.headerBoxWrapper}>
        <Box className={classes.headerBox}>
          <Card className={classes.headerCard}>
            <div className={classes.headerContent}>
              <div className="flex items-center gap-5">
                <div className={classes.headerLogo}>
                  <Link href="/">
                    {clientConfig.logoUrl && <Image src={clientConfig.logoUrl} alt="Logo" />}
                  </Link>
                </div>
                <Link className={`${classes.headerMenuLink} ${classes.menu_item} ${(pathname == "/" || pathname == "") ? classes.menu_item_active : ""}`} href="/">
                  <Text fw={600} className='hover:text-black uppercase text-[#797979] lg:text-[16px] sm:text-sm'>Trang chủ</Text>
                </Link>
                <Link className={`${classes.headerMenuLink} ${classes.menu_item} ${(pathname == "/tai_khoan/nap_the_cao") ? classes.menu_item_active : ""}`} href={getLink("/tai_khoan/nap_the_cao")}>
                  <Text fw={600} className='hover:text-black uppercase text-[#797979] lg:text-[16px] sm:text-sm'>Nạp tiền</Text>
                </Link>
                <Link className={`${classes.headerMenuLink} ${classes.menu_item} ${(pathname == "/tai_khoan/nap_atm") ? classes.menu_item_active : ""}`} href={getLink("/tai_khoan/nap_atm")}>
                  <Text fw={600} className='hover:text-black uppercase text-[#797979] lg:text-[16px] sm:text-sm'>Nạp atm</Text>
                </Link>
                <Link className={`${classes.headerMenuLink} ${classes.menu_item} ${(pathname == "/tai_khoan/rut_kim_cuong") ? classes.menu_item_active : ""}`} href={getLink("/tai_khoan/rut_kim_cuong")}>
                  <Text fw={600} className='hover:text-black uppercase text-[#797979] lg:text-[16px] sm:text-sm'>Rút kim cương</Text>
                </Link>
                <Link className={`${classes.headerMenuLink} ${classes.menu_item} ${(pathname == "/danh_sach_vong_quay_may_man") ? classes.menu_item_active : ""}`} href="/danh_sach_vong_quay_may_man">
                  <Text fw={600} className='hover:text-black uppercase text-[#797979] lg:text-[16px] sm:text-sm'>Vòng quay may mắn</Text>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <AvatarUser />
              </div>
            </div>
          </Card>
        </Box>
      </Box>
      <>
        <Card className={classes.headerMobileCard}>
          <div className={classes.headerMobileContent}>
            <div className={classes.headerMobileLogo}>
              <Link href="/">
                {clientConfig.logoUrl && <Image src={clientConfig.logoUrl} alt="Logo" />}
              </Link>
            </div>
            <div className={classes.headerMobileMenu}>
              <AvatarUser />
              <IconMenu size={18} cursor="pointer" onClick={openDrawer} />
            </div>
          </div>
        </Card>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          position="left"
          size="70%"
          padding='70px 16px 0px'
        >
          <div className={classes.drawerContent}>
            <Link href="/" onClick={closeDrawer} className={`${(pathname == "/" || pathname == "") ? classes.menu_item_active : ""}`}>
              <Text size='md' fw={600} className='hover:text-black uppercase text-[#797979]'>Trang chủ</Text>
            </Link>
            <Link href={getLink("/tai_khoan/nap_the_cao")} onClick={closeDrawer}>
              <Text size='md' fw={600} className='hover:text-black uppercase text-[#797979]'>Nạp tiền</Text>
            </Link>
            <Link href={getLink("/tai_khoan/nap_atm")} onClick={closeDrawer}>
              <Text size='md' fw={600} className='hover:text-black uppercase text-[#797979]'>Nạp atm</Text>
            </Link>
            <Link href={getLink("/tai_khoan/rut_kim_cuong")} onClick={closeDrawer}>
              <Text size='md' fw={600} className='hover:text-black uppercase text-[#797979]'>Rút kim cương</Text>
            </Link>
            <Link href="/danh_sach_vong_quay_may_man" onClick={closeDrawer} className={`${(pathname == "/danh_sach_vong_quay_may_man") ? classes.menu_item_active : ""}`}>
              <Text size='md' fw={600} className='hover:text-black uppercase text-[#797979]'>Vòng quay may mắn</Text>
            </Link>
          </div>
        </Drawer>
      </>
    </>
  );
};

export default HeaderClient;

