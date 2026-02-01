"use client";
import { submitPhoneCard } from "@/api/client/profile";
import ModalFailed from "@/lib/ModalFailed/ModalFailed";
import ModalSuccess from "@/lib/ModalSuccess/ModalSuccess";
import {
    Box,
    Button,
    Card,
    Container,
    Select,
    Text,
    TextInput
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function PhoneCard() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            provider: '',
            cardNumber: '',
            serialNumber: '',
            denomination: '',
        }
    });
    const [openedModal, setOpenedModal] = useState(false);
    const [openedModalFailed, setOpenedModalFailed] = useState(false);
    const [message, setMessage] = useState('');

    const provider = watch('provider');
    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const denominationValue = parseInt(data.denomination.replace('đ', '').replace('.', ''));
            await submitPhoneCard(data.provider, data.cardNumber, data.serialNumber, denominationValue);
            setOpenedModal(true);
            setLoading(false);
        } catch (error) {
            setOpenedModalFailed(true);
            setMessage(error?.response?.data?.message);
            setLoading(false);
        }
        setValue('cardNumber', '');
        setValue('serialNumber', '');   
    };

    return (
        <Container size="full" p={0}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card
                    style={{ boxShadow: "1px 2px 8px 1px #dcdbdb", padding: "24px" }}
                    radius={8}
                >
                    <Box className="flex gap-2 items-center mb-4">
                        <Link href="/cac_danh_muc_thong_tin" className="block lg:hidden">
                            <IconArrowLeft size={22} className="cursor-pointer" />
                        </Link>
                        <Text size="xl" fw={600}>
                            Nạp thẻ cào
                        </Text>
                    </Box>
                    {error && (
                        <Text color="red" size="sm" className="mb-4">
                            {error}
                        </Text>
                    )}
                    <Box className="flex flex-col gap-4">
                        <Controller
                            name="provider"
                            control={control}
                            rules={{ required: 'Nhà cung cấp là bắt buộc' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    checkIconPosition="right"
                                    label="Nhà cung cấp"
                                    data={[
                                        { value: 'VIETTEL', label: 'VIETTEL' },
                                        { value: 'VINAPHONE', label: 'VINAPHONE' },
                                        { value: 'MOBIFONE', label: 'MOBIFONE' },
                                        { value: 'GARENA', label: 'GARENA' },
                                    ]}
                                    placeholder="Chọn nhà cung cấp"
                                    disabled={loading}
                                    error={errors.provider?.message}
                                />
                            )}
                        />

                        <Controller
                            name="cardNumber"
                            control={control}
                            rules={{ required: 'Mã số thẻ là bắt buộc' }}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Mã số thẻ"
                                    disabled={loading}
                                    error={errors.cardNumber?.message}
                                />
                            )}
                        />

                        <Controller
                            name="serialNumber"
                            control={control}
                            rules={{ required: 'Mã số seri là bắt buộc' }}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Mã số seri"
                                    disabled={loading}
                                    error={errors.serialNumber?.message}
                                />
                            )}
                        />

                        {provider && (
                            <Box>
                                <Text className="font-medium text-sm mb-3">Chọn mệnh giá nạp</Text>
                                {errors.denomination && <Text className="text-red-500">{errors.denomination.message}</Text>}
                                <Box className="flex gap-2 flex-wrap">
                                    {['10.000đ', '20.000đ', '30.000đ', '50.000đ', '100.000đ', '200.000đ', '300.000đ', '500.000đ', '1.000.000đ'].map((value, index) => (
                                        <Controller
                                            key={index}
                                            name="denomination"
                                            control={control}
                                            rules={{ required: 'Mệnh giá nạp là bắt buộc' }}
                                            render={({ field }) => (
                                                <Card
                                                    className={`flex flex-col gap-1 p-3 text-center border cursor-pointer w-[31%] md:w-[22%] lg:w-[15%] ${field.value === value ? 'border-blue-500' : ''
                                                        }`}
                                                    onClick={() => {
                                                        if (loading) return;
                                                        field.onChange(value);
                                                    }}
                                                >
                                                    <Text className="font-medium text-sm">{value}</Text>
                                                    <Text className="font-medium text-xs text-[#848383]">Nhận 100%</Text>
                                                </Card>
                                            )}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}

                        <Box className="mt-4 flex justify-end">
                            <Button type="submit" disabled={loading}>Xác nhận nạp</Button>
                        </Box>
                    </Box>
                </Card>
            </form>
            <ModalSuccess
                opened={openedModal}
                setOpened={setOpenedModal}
                message="Đã gửi yêu cầu nạp tiền thành công. Số tiền của bạn sẽ được cập nhật sau ít phút."
            />
            <ModalFailed
                opened={openedModalFailed}
                setOpened={setOpenedModalFailed}
                message={message}
            />
        </Container>
    );
}

export default PhoneCard;