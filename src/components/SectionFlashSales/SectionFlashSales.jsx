'use client'
import { useGetFlashSales } from '@/api/client/flashsales';
import { Box } from '@mantine/core';
import { useMemo } from 'react';
import SectionShowTimeLine from '../SectionShowTimeLine/SectionShowTimeLine';

export default function SectionFlashSales() {
  const { data: sales, isLoading } = useGetFlashSales();

  const filteredSales = useMemo(() => {
    const list = sales?.result || [];
    if (!list.length) return [];

    const mapBySlot = new Map();

    list.forEach((sale) => {
      if (!sale?.startDateTimeAt) return;

      const slotDate = new Date(sale.startDateTimeAt);
      const slotKey = `${slotDate.toLocaleDateString('sv-SE', {
        timeZone: 'Asia/Ho_Chi_Minh',
      })} ${slotDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh',
      })}`;

      const existed = mapBySlot.get(slotKey);
      if (!existed) {
        mapBySlot.set(slotKey, sale);
        return;
      }

      const existedCreatedAt = existed?.createdAt
        ? new Date(existed.createdAt).getTime()
        : 0;
      const incomingCreatedAt = sale?.createdAt
        ? new Date(sale.createdAt).getTime()
        : 0;

      if (incomingCreatedAt >= existedCreatedAt) {
        mapBySlot.set(slotKey, sale);
      }
    });

    return Array.from(mapBySlot.values()).sort(
      (a, b) =>
        new Date(a.startDateTimeAt).getTime() -
        new Date(b.startDateTimeAt).getTime(),
    );
  }, [sales?.result]);

  return (
    <Box className="bg-[#a8b1d740] p-0 rounded-xl">
      {isLoading ? (
        <></>
      ) : (
        <SectionShowTimeLine sales={filteredSales} />
      )}
    </Box>
  );
}
