import { useGetCustomers } from '@/api/customers';
import { page } from '@/constants/page';
import ControlledNumberInput from '@/lib/ControlledNumberInput/ControlledNumberInput';
import { Button, Group, Modal, Select, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const TransactionForm = ({ opened, onClose, onSubmit }) => {
    const [dataCustomers, setDataCustomers] = useState([]);
    const [keyword, setKeyword] = useState('');

    const { data: resultSearch, isLoading, isError } = useGetCustomers({
        keyword,
        page: 1,
        limit: 1000,
        statuses: [],
    }, keyword.trim() !== '');

    useEffect(() => {
        if (resultSearch?.result?.items?.length) {
            const newData = resultSearch.result.items.map((item) => ({
                value: item._id,
                label: item.username,
            }));
            setDataCustomers(newData);
        }
    }, [resultSearch]);

    const { control, handleSubmit, formState: { errors }, reset, setValue, register } = useForm({
        defaultValues: {
            type: '0',
            username: '',
            money: '',
            reason: '',
        }
    });


    const onSubmitForm = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title={page.transaction.formAdd.title}>
            <form onSubmit={handleSubmit(onSubmitForm)} className='flex flex-col gap-3'>
                <Controller
                    name="type"
                    control={control}
                    rules={{ required: 'Loại là bắt buộc' }}
                    render={({ field }) => (
                        <Select
                            checkIconPosition="right"
                            label={page.transaction.formAdd.type}
                            data={[
                                { value: 'add', label: 'Cộng tiền' },
                                { value: 'subtract', label: 'Trừ tiền' }
                            ]}
                            {...field}
                            error={errors.type?.message}
                        />
                    )}
                />
                <Controller
                    name="username"
                    control={control}
                    {...register("username", {
                        required: true,
                        validate: value => value.trim() !== "" || 'Tên khách hàng là bắt buộc'
                    })}
                    render={({ field }) => (
                        <Select
                            searchable
                            checkIconPosition="right"
                            label={page.transaction.formAdd.clientName}
                            data={dataCustomers}
                            {...field}
                            onSearchChange={(value) => setKeyword(value)}
                            error={errors.username?.message}
                        />
                    )}
                />
                <ControlledNumberInput
                    label="Số tiền"
                    control={control}
                    name="money"
                    rules={{ required: 'Số tiền là bắt buộc' }}
                    thousandSeparator=","
                />
                <Textarea
                    label="Lý do"
                    {...register('reason', { required: 'Lý do là bắt buộc' })}
                    error={errors.reason?.message}
                />
                <Group position="right" mt="md">
                    <Button type="submit">{page.transaction.formAdd.buttonSave}</Button>
                    <Button variant="default" onClick={onClose}>{page.transaction.formAdd.buttonCancel}</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default TransactionForm;
