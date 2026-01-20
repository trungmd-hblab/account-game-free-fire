"use client"
import { useAddFlashSale, useGetFlashSales, useRemoveFlashSale, useUpdateFlashSale } from "@/api/flashSale";
import FlashSaleForm from "@/components/FlashSaleForm/FlashSaleForm";
import FlashSaleTable from "@/components/FlashSaleTable/FlashSaleTable";
import { page } from "@/constants/page";
import FilterGroup from "@/lib/FilterGroup/FilterGroup";
import { Box, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from 'react';

function FlashSaleSettings() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const columns = page.flashSale.tableColumns;
    const [modalOpened, setModalOpened] = useState(false);
    const [flashSaleQuery, setFlashSaleQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        startDate: "",
        endDate: "",
    })

    const { data: data } = useGetFlashSales(flashSaleQuery);
    const mutationAdd = useAddFlashSale();
    const mutationEdit = useUpdateFlashSale();
    const mutationRemove = useRemoveFlashSale();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setFlashSaleQuery({ 
            ...flashSaleQuery,
            page: page 
        })
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setFlashSaleQuery({
            ...flashSaleQuery,
            page: 1,
            limit: value
        })
    };

    const handleSeach = (startDate, endDate, keyword) => {
        setCurrentPage(1);
        setFlashSaleQuery({
            ...flashSaleQuery,
            page: 1,
            keyword: keyword,
            startDate: startDate,
            endDate: endDate
        })
    };

    const handleAddFlashSale = async (data) => {
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

    const handleRemoveFlashSave = async (id) => {
        try {
            await mutationRemove.mutateAsync(id);
        } catch (error) {
            console.error('Error remove transaction:', error);
        }
    };

    return (<div className='mb-6'>
        <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
            <FilterGroup
                handleSeach={handleSeach}
                searchPlaceholder={page.flashSale.searchPlaceholder}
            />
            <Button onClick={() => setModalOpened(true)}><IconPlus size={18} />  {page.transaction.buttonAdd}</Button>
        </Box>
        <FlashSaleTable
            columns={columns}
            data={data?.result?.items}
            limitView={limitView}
            totalItems={data?.result?.totalItems}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onSubmit={handleSaveEditForm}
            onRemove={handleRemoveFlashSave}
        />
        <FlashSaleForm
            mode="add"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            onSubmit={handleAddFlashSale}
        />
    </div>
    );
}

export default FlashSaleSettings;