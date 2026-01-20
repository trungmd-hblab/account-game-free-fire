'use client'
import { useGetFlashSales } from '@/api/client/flashsales';
import { Box } from '@mantine/core';
import SectionShowTimeLine from '../SectionShowTimeLine/SectionShowTimeLine';

export default function SectionFlashSales() {
  const { data: sales, isLoading } = useGetFlashSales();

  return (
    <Box className="bg-[#a8b1d740] p-0 rounded-xl">
      {isLoading ? (
        <></>
      ) : (
        <SectionShowTimeLine sales={sales?.result || []} />
      )}
    </Box>
  );
}
