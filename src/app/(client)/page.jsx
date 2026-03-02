import EarnDiamond from '@/components/EarnDiamond/EarnDiamond';
import Notification from '@/components/Notification/Notification';
import PromoBanner from '@/components/PromoBanner/PromoBanner';
import SectionBanner from '@/components/SectionBanner/SectionBanner';
import SectionCate from '@/components/SectionCate/SectionCate';
import SectionFlashSales from '@/components/SectionFlashSales/SectionFlashSales';
import SectionLuckyWheel from '@/components/SectionLuckyWheel/SectionLuckyWheel';
import SectionServices from '@/components/SectionServices/SectionServices';
import { TYPE_CATE_FREE_FIRE_ACCOUNT, TYPE_CATE_OTHER_GAME_ACCOUNT, TYPE_CATE_RANDOM_GAME_ACCOUNT } from '@/constants/common';

export default async function Home() {

  return (
    <>

      <main className='flex flex-col gap-4 md:gap-6 lg:gap-8'>
        <SectionBanner />
        <PromoBanner />
        <SectionServices />
        <SectionFlashSales />
        <SectionLuckyWheel title="🍀 Mini Game Săn Thưởng Lớn" />
        <SectionCate type={TYPE_CATE_RANDOM_GAME_ACCOUNT} title="😎 Ưu Đãi Độc Quyền" />
        <SectionCate type={TYPE_CATE_OTHER_GAME_ACCOUNT} title="⭐ Tài Khoản Roblox" />
        <SectionCate type={TYPE_CATE_FREE_FIRE_ACCOUNT} title="🎮 Tài Khoản Free Fire" />
        <Notification />
        <EarnDiamond />
      </main>
    </>
  );
}
