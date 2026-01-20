'use client';
import { useGetCustomers } from "@/api/customers";
import CustomerTable from "@/components/CustomerTable/CustomerTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Suspense, useState } from "react";
import LoadingLayout from "./loading";

export default function PageManageCustomers() {
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const columns = page.customers.tableColumns;

    const { data: data, isLoading, isError, refetch } = useGetCustomers({
        keyword,
        page: currentPage,
        limit: limitView,
    }, true);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
    };

    const handleSearchByKeyWord = (value) => {
        setCurrentPage(1);
        setKeyword(value);
    };

    return (
        <div className='mb-6'>
            <SearchInput
                handleSearch={handleSearchByKeyWord}
                placeholder={page.customers.searchPlaceholder}
            />
            <Suspense fallback={<LoadingLayout />}>
                <CustomerTable
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
