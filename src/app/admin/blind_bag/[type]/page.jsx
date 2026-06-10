'use client'

import { useAddLuckyWheel, useGetLuckyWheels, useRemoveLuckyWheel, useUpdateLuckyWheel } from "@/api/luckyWheel";
import BlindBagForm from "@/components/BlindBagForm/BlindBagForm";
import BlindBagTable from "@/components/BlindBagTable/BlindBagTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Box, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function BlindBagPage({ params }) {
    const { type } = params;
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const [modalOpened, setModalOpened] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        status: type,
        type: 'blind_bag',
    });
    const columns = page.blindBag.tableColumns;

    const { data } = useGetLuckyWheels(query);
    const mutationAdd = useAddLuckyWheel();
    const mutationEdit = useUpdateLuckyWheel();
    const mutationRemove = useRemoveLuckyWheel();

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

    const handleAdd = async (data) => {
        try {
            await mutationAdd.mutateAsync({ ...data, type: 'blind_bag' });
            setModalOpened(false);
        } catch (error) {
            console.error('Error adding blind bag:', error);
        }
    };

    const handleSaveEdit = async (id, data) => {
        try {
            await mutationEdit.mutateAsync({ id, data });
        } catch (error) {
            console.error('Error editing blind bag:', error);
        }
    };

    const handleRemove = async (id) => {
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
        }
    };

    return (
        <div className='mb-6'>
            <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <SearchInput
                    handleSearch={handleSearch}
                    placeholder={page.blindBag.searchPlaceholder}
                />
                <Button onClick={() => setModalOpened(true)}>
                    <IconPlus size={18} /> &nbsp;{page.blindBag.buttonAdd}
                </Button>
            </Box>
            <BlindBagTable
                columns={columns}
                data={data?.result?.items}
                limitView={limitView}
                totalItems={data?.result?.totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSubmit={handleSaveEdit}
                onRemove={handleRemove}
            />
            <BlindBagForm
                mode="add"
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSubmit={handleAdd}
            />
            <ToastContainer />
        </div>
    );
}

export default BlindBagPage;
