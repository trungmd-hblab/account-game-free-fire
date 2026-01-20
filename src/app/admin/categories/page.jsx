"use client";
import { useAddCategory, useGetCategories, useRemoveCategory, useUpdateCategory } from '@/api/category';
import CategoriesTable from '@/components/CategoriesTable/CategoriesTable';
import CategoryForm from '@/components/CategoryForm/CategoryForm';
import { TYPE_CATE_FREE_FIRE_ACCOUNT, TYPE_CATE_OTHER_GAME_ACCOUNT, TYPE_CATE_RANDOM_GAME_ACCOUNT } from '@/constants/common';
import { page } from '@/constants/page';
import SearchInput from '@/lib/SearchInput/SearchInput';
import { Box, Button, MultiSelect } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

function CategorieSettings() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const columns = page.categories.tableColumns;
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([
        TYPE_CATE_FREE_FIRE_ACCOUNT,
        TYPE_CATE_OTHER_GAME_ACCOUNT,
        TYPE_CATE_RANDOM_GAME_ACCOUNT
    ]);
    const [categoryQuery, setCategoryQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        types: selectedTypes
    });

    const { data: data } = useGetCategories(categoryQuery);

    const mutationAdd = useAddCategory();
    const mutationEdit = useUpdateCategory();
    const mutationRemove = useRemoveCategory();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setCategoryQuery({
            ...categoryQuery,
            page: page,
        });
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setCategoryQuery({
            ...categoryQuery,
            page: 1,
            limit: value
        });
    };

    const handleSearch = (value) => {
        setCategoryQuery({
            ...categoryQuery,
            keyword: value,
            page: 1,
        });
    };

    const handleFilterChange = (values) => {
        setSelectedTypes(values);
        setCategoryQuery({
            ...categoryQuery,
            types: values,
            page: 1,
        });
    };

    const handleAddCategory = async (data) => {
        try {
            await mutationAdd.mutateAsync(data);
            setModalOpened(false);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleSaveEditForm = async (id, data) => {
        try {
            await mutationEdit.mutateAsync({ id, data });
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    const handleRemoveCategory = async (id) => {
        try {
            await mutationRemove.mutateAsync(id);
        } catch (error) {
            console.error('Error removing category:', error);
        }
    };

    return (
        <div className='mb-6'>
            <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>

                <Box className='flex flex-col gap-2'>
                    <MultiSelect
                        data={[
                            { value: TYPE_CATE_FREE_FIRE_ACCOUNT, label: 'Free Fire' },
                            { value: TYPE_CATE_RANDOM_GAME_ACCOUNT, label: 'Random' },
                            { value: TYPE_CATE_OTHER_GAME_ACCOUNT, label: 'Loại khác' },
                        ]}
                        value={selectedTypes}
                        onChange={handleFilterChange}
                        placeholder="Chọn loại"
                    />
                    <SearchInput
                        handleSearch={handleSearch}
                        placeholder={page.categories.searchPlaceholder}
                    />
                </Box>
                <Button onClick={() => setModalOpened(true)}>
                    <IconPlus size={18} /> {page.categories.buttonAdd}
                </Button>
            </Box>
            <CategoriesTable
                columns={columns}
                data={data?.result?.items}
                limitView={limitView}
                totalItems={data?.result?.totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSubmit={handleSaveEditForm}
                onRemove={handleRemoveCategory}
            />
            <CategoryForm
                mode="add"
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSubmit={handleAddCategory}
            />
        </div>
    );
}

export default CategorieSettings;
