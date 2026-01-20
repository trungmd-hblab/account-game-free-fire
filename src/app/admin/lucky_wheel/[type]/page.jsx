'use client'

import { useAddLuckyWheel, useGetLuckyWheels, useRemoveLuckyWheel, useUpdateLuckyWheel } from "@/api/luckyWheel";
import LuckyWheelForm from "@/components/LuckyWheelForm/LuckyWheelForm";
import LuckyWheelTable from "@/components/LuckyWheelTable/LuckyWheelTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Box, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

function LuckyWheelPage({ params }) {
    const { type } = params
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const [modalOpened, setModalOpened] = useState(false);
    const [luckyWheelQuery, setLuckyWheelQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        status: type,
    })
    const columns = page.lucky.tableColumns;

    const { data: data } = useGetLuckyWheels(luckyWheelQuery);
    const mutationAdd = useAddLuckyWheel();
    const mutationEdit = useUpdateLuckyWheel();
    const mutationRemove = useRemoveLuckyWheel();

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

    const handleAddLuckyWheel = async (data) => {
        try {
            await mutationAdd.mutateAsync(data);
            setModalOpened(false);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const handleSaveEditForm = async (id, data) => {
        try {
            await mutationEdit.mutateAsync({ id, data });
        } catch (error) {
            console.error('Error edit transaction:', error);
        }
    };

    const handleRemoveRow = async (id) => {
        try {
            await mutationRemove.mutateAsync(id);
        } catch (error) {
            console.error('Error remove transaction:', error);
        }
    };
    return (
        <div className='mb-6'>
            <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <SearchInput
                    handleSearch={handleSeach}
                    placeholder={page.lucky.searchPlaceholder}
                />
                <Button onClick={() => setModalOpened(true)}><IconPlus size={18} />  {page.lucky.buttonAdd}</Button>
            </Box>
            <LuckyWheelTable
                columns={columns}
                data={data?.result?.items}
                limitView={limitView}
                totalItems={data?.result?.totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSubmit={handleSaveEditForm}
                onRemove={handleRemoveRow}
            />
            <LuckyWheelForm
                mode="add"
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSubmit={handleAddLuckyWheel}
            />
        </div>
    );
}

export default LuckyWheelPage;