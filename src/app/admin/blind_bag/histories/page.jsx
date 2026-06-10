'use client'

import LuckyWheelHistoryTable from "@/components/LuckyWheelHistoryTable/LuckyWheelHistoryTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Box, Select } from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import LoadingLayout from "../../customers/loading";
import { useGetLuckyWheelHistories, useGetLuckyWheels } from "@/api/luckyWheel";

function BlindBagHistoryPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        luckyWheelId: '',
    });
    const columns = page.blindBag.tableHistoryColumns;
    const [dataToSelect, setDataToSelect] = useState([]);

    const { data: listBlindBags } = useGetLuckyWheels({
        keyword: "",
        page: 1,
        limit: 5000,
        type: 'blind_bag',
    });

    useEffect(() => {
        if (listBlindBags) {
            const newData = listBlindBags?.result?.items?.map((item) => ({
                label: item?.name,
                value: item?._id,
            }));
            setDataToSelect(newData);
        }
    }, [listBlindBags]);

    const { data } = useGetLuckyWheelHistories(query);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setQuery({ ...query, page: newPage });
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setQuery({ ...query, page: 1, limit: value });
    };

    const handleSearch = (value) => {
        setQuery({ ...query, keyword: value, page: 1 });
    };

    const handleFilterChange = (value) => {
        setCurrentPage(1);
        setQuery((prev) => ({ ...prev, page: 1, luckyWheelId: value }));
    };

    return (
        <div className='mb-6'>
            <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <Select
                    placeholder='Lọc theo tên túi mù'
                    data={dataToSelect}
                    onChange={handleFilterChange}
                />
                <SearchInput
                    handleSearch={handleSearch}
                    placeholder={page.blindBag.searchPlaceholder}
                />
            </Box>
            <Suspense fallback={<LoadingLayout />}>
                <LuckyWheelHistoryTable
                    columns={columns}
                    data={data?.result?.items}
                    limitView={limitView}
                    totalItems={data?.result?.totalItems}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                />
            </Suspense>
        </div>
    );
}

export default BlindBagHistoryPage;
