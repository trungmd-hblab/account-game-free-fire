'use client';
import { useAddTransaction, useGetTransactions } from "@/api/transaction";
import TransactionForm from "@/components/TransactionForm/TransactionForm";
import TransactionTable from '@/components/TransactionTable/TransactionTable';
import { page } from '@/constants/page';
import FilterGroup from '@/lib/FilterGroup/FilterGroup';
import { Box, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function TransactionManager() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const columns = page.transaction.tableColumns;
    const [modalOpened, setModalOpened] = useState(false);
    const [transactionQuery, setTransactionQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        types: [ "add_money", "subtract_money"],
        startDate: "",
        endDate: "",
    })

    const { data: data } = useGetTransactions(transactionQuery );
    const mutation = useAddTransaction();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setTransactionQuery({ 
            ...transactionQuery,
            page: page
         })
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setTransactionQuery({
            ...transactionQuery,
            page: 1,
            limit: value
        })
    };

    const handleSeach = (startDate, endDate, keyword) => {
        setCurrentPage(1);
        setTransactionQuery({
            ...transactionQuery,
            page: 1,
            keyword: keyword,
            startDate: startDate,
            endDate: endDate
        })
    };

    const handleAddTransaction = async (data) => {
        try {
            const { username, ...dataWithoutUsername } = data;
            await mutation.mutateAsync({id: username, data:dataWithoutUsername });
            setModalOpened(false);
            toast.info('Cập nhật thành công.', {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className='mb-6'>
             <ToastContainer />
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FilterGroup
                    handleSeach={handleSeach}
                    searchPlaceholder={page.transaction.searchPlaceholder}
                />
                <Button onClick={() => setModalOpened(true)}><IconPlus size={18} />  {page.transaction.buttonAdd}</Button>
            </Box>
            <TransactionTable
                columns={columns}
                data={data?.result?.items}
                limitView={limitView}
                totalItems={data?.result?.totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />
            <TransactionForm
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSubmit={handleAddTransaction}
            />
        </div>
    );
}

export default TransactionManager;
