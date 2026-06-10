'use client';
import { useGetLuckyWheel } from '@/api/client/luckywheel';
import CardLuckyWheel from '@/lib/CardLuckyWheel/CardLuckyWheel';
import { Box } from '@mantine/core';
import styles from './SliderCardsWheel.module.css';

export default function SliderCardsWheel({ type } = {}) {
  const queryParams = {
    page: '1',
    limit: '10',
    status: 'active',
    ...(type ? { type } : {}),
  };

  const { data } = useGetLuckyWheel(queryParams);

  const basePath = type === 'blind_bag' ? '/tui_mu' : '/vong_quay_may_man';

  return (
    <Box className={styles.gridContainer}>
      {
        data?.result?.items?.map((cate) => (
          <CardLuckyWheel key={cate._id} card={cate} basePath={basePath} />
        ))
      }
    </Box>
  );
}
