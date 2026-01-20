import { useGetAccountGameById } from "@/api/account";
import { uploadImage } from "@/api/uploadImage";
import { RANK_NICK, TYPE_CATE_FREE_FIRE_ACCOUNT, TYPE_FREE_FIRE_GAME } from "@/constants/common";
import { page } from "@/constants/page";
import CategorySelect from "@/lib/CategorySelect/CategorySelect";
import ControlledNumberInput from "@/lib/ControlledNumberInput/ControlledNumberInput";
import { Button, Group, Image, Modal, Select, Text, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

function AccountGameForm(props) {
    const { opened, onClose, onSubmit, id, mode } = props;
    const { control, register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
        defaultValues: {
            categoryId: "",
            type: TYPE_FREE_FIRE_GAME,
            username: "",
            password: "",
            thumbnailUrl: "",
            imageUrls: [],
            price: 0,
            discountPercent: 0,
            code: "",
            rank: "",
            description: "",
            status: "available"
        }
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const { data, isLoading } = useGetAccountGameById(id, mode === 'edit' && !!id);

    useEffect(() => {
        if (mode === 'edit' && data) {
            const { categoryId, type, username, password, thumbnailUrl, imageUrls, price, discountPercent, code, rank, description, status } = data.result;

            setValue('categoryId', categoryId);
            setValue('type', type);
            setValue('username', username);
            setValue('password', password);
            setValue('thumbnailUrl', thumbnailUrl);
            setValue('imageUrls', imageUrls);
            setValue('price', price);
            setValue('discountPercent', discountPercent);
            setValue('code', code);
            setValue('rank', rank);
            setValue('description', description);
            setValue('status', status);

            setPreviewImages(imageUrls);
        }
    }, [data, mode, id, setValue]);


    const onCloseForm = () => {
        reset();
        setPreviewImages([]);
        setSelectedFiles([]);
        onClose();
    };
    const handleImagePreview = (files) => {
        if (files) {
            const newUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...newUrls]);
            setSelectedFiles(prev => [...prev, ...Array.from(files)]);
        }
    };

    const onSubmitForm = async (data) => {
        const uploadedImages = await Promise.all(
            selectedFiles.map(file => uploadImage(file))
        );
        const existingImages = watch('imageUrls')

        const newListImages = [...existingImages, ...uploadedImages]
        const formData = { ...data, imageUrls: newListImages, thumbnailUrl: newListImages[0] ? newListImages[0] : null };
        onSubmit(formData);
        reset();
        setPreviewImages([]);
        setSelectedFiles([])
        onClose();
    };

    return (
        <Modal
            size="100%"
            opened={opened}
            onClose={onCloseForm}
            title={page.accountGame.formAdd.title}
        >
            <form onSubmit={handleSubmit(onSubmitForm)} className='flex flex-col gap-4'>
                <CategorySelect
                    control={control}
                    name="categoryId"
                    rules={{ required: "Danh mục bắt buộc" }}
                    type={[TYPE_CATE_FREE_FIRE_ACCOUNT]}
                    defaultValue=""
                    errors={errors}
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label={page.accountGame.formAdd.status}
                            placeholder="Chọn trạng thái"
                            data={[
                                { value: 'available', label: 'Đăng bán' },
                                { value: 'unavailable', label: 'Tạm ẩn' }
                            ]}
                            {...field}
                            error={errors.status && errors.status.message}
                        />
                    )}
                />

                <TextInput
                    label={page.accountGame.formAdd.username}
                    placeholder="Nhập tên tài khoản"
                    {...register('username', { required: "Tên tài khoản bắt buộc" })}
                    error={errors.username && errors.username.message}
                />

                <TextInput
                    label={page.accountGame.formAdd.password}
                    placeholder="Nhập mật khẩu"
                    {...register('password', { required: "Mật khẩu bắt buộc" })}
                    error={errors.password && errors.password.message}
                />

                <TextInput
                    label={page.accountGame.formAdd.code}
                    placeholder="Nhập mã tài khoản"
                    {...register('code')}
                />

                <Controller
                    name="rank"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label={page.accountGame.formAdd.rank}
                            placeholder="Chọn rank"
                            data={RANK_NICK}
                            {...field}
                            error={errors.rank && errors.rank.message}
                        />
                    )}
                />

                <div>
                    <Text className='text-sm font-medium'>{page.accountGame.formAdd.urlImg}</Text>
                    <div className='flex gap-3'>
                        {previewImages.map((url, index) => (
                            <div key={index}
                                className='cursor-pointer w-16 max-h-52 mt-1'
                            >
                                <Image src={url} alt={`Preview ${index}`} width={100} height={100} />
                            </div>
                        ))}
                    </div>
                    <Button
                        component="label"
                        variant="outline"
                        mt="md"
                    >
                        Chọn ảnh
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={(e) => handleImagePreview(e.target.files)}
                        />
                    </Button>
                </div>

                <ControlledNumberInput
                    label={page.accountGame.formAdd.price}
                    control={control}
                    name="price"
                    min={0}
                    thousandSeparator=","
                    error={errors.price && errors.price.message}
                />

                <ControlledNumberInput
                    label={page.accountGame.formAdd.discount}
                    control={control}
                    name="discountPercent"
                    min={0}
                    max={100}
                    error={errors.discountPercent && errors.discountPercent.message}
                />

                <Textarea
                    label={page.accountGame.formAdd.description}
                    placeholder="Nhập mô tả"
                    {...register('description')}
                    error={errors.description && errors.description.message}
                />


                <Group position="right" mt="md">
                    <Button variant="light" color='grey' onClick={onCloseForm}>Hủy</Button>
                    <Button type="submit" className='ml-1'>{mode === 'edit' ? 'Cập nhật' : 'Lưu'}</Button>
                </Group>

            </form>
        </Modal>
    );
}

export default AccountGameForm;
