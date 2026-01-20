'use client';
import { useGetLuckyWheel } from '@/api/client/luckywheel';
import CardLuckyWheel from '@/lib/CardLuckyWheel/CardLuckyWheel';
import { Box } from '@mantine/core';
import styles from './SliderCardsWheel.module.css';

export default function SliderCardsWheel() {
  const { data, isLoading, isError, error } = useGetLuckyWheel({
    page: '1',
    limit: '10',
    status: 'active'
  });


  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading data: {error.message}</p>;

  return (
    <Box className={styles.gridContainer}>
      {
        data?.result?.items?.map((cate) => (
          <CardLuckyWheel key={cate._id} card={cate} />
        ))
      }
    </Box>
  );
}
