import { Box, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import React, { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';

function FilterGroup(props) {
    const { handleSeach, searchPlaceholder, hiddenSearch } = props
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = (keyword) => {
        handleSeach(startDate, endDate, keyword)
    }

    const handleSeachByDate = () => {
        handleSeach(startDate, endDate)
    }

    return (
        <Box style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
            </Box>
            {hiddenSearch == true ? (
                <Button maw={160}  fw={500} onClick={handleSeachByDate}>
                    Tìm kiếm
                </Button>
            ) : (
                <SearchInput
                    handleSearch={handleFilter}
                    placeholder={searchPlaceholder}
                />
            )}
        </Box>
    );
}

export default FilterGroup;