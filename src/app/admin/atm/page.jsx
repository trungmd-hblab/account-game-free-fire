"use client"
import { useGetTransactions } from '@/api/transaction';
import ATMTable from '@/components/ATMTable/ATMTable';
import { page } from '@/constants/page';
import FilterGroup from '@/lib/FilterGroup/FilterGroup';
import { Suspense, useState } from 'react';
import LoadingLayout from '../card/loading';

function ATMOrders() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const columns = page.atmCard.tableColumns;
    const [atmQuery, setATMQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        types: [ "atm_top_up"],
        startDate: "",
        endDate: "",
    })

    const { data: data } = useGetTransactions(atmQuery);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setATMQuery({
            ...atmQuery,
            page: page,
        })
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setATMQuery({
            ...atmQuery,
            page: 1,
            limit: value,
        })
    };

    const handleSeach = (startDate, endDate, keyword) => {
        setCurrentPage(1);
        setATMQuery({
            ...atmQuery,
            page: 1,
            keyword: keyword,
            startDate: startDate,
            endDate: endDate
        })
    };

    return (
        <div className='mb-6'>
            <FilterGroup
                handleSeach={handleSeach}
                searchPlaceholder={page.atmCard.searchPlaceholder}
            />
            <ATMTable
                columns={columns}
                data={data?.result?.items}
                limitView={limitView}
                totalItems={data?.result?.totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />
            <Suspense fallback={<LoadingLayout />}>
            </Suspense>
        </div>);
}

export default ATMOrders;