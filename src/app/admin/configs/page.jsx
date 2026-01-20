'use client';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Group, Card, Image, Text, FileInput, Textarea } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { useFetchConfig, useSaveConfig } from "@/api/config";
import ControlledNumberInput from "@/lib/ControlledNumberInput/ControlledNumberInput";
import { uploadImage } from "@/api/uploadImage";
import { ToastContainer, toast } from "react-toastify";

function ConfigPage() {
    const { control, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
        defaultValues: {
            atmRate: 0,
            cardRate: 0,
            diamondAttendanceBonus: 0,
            logoUrl: "",
            bannerUrl: "",
            footerUrl: "",
            zaloUrl: "",
            messUrl: ""
        }
    });

    const { data: config, isLoading, isError } = useFetchConfig();
    const { mutate: saveConfig } = useSaveConfig();
    const [previewLogo, setPreviewLogo] = useState('');
    const [previewBanner, setPreviewBanner] = useState('');
    const logoFileInputRef = useRef(null);
    const bannerFileInputRef = useRef(null);

    useEffect(() => {
        if (config) {
            setValue('atmRate', config?.result?.atmRate);
            setValue('cardRate', config?.result?.cardRate);
            setValue('diamondAttendanceBonus', config?.result?.diamondAttendanceBonus);
            setValue('logoUrl', config?.result?.logoUrl);
            setValue('bannerUrl', config?.result?.bannerUrl);
            setValue('footerUrl', config?.result?.footerUrl);
            setValue('zaloUrl', config?.result?.zaloUrl);
            setValue('messUrl', config?.result?.messUrl);
            setPreviewLogo(config?.result?.logoUrl);
            setPreviewBanner(config?.result?.bannerUrl);
        }
    }, [config, setValue]);

    const onSubmit = async (data) => {
        const updatedData = { ...data };

        if (data.logoFile) {
            updatedData.logoUrl = await uploadImage(data.logoFile);
        }

        if (data.bannerFile) {
            updatedData.bannerUrl = await uploadImage(data.bannerFile);
        }

        saveConfig(updatedData, {
            onSuccess: () => {
                toast.info("Lưu thành công.", {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
            },
            onError: () => {
                toast.error("Lưu không thành công.", {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
            }
        });
    };

    const handleImageChange = (file, setPreview) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card className="mb-16">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <ControlledNumberInput
                    label="Tỷ lệ ATM"
                    rules={{ required: "Tỷ lệ ATM bắt buộc" }}
                    control={control}
                    name="atmRate"
                    min={0}
                    thousandSeparator=","
                    error={errors.atmRate && errors.atmRate.message}
                />

                <ControlledNumberInput
                    label="Tỷ lệ thẻ nạp điện thoại"
                    rules={{ required: "Tỷ lệ nạp điện thoại bắt buộc" }}
                    control={control}
                    name="cardRate"
                    min={0}
                    thousandSeparator=","
                    error={errors.cardRate && errors.cardRate.message}
                />

                <ControlledNumberInput
                    label="Số kim cương thưởng điểm danh"
                    // rules={{ required: "Số kim cương thưởng bắt buộc" }}
                    control={control}
                    name="diamondAttendanceBonus"
                    min={0}
                    thousandSeparator=","
                    error={errors.diamondAttendanceBonus && errors.diamondAttendanceBonus.message}
                />

                <Controller
                    name="logoFile"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <div className='flex flex-col mt-1'>
                            <Text className='text-sm font-medium'>Logo URL</Text>
                            <div
                                onClick={() => logoFileInputRef.current.click()}
                                className='cursor-pointer w-28 max-h-52'
                            >
                                <Image src={previewLogo ? previewLogo : "/images/default_img.png"} alt="Logo" />
                            </div>
                            <FileInput
                                ref={logoFileInputRef}
                                accept="image/*"
                                onChange={(file) => {
                                    onChange(file);
                                    handleImageChange(file, setPreviewLogo);
                                }}
                                placeholder="Chọn ảnh"
                                error={errors.logoFile && errors.logoFile.message}
                                className='hidden'
                            />
                            {errors.logoFile && errors.logoFile.message && <Text color='red' size='xs'>{errors.logoFile.message}</Text>}
                        </div>
                    )}
                />

                <Controller
                    name="bannerFile"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <div className='flex flex-col mt-1'>
                            <Text className='text-sm font-medium'>Banner URL</Text>
                            <div
                                onClick={() => bannerFileInputRef.current.click()}
                                className='cursor-pointer w-28 max-h-52'
                            >
                                <Image src={previewBanner ? previewBanner : "/images/default_img.png"} alt="Banner" />
                            </div>
                            <FileInput
                                ref={bannerFileInputRef}
                                accept="image/*"
                                onChange={(file) => {
                                    onChange(file);
                                    handleImageChange(file, setPreviewBanner);
                                }}
                                placeholder="Chọn ảnh"
                                error={errors.bannerFile && errors.bannerFile.message}
                                className='hidden'
                            />
                            {errors.bannerFile && errors.bannerFile.message && <Text color='red' size='xs'>{errors.bannerFile.message}</Text>}
                        </div>
                    )}
                />

                <Controller
                    name="zaloUrl"
                    control={control}
                    rules={{ required: "Zalo URL bắt buộc" }}
                    render={({ field }) => (
                        <TextInput
                            label="Zalo URL"
                            placeholder="Nhập URL của Zalo"
                            {...field}
                            error={errors.zaloUrl && errors.zaloUrl.message}
                        />
                    )}
                />

                <Controller
                    name="messUrl"
                    control={control}
                    rules={{ required: "Facebook URL bắt buộc" }}
                    render={({ field }) => (
                        <TextInput
                            label="Facebook URL"
                            placeholder="Nhập URL của Facebook"
                            {...field}
                            error={errors.messUrl && errors.messUrl.message}
                        />
                    )}
                />

                <Controller
                    name="footerUrl"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            resize="vertical"
                            rows={10}
                            label="Dev support"
                            placeholder='<div class="text-center">
                                        <p>NỔ ACC SIÊU VIP</p>
                                        <p>Chỉ <strong>39k </strong> săn ngay acc vip FlashSale</p>
                                        </div>'
                            {...field}
                            error={errors.footerUrl && errors.footerUrl.message}
                            className="support-field "
                        />
                    )}
                />

                <Group position="right" mt="md">
                    <Button type="submit" className='ml-1'>Lưu</Button>
                </Group>
            </form>
            <ToastContainer />
        </Card>
    );
}

export default ConfigPage;
