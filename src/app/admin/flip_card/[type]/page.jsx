'use client'

import { useAddLuckyWheel, useGetLuckyWheels, useRemoveLuckyWheel, useUpdateLuckyWheel } from "@/api/luckyWheel";
import FlipCardForm from "@/components/FlipCardForm/FlipCardForm";
import FlipCardTable from "@/components/FlipCardTable/FlipCardTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Box, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function FlipCardPage({ params }) {
    const { type } = params
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const [modalOpened, setModalOpened] = useState(false);
    const [flipCardQuery, setFlipCardQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        status: type,
        type:'pick',
    })
    const columns = page.flipCard.tableColumns;

    const { data: data } = useGetLuckyWheels(flipCardQuery);
    const mutationAdd = useAddLuckyWheel();
    const mutationEdit = useUpdateLuckyWheel();
    const mutationRemove = useRemoveLuckyWheel();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setFlipCardQuery({
            ...flipCardQuery,
            page: page,
        })
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setFlipCardQuery({
            ...flipCardQuery,
            page: 1,
            limit: value
        })
    };

    const handleSeach = (value) => {
        setFlipCardQuery({
            ...flipCardQuery,
            keyword: value,
            page: 1,
        })
    };

    const handleAddLuckyWheel = async (data) => {
        try {
            await mutationAdd.mutateAsync({...data, type:'pick'});
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
            toast.info("Xóa thành công.", {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
        } catch (error) {
            toast.error("Xóa không thành công.", {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
            console.error('Error remove transaction:', error);
        }
    };
    return (
        <div className='mb-6'>
            <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <SearchInput
                    handleSearch={handleSeach}
                    placeholder={page.flipCard.searchPlaceholder}
                />
                <Button onClick={() => setModalOpened(true)}><IconPlus size={18} />  {page.lucky.buttonAdd}</Button>
            </Box>
            <FlipCardTable
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
            <FlipCardForm
                mode="add"
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSubmit={handleAddLuckyWheel}
            />
            <ToastContainer />
        </div>
    );
}

export default FlipCardPage;