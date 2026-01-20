"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Badge, Box, Button, Group, Modal, Text, TextInput } from '@mantine/core';
import { formatNumber } from '@/utils/formatNumber';
import { useUpdateCustomer } from '@/api/customers';
import { toast, ToastContainer } from 'react-toastify';

const EditCustomerForm = (props) => {
    const { customerData, setOpenFormEditCustomer } = props;
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: customerData.name,
        },
    });

    const [confirmModalOpened, setConfirmModalOpened] = useState(false);

    const updateCustomerMutation = useUpdateCustomer();

    const handleLockAccount = () => {
        updateCustomerMutation.mutate({ id: customerData._id, payload: { isActive: false } }, {
            onSuccess: () => {
                toast.info('Cập nhật thành công.', {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
                setConfirmModalOpened(false);
                handleCloseForm();
                reset();
            },
            onError: (error) => {
                toast.error('Cập nhật thất bại.', {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
                console.error('Error locking account:', error);
            },
        });
    };

    const handleOpenAccount = () => {
        updateCustomerMutation.mutate({ id: customerData._id, payload: { isActive: true } }, {
            onSuccess: () => {
                toast.info('Cập nhật thành công.', {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
                setConfirmModalOpened(false);
                handleCloseForm();
                reset();
            },
            onError: (error) => {
                console.error('Error unlocking account:', error);
                toast.error('Cập nhật thất bại.', {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
            },
        });
    };

    const handleCloseForm = () => {
        setOpenFormEditCustomer(false)
    }

    return (<>
        <div>
            <Modal opened={true} onClose={() => handleCloseForm()} title="Thông tin khách hàng">
                <form className='flex flex-col gap-3'>
                    <TextInput
                        label="Họ và tên"
                        {...register('name', { required: 'Tên là bắt buộc' })}
                        error={errors.name && errors.name.message}
                        readOnly disabled
                    />
                    <TextInput label="Tên tài khoản" value={customerData.username} readOnly disabled />
                    <TextInput label="Số điện thoại" value={customerData.phoneName} readOnly disabled />
                    <TextInput label="Số dư tiền (VND)" value={formatNumber(customerData.moneyBalance)} readOnly disabled />
                    <TextInput label="Số dư kim cương" value={formatNumber(customerData.diamondBalance)} readOnly disabled />
                    <Box>
                        <Text size='sm' fw={500}>Trạng thái</Text>
                        <Badge color={customerData.isActive ? "green" : "red"}>
                            {customerData.isActive ? "Đang hoạt động" : "Đã bị khoá"}
                        </Badge>
                    </Box>
                    <Group display='flex' justify='end' mt="lg">
                        {customerData.isActive ? (
                            <Button color="red" onClick={() => setConfirmModalOpened(true)}>Khoá tài khoản</Button>
                        ) : (
                            <Button color="green" onClick={handleOpenAccount}>Mở khoá tài khoản</Button>
                        )}
                        {/* <Button type="submit">Cập nhật</Button> */}
                    </Group>
                </form>
            </Modal>
            <Modal
                opened={confirmModalOpened}
                onClose={() => setConfirmModalOpened(false)}
                title="Xác nhận khoá tài khoản"
                size={380}
                centered
            >
                <Alert title="Cảnh báo" color="red">
                    Bạn có chắc chắn muốn khoá tài khoản này?
                </Alert>
                <Group position="right" mt="md">
                    <Button onClick={() => setConfirmModalOpened(false)}>Hủy</Button>
                    <Button color="red" onClick={handleLockAccount}>Xác nhận</Button>
                </Group>
            </Modal>
        </div>
        <ToastContainer />
    </>
    );
};

export default EditCustomerForm;
