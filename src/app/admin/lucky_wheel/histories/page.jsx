'use client'

import { useGetLuckyWheelHistories, useGetLuckyWheels } from "@/api/luckyWheel";
import LuckyWheelHistoryTable from "@/components/LuckyWheelHistoryTable/LuckyWheelHistoryTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Box, Select } from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import LoadingLayout from "../../customers/loading";

function LuckyWheelHistoryPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const [luckyWheelQuery, setLuckyWheelQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        luckyWheelId: ''
    })
    const columns = page.lucky.tableHistoryColumns;
    const [dataToSelect, setDataToSelect] = useState([])


    const { data: listCate, isLoading } = useGetLuckyWheels({
        keyword: "",
        page: 1,
        limit: 5000,
    });
    useEffect(() => {
        if (listCate) {
            const newData = listCate?.result?.items?.map((item) => {
                return {
                    label: item?.name,
                    value: item?._id
                }
            })
            setDataToSelect(newData)
        }
    }, [listCate]);

    const { data: data } = useGetLuckyWheelHistories(luckyWheelQuery);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLuckyWheelQuery({
            ...luckyWheelQuery,
            page: page,
        })
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setLuckyWheelQuery({
            ...luckyWheelQuery,
            page: 1,
            limit: value
        })
    };

    const handleSeach = (value) => {
        setLuckyWheelQuery({
            ...luckyWheelQuery,
            keyword: value,
            page: 1,
        })
    };

    const handleCategoryLuckyWheelChange = (value) => {
        setCurrentPage(1);
        setLuckyWheelQuery((prevQuery) => ({
            ...prevQuery,
            page: 1,
            luckyWheelId: value,
        }));
    };

    return (
        <div className='mb-6'>
            <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <Select
                    placeholder='Lọc theo vòng quay'
                    data={dataToSelect}
                    onChange={handleCategoryLuckyWheelChange}
                />
                <SearchInput
                    handleSearch={handleSeach}
                    placeholder={page.lucky.searchPlaceholder}
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

export default LuckyWheelHistoryPage;