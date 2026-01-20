'use client'
import { logout, logoutClient } from '@/api/auth';
import { useFetchAdminProfile, useFetchClientProfile } from '@/api/client/getMyProfile';
import useStore from '@/stores/clientStore';
import useRoleStore from '@/stores/role';
import { Avatar, Divider, Menu } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconLogin,
  IconLogout,
  IconUser
} from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserButton from '../UserButton/UserButton';
import classes from './AvatarUser.module.css';
import { formatNumber } from '@/utils/formatNumber';


export default function AvatarUser() {
  const router = useRouter();
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState('');
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const setUserProfile = useStore((state) => state.setUserProfile);
  const {setRole} = useRoleStore();
  const {setBalance} = useRoleStore();

  useEffect(() => {
    const token = pathname.includes('/admin') ? Cookies.get('admin_accessToken') : Cookies.get('client_accessToken');
    setAccessToken(token || '');
  }, [pathname]);
  const { data: profileData, isError } = useFetchClientProfile(accessToken && !pathname.includes('/admin'));

  const { data: profileAdminData } = useFetchAdminProfile(accessToken && pathname.includes('/admin'));

  useEffect(() => {
    if (profileData?.result) {
      setUserProfile(profileData.result);
    }
  }, [profileData, setUserProfile]);

  useEffect(()=> {
    if (profileAdminData?.result) {
      if (profileAdminData?.result?.user?.isOwner) {
        setRole("admin")
      } else {
        setRole("staff")
        setBalance(profileAdminData?.result?.user?.money)
      }
    }
  }, [profileAdminData])

  const handleLogout = async () => {
    try {
      if (pathname.includes('/admin')) {
        await logout();
        router.push('/admin/login');
      } else {
        await logoutClient();
        router.push('/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  }

  const handleAccountSettings = () => {
    const targetRoute = isLargeScreen ? '/tai_khoan' : '/cac_danh_muc_thong_tin';
    router.push(targetRoute);
  }

  return (
    <Menu withArrow shadow="md" width={200} >
      <Menu.Target>
        <div className='flex  items-center text-sm'>
          {accessToken ?
            <Avatar src='/images/avatar-default.png' ml='8px' alt="avatar tài khoản" className="rounded-full" />
            : <Avatar color='dark' variant="outline" ml='8px' p={2} alt="avatar tài khoản" >
              <IconUser size='18' />
            </Avatar>
          }
        </div>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown} >
        {accessToken ? (
          <>
            {!pathname.includes('/admin') &&
              <Menu.Item
                className='p-0'
                onClick={handleAccountSettings}
              >
                <UserButton />
              </Menu.Item>
            }
            <Divider />
            {!pathname.includes('/admin') && <Menu.Item
              className={classes.item}
              leftSection={<IconUser size='18' mr='10' />}
              onClick={handleAccountSettings}
            >
              Cài đặt tài khoản
            </Menu.Item>
            }
            <Menu.Item
              className={classes.item}
              leftSection={<IconLogout size='18' mr='10' />}
              onClick={handleLogout}
            >
              Đăng xuất
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            className={classes.item}
            leftSection={<IconLogin size='18' mr='10' />}
            onClick={handleLogin}
          >
            Đăng nhập
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
