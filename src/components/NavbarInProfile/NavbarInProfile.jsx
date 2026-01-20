import UserButton from '@/lib/UserButton/UserButton';
import { UnstyledButton } from '@mantine/core';
import { IconBrandProducthunt, IconBrandStorytel, IconBuildingBank, IconCashBanknote, IconChartLine, IconCoin, IconDeviceGamepad, IconDeviceMobile, IconDiamond, IconKey, IconMoodWink2, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './NavbarInProfile.module.css';

function NavbarInProfile() {
    const serviceForClientInfo = [
        { icon: IconUser, label: 'Thông tin tài khoản', link: '/tai_khoan' },
        { icon: IconKey, label: 'Đổi mật khẩu', link: '/tai_khoan/doi_mat_khau' },
    ];

    const serviceForTransaction = [
        { icon: IconCoin, label: 'Nạp thẻ cào', link: '/tai_khoan/nap_the_cao' },
        { icon: IconBuildingBank, label: 'Nạp ATM', link: '/tai_khoan/nap_atm' },
        { icon: IconDiamond, label: 'Rút kim cương', link: '/tai_khoan/rut_kim_cuong' },
    ];

    const historyTransaction = [
        { icon: IconChartLine, label: 'Biến động số dư', link: '/tai_khoan/bien_dong_so_du' },
        { icon: IconBrandProducthunt, label: 'Lịch sử rút kim cương', link: '/tai_khoan/lich_su_rut_vat_pham' },
        { icon: IconDeviceGamepad, label: 'Tài khoản đã mua', link: '/tai_khoan/tai_khoan_da_mua' },
        { icon: IconMoodWink2, label: 'Lịch sử chơi vòng quay ', link: '/tai_khoan/lich_su_choi_mini_game' },
        { icon: IconBrandStorytel, label: 'Lịch sử mua tài khoản', link: '/tai_khoan/dich_vu_da_thue' },
        { icon: IconDeviceMobile, label: 'Lịch sử nạp thẻ', link: '/tai_khoan/lich_su_nap_the' },
        { icon: IconCashBanknote, label: 'Lịch sử nạp ATM', link: '/tai_khoan/lich_su_nap_atm' },
    ];

    const servicesForClientInfo = serviceForClientInfo.map((link) => (
        <Link key={link.label} href={link.link} passHref>
            <UnstyledButton className={classes.mainLink}>
                <div className={classes.mainLinkInner}>
                    <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
                    <span>{link.label}</span>
                </div>
            </UnstyledButton>
        </Link>
    ));

    const servicesForTransaction = serviceForTransaction.map((link) => (
        <Link key={link.label} href={link.link} passHref>
            <UnstyledButton className={classes.mainLink}>
                <div className={classes.mainLinkInner}>
                    <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
                    <span>{link.label}</span>
                </div>
            </UnstyledButton>
        </Link>
    ));

    const historyTransactions = historyTransaction.map((link) => (
        <Link key={link.label} href={link.link} passHref>
            <UnstyledButton className={classes.mainLink}>
                <div className={classes.mainLinkInner}>
                    <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
                    <span>{link.label}</span>
                </div>
            </UnstyledButton>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.section}>
                <UserButton />
            </div>
            <div className={classes.section}>
                <div className={classes.mainLinks}>{servicesForClientInfo}</div>
            </div>
            <div className={classes.section}>
                <div className={classes.mainLinks}>{servicesForTransaction}</div>
            </div>
            <div className={classes.section}>
                <div className={classes.mainLinks}>{historyTransactions}</div>
            </div>
        </nav>
    );
}

export default NavbarInProfile;
