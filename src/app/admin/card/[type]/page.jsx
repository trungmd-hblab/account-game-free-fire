"use client"
import { useGetCards } from '@/api/card';
import PhoneCardTable from '@/components/PhoneCardTable/PhoneCardTable';
import { PENDING, STATUS_CHECKED, STATUS_PENDING } from '@/constants/common';
import { page } from '@/constants/page';
import FilterGroup from '@/lib/FilterGroup/FilterGroup';
import { Suspense, useState } from 'react';
import LoadingLayout from '../loading';

export default function CardOrders({ params }) {
    const { type } = params
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const status = type == PENDING ? STATUS_PENDING : STATUS_CHECKED;
    const columns = type == PENDING ? page.phoneCard.tablePendingColumns : page.phoneCard.tableCheckedColumns;
    const [cardQuery, setCardQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        statuses: status,
        startDate: "",
        endDate: "",
    })

    const { data: data } = useGetCards({
        ...cardQuery,
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setCardQuery({
            ...cardQuery,
            page: page,
        })
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setCardQuery({
            ...cardQuery,
            page: 1,
            limit: value,
        })
    };

    const handleSeach = (startDate, endDate, keyword) => {
        setCurrentPage(1);
        setCardQuery({
            ...cardQuery,
            page: 1,
            keyword: keyword,
            startDate: startDate,
            endDate: endDate,
        })
    }
    return (
        <div className='mb-6'>
            <FilterGroup
                handleSeach={handleSeach}
                searchPlaceholder={page.phoneCard.searchPlaceholder}
            />
            <PhoneCardTable
                type={type}
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
        </div>
    )
}