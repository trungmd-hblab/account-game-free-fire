'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Button, Select, TextInput, Group, NumberInput, Textarea, FileInput, Image, Text } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { page } from '@/constants/page';
import { useGetCategoryById } from '@/api/category';
import { DROPDOWN_TYPE_CATEGORY } from '@/constants/common';
import { uploadImage } from '@/api/uploadImage';
import ControlledNumberInput from '@/lib/ControlledNumberInput/ControlledNumberInput';
import dynamic from 'next/dynamic';

function CategoryForm(props) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    const [previewImage, setPreviewImage] = useState('');
    const fileInputRef = useRef(null);
    const { opened, onClose, onSubmit, id, mode } = props;
    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            type: '',
            title: '',
            thumbnailUrl: '',
            imageFile: null,
            description: '',
            price: '',
            discountPercent: '',
            guide: ''
        }
    });

    const { data, isLoading } = useGetCategoryById(id, mode === 'edit' && !!id);
    useEffect(() => {
        if (mode === 'edit' && data) {
            setValue('type', data?.result?.type);
            setValue('title', data?.result?.title);
            setValue('thumbnailUrl', data?.result?.thumbnailUrl);
            setValue('description', data?.result?.description);
            setValue('price', data?.result?.price);
            setValue('discountPercent', data?.result?.discountPercent);
            setValue('guide', data?.result?.guide);
            data?.result?.thumbnailUrl && setPreviewImage(data?.result?.thumbnailUrl);
        }
    }, [data, mode, id, setValue]);

    const onSubmitForm = async (formData) => {
        let thumbnailUrl = formData.thumbnailUrl;

        if (formData.imageFile) {
            thumbnailUrl = await uploadImage(formData.imageFile);
        }

        const data = {
            ...formData,
            thumbnailUrl: thumbnailUrl || formData.thumbnailUrl,
            description: formData.description || null,
            price: formData.price !== '' ? formData.price : null,
            discountPercent: formData.discountPercent !== '' ? formData.discountPercent : null,
            guide: formData.guide || null
        };
        onSubmit(data);
        reset();
        setPreviewImage('');
        onClose();
    };

    const onCloseForm = () => {
        reset();
        setPreviewImage('');
        onClose();
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal
            size='lg'
            opened={opened}
            onClose={onCloseForm}
            title={page.categories.formAdd.titleForm}
        >
            <form
                onSubmit={handleSubmit(onSubmitForm)}
                className='flex flex-col gap-3'
            >
                <Controller
                    name="type"
                    control={control}
                    rules={{ required: 'Loại danh mục bắt buộc' }}
                    render={({ field }) => (
                        <Select
                            label={page.categories.formAdd.type}
                            placeholder="Chọn loại danh mục"
                            data={DROPDOWN_TYPE_CATEGORY}
                            checkIconPosition="right"
                            {...field}
                            error={errors.type && errors.type.message}
                        />
                    )}
                />

                <TextInput
                    label={page.categories.formAdd.title}
                    {...register('title', { required: 'Tên danh mục bắt buộc' })}
                    error={errors.title && errors.title.message}
                />

                <Controller
                    name="imageFile"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <div className='flex flex-col mt-1'>
                            <Text className='text-sm font-medium'>{page.categories.formAdd.thumbnailUrl}</Text>
                            <div
                                onClick={handleFileInputClick}
                                className='cursor-pointer w-28 max-h-52'
                            >
                                <Image src={previewImage ? previewImage : "/images/default_img.png"} alt="Anh_danh_muc" />
                            </div>
                            <FileInput
                                ref={fileInputRef}
                                label={page.categories.formAdd.thumbnailUrl}
                                accept="image/*"
                                onChange={(file) => {
                                    onChange(file);
                                    handleImageChange(file);
                                }}
                                placeholder="Chọn ảnh"
                                error={errors.imageFile && errors.imageFile.message}
                                className='hidden'
                            />
                            {errors.imageFile && errors.imageFile.message && <Text color='red' size='xs'>{errors.imageFile.message}</Text>}
                        </div>
                    )}
                />

                <Textarea
                    label={page.categories.formAdd.description}
                    {...register('description')}
                    error={errors.description && errors.description.message}
                />

                <Controller
                    name="guide"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Text className='text-sm font-medium'>{page.categories.formAdd.guide}</Text>
                            <ReactQuill
                                {...field}
                                theme="snow"
                                placeholder="Nhập hướng dẫn"
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ],
                                }}
                            />
                            {errors.guide && <Text color="red" size="xs">{errors.guide.message}</Text>}
                        </div>
                    )}
                />

                <ControlledNumberInput
                    label={page.categories.formAdd.price}
                    control={control}
                    name="price"
                    min={0}
                    thousandSeparator=","
                    error={errors.price && errors.price.message}
                />

                <ControlledNumberInput
                    label={page.categories.formAdd.discount}
                    control={control}
                    name="discountPercent"
                    min={0}
                    max={100}
                    error={errors.discountPercent && errors.discountPercent.message}
                />

                <Group position="right" mt="md">
                    <Button type="submit">{mode === 'edit' ? 'Cập nhật' : 'Lưu'}</Button>
                    <Button variant="default" onClick={onCloseForm}>Hủy</Button>
                </Group>
            </form>
        </Modal>
    );
}

export default CategoryForm;
