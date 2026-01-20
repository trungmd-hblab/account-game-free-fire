'use client';
import { useGetStatistic, useGetTopClient } from '@/api/dashboard';
import TopClientTable from '@/components/TopClientTable/TopClientTable';
import { formatNumber } from '@/utils/formatNumber';
import { Box, Button, Card, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';

export default function Dashboard() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [query, setQuery] = useState({})

  const { data: dataStatistic } = useGetStatistic(query);
  const { data: dataTopClient } = useGetTopClient();

  const handleSeach = () => {
    setQuery({
      startDate: startDate , 
      endDate: endDate,
    })
  }

  return (
    <div>
      <Box className='mb-8'>
        <Text size='lg' fw='600' className='text-white mb-4'>
          Thống kê doanh thu
        </Text>
        <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <DatePickerInput
            valueFormat="DD/MM/YYYY"
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            placeholder="Ngày bắt đầu"
            maxDate={endDate}
            onChange={setStartDate}
            clearable
          />
          <DatePickerInput
            valueFormat="DD/MM/YYYY"
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            placeholder="Ngày kết thúc"
            minDate={startDate}
            onChange={setEndDate}
            clearable
          />
          <Button maw={160} fw={500} onClick={handleSeach}>
            Tìm kiếm
          </Button>
        </Box>
        <Box className='flex lg:flex-row flex-col gap-3'>
          <Card className='flex-1 flex flex-col gap-2'>
            <Text size='md' fw='600'>Số tài khoản đã bán</Text>
            <Text>{formatNumber(dataStatistic?.result?.totalAccountSold || 0)}</Text>
          </Card>
          <Card className='flex-1 flex flex-col gap-2'>
            <Text size='md' fw='600'>Thống kê nạp thẻ</Text>
            <Box className='flex gap-2'>
              <Text fw={500}>Tổng số thẻ nạp: </Text>
              <Text>{formatNumber(dataStatistic?.result?.phoneCard?.totalPhoneCard || 0)}</Text>
            </Box>
            <Box className='flex gap-2'>
              <Text fw={500}>Tổng doanh thu: </Text>
              <Text>{formatNumber(dataStatistic?.result?.phoneCard?.totalMoney || 0)}đ</Text>
            </Box>
          </Card>
          <Card className='flex-1 flex flex-col gap-2'>
            <Text size='md' fw='600'>Thống kê nạp ATM</Text>
            <Box className='flex gap-2'>
              <Text fw={500}>Tổng số giao dịch: </Text>
              <Text>{formatNumber(dataStatistic?.result?.atm?.totalAtmHistory || 0)}</Text>
            </Box>
            <Box className='flex gap-2'>
              <Text fw={500}>Tổng doanh thu: </Text>
              <Text>{formatNumber(dataStatistic?.result?.atm?.totalMoney || 0)}đ</Text>
            </Box>
          </Card>
        </Box>
      </Box>
      <Box className='mb-14'>
        <Text size='lg' fw='600' className='text-white mb-4'>
          Top khách hàng
        </Text>
        <Box>
          <TopClientTable dataClient={dataTopClient?.result} />
        </Box>
      </Box>
    </div>
  );
};