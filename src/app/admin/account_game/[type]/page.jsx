"use client"
import { useAddAccount, useAddAccounts, useGetAccounts, useRemoveAccount, useUpdateAccount } from '@/api/account';
import { useGetCategories } from '@/api/category';
import { useGetStaffs } from '@/api/staffs';
import AccountCredentialsForm from '@/components/AccountCredentialsForm/AccountCredentialsForm';
import AccountGameForm from '@/components/AccountGameForm/AccountGameForm';
import AccountGameTable from '@/components/AccountGameTable/AccountGameTable';
import { SOLD, STATUS_SELLING_ACCOUNT, STATUS_SOLD_ACCOUNT, TYPE_CATE_FREE_FIRE_ACCOUNT, TYPE_CATE_OTHER_GAME_ACCOUNT, TYPE_CATE_RANDOM_GAME_ACCOUNT, TYPE_FREE_FIRE_GAME } from '@/constants/common';
import { page } from '@/constants/page';
import SearchInput from '@/lib/SearchInput/SearchInput';
import useRoleStore from '@/stores/role';
import { Box, Button, Select } from '@mantine/core';
import { IconLibraryPlus, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

function ListAccount({ params }) {
    const { type } = params
    const {role} = useRoleStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [limitView, setLimitView] = useState(10);
    const [modalOpened, setModalOpened] = useState(false);
    const [dataToSelect, setDataToSelect] = useState([])
    const [dataStaffs, setDataStaffs] = useState([]);
    const [modalOpenedFormMulti, setModalOpenedFormMulti] = useState(false);
    const status = type == SOLD ? STATUS_SOLD_ACCOUNT : STATUS_SELLING_ACCOUNT;
    const columns = type == SOLD ? page.accountGame.tableSoldColumns : page.accountGame.tableSellingColumns;
    const [accountQuery, setAccountQuery] = useState({
        keyword: "",
        page: 1,
        limit: 10,
        type: TYPE_FREE_FIRE_GAME,
        statuses: status,
        categoryId: '',
        createdBy:''
    })

    const { data: listCate, isLoading } = useGetCategories({
        keyword: "",
        page: 1,
        limit: 5000,
        types: [TYPE_CATE_RANDOM_GAME_ACCOUNT, TYPE_CATE_FREE_FIRE_ACCOUNT, TYPE_CATE_OTHER_GAME_ACCOUNT ]
    });

    const {data: listStaff} = useGetStaffs({
        page: 1,
        limit: 5000,
    })

    const { data: data } = useGetAccounts(accountQuery);
    const mutationAdd = useAddAccount();
    const mutationEdit = useUpdateAccount();
    const mutationRemove = useRemoveAccount();
    const mutationAddAccounts = useAddAccounts();

    useEffect(() => {
        if (listCate) {
            const newData = listCate?.result?.items?.map((item) => {
                return {
                    label: item?.title,
                    value: item?._id
                }
            })
            setDataToSelect(newData)
        }
    }, [listCate]);

    useEffect(() => {
        if (listStaff) {
            const newData = listStaff?.result?.items?.map((item) => {
                return {
                    label: item?.username,
                    value: item?._id
                }
            })
            setDataStaffs(newData)
        }
    }, [listStaff]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
        setAccountQuery({
            ...accountQuery,
            page: page,
        })
    };

    const handleLimitChange = (value) => {
        setCurrentPage(1);
        setLimitView(value);
        setAccountQuery({
            ...accountQuery,
            page: 1,
            limit: value,
        })
    };

    const handleSearchByKeyWord = (value) => {
        setCurrentPage(1);
        setAccountQuery({
            ...accountQuery,
            page: 1,
            keyword: value,
        })
    };
    const handleAddAccountGame = async (data) => {
        try {
            await mutationAdd.mutateAsync(data);
            setModalOpened(false);
            toast.info("Tạo thành công.", {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "bottom-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
        }
    };

    const handleSaveEditForm = async (id, data) => {
        try {
            await mutationEdit.mutateAsync({ id, data });
        } catch (error) {
            console.error('Error edit transaction:', error);
        }

    };

    const handleRemoveAccount = async (id) => {
        try {
            await mutationRemove.mutateAsync(id);
        } catch (error) {
            console.error('Error remove transaction:', error);
        }
    };

    const handleAddAccountsGame = async (data) => {
        try {
            await mutationAddAccounts.mutateAsync(data);
            setModalOpened(false);
            toast.info("Tạo thành công.", {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "bottom-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
        }
    }

    const handleCategoryChange = (value) => {
        setCurrentPage(1);
        setAccountQuery((prevQuery) => ({
            ...prevQuery,
            page: 1,
            categoryId: value,
        }));
    };

    const handleAuthorChange = (value) => {
        setCurrentPage(1);
        setAccountQuery((prevQuery) => ({
            ...prevQuery,
            page: 1,
            createdBy:value,
        }));
    };

    return (
        <div className='mb-6'>
            <ToastContainer />
            <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <Box className='flex gap-2 flex-wrap'>
                    {role == "admin" && (
                        <Select
                            placeholder='Lọc theo người đăng'
                            data={dataStaffs}
                            onChange={handleAuthorChange}
                        />
                    )}
                    <Select
                        placeholder='Lọc theo danh mục'
                        data={dataToSelect}
                        onChange={handleCategoryChange}
                    />

                    <SearchInput
                        handleSearch={handleSearchByKeyWord}
                        placeholder={page.accountGame.searchPlaceholder}
                    />
                </Box>
                <Box className='flex gap-2'>
                    <Button onClick={() => setModalOpened(true)}><IconPlus size={18} className='mr-[2px]' />  {page.accountGame.addNewAccount}</Button>
                    <Button onClick={() => setModalOpenedFormMulti(true)}><IconLibraryPlus size={18} className='mr-[2px]' />  {page.accountGame.addNewAccounts}</Button>
                </Box>
            </Box>
            <AccountGameTable
                type={type}
                columns={columns}
                data={data?.result?.items}
                limitView={limitView}
                totalItems={data?.result?.totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSubmit={handleSaveEditForm}
                onRemove={handleRemoveAccount}
            />
            <AccountGameForm
                mode="add"
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                onSubmit={handleAddAccountGame}
            />
            <AccountCredentialsForm
                opened={modalOpenedFormMulti}
                onClose={() => setModalOpenedFormMulti(false)}
                onSubmit={handleAddAccountsGame}
            />
        </div>
    );
}

export default ListAccount;