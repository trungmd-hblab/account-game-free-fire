"use client";
import { submitRequestDiamondWithdrawal } from "@/api/client/profile";
import ModalFailed from "@/lib/ModalFailed/ModalFailed";
import ModalSuccess from "@/lib/ModalSuccess/ModalSuccess";
import {
    Box,
    Button,
    Card,
    Container,
    Text,
    TextInput,
    Select
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function RequestDiamondWithdrawal() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            diamondValue: '',
            idInGame: ''
        }
    });

    const [openedModal, setOpenedModal] = useState(false);
    const [openedModalFailed, setOpenedModalFailed] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const diamondValue = parseInt(data.diamondValue, 10);
            await submitRequestDiamondWithdrawal(diamondValue, data.idInGame);
            setOpenedModal(true);
        } catch (error) {
            setOpenedModalFailed(true);
            setMessage(error?.response?.data?.message);
        }
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
                            Yêu cầu rút kim cương
                        </Text>
                    </Box>
                
                    <Box className="flex flex-col gap-4">
                        <Controller
                            name="idInGame"
                            control={control}
                            rules={{ required: 'ID trong game là bắt buộc' }}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="ID trong game"
                                    placeholder="Nhập ID trong game"
                                    error={errors.idInGame?.message}
                                />
                            )}
                        />

                        <Controller
                            name="diamondValue"
                            control={control}
                            rules={{ required: 'Chọn gói kim cương là bắt buộc' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Chọn gói kim cương"
                                    placeholder="Chọn gói kim cương"
                                    data={[
                                        { value: '113', label: '113 kim cương' },
                                        { value: '283', label: '283 kim cương' },
                                        { value: '566', label: '566 kim cương' },
                                        { value: '1132', label: '1132 kim cương' },
                                        { value: '2830', label: '2830 kim cương' }
                                    ]}
                                    error={errors.diamondValue?.message}
                                />
                            )}
                        />

                        <Box className="mt-4 flex justify-end">
                            <Button type="submit">Gửi yêu cầu</Button>
                        </Box>
                    </Box>
                </Card>
            </form>
            <ModalSuccess
                opened={openedModal}
                setOpened={setOpenedModal}
                message="Đã gửi yêu rút kim cương thành công."
            />
            <ModalFailed
                opened={openedModalFailed}
                setOpened={setOpenedModalFailed}
                message={message}
            />
        </Container>
    );
}

export default RequestDiamondWithdrawal;
