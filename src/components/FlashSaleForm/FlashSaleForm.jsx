import { useGetFlashSaleById } from '@/api/flashSale';
import { uploadImage } from '@/api/uploadImage';
import { page } from '@/constants/page';
import ControlledNumberInput from '@/lib/ControlledNumberInput/ControlledNumberInput';
import { formatDate, getDate } from '@/utils/formatDate';
import { Button, FileInput, Group, Image, Modal, Text, TextInput, Tooltip } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCalendar, IconCopy, IconHelp, IconPlus, IconTrashFilled } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

function FlashSaleForm(props) {
    const [previewImages, setPreviewImages] = useState({});
    const fileInputRefs = useRef([]);
    const { opened, onClose, onSubmit, id, mode } = props;
    const { control, register, handleSubmit, formState: { errors }, setValue, reset, watch, getValues } = useForm({
        defaultValues: {
            startDateTimeAt: new Date(),
            endDateTimeAt: new Date(),
            flashSaleAccounts: [
                {
                    title: '',
                    accountId: '',
                    imageUrl: '',
                    imageFile: null,
                    description: '',
                    price: 0,
                    discount: 0
                }
            ]
        }
    });

    const startDateTimeAtField = watch('startDateTimeAt');
    const endDateTimeAtField = watch('endDateTimeAt');

    const { fields, append, remove } = useFieldArray({
        control,
        name: "flashSaleAccounts"
    });

    const { data, isLoading } = useGetFlashSaleById(id, mode === 'edit' && !!id);

    useEffect(() => {
        if (mode === 'edit' && data) {
            data?.result?.startDateTimeAt && setValue('startDateTimeAt', new Date(data?.result?.startDateTimeAt));
            data?.result?.endDateTimeAt && setValue('endDateTimeAt', new Date(data?.result?.endDateTimeAt));
            setValue('flashSaleAccounts', data?.result?.flashSaleAccounts);
            data?.result?.flashSaleAccounts?.forEach((account, index) => {
                account.imageUrl && setPreviewImages(prev => ({ ...prev, [index]: account.imageUrl }));
            });
        }
    }, [data, mode, id, setValue]);

    useEffect(() => {
        if (startDateTimeAtField && endDateTimeAtField && getDate(startDateTimeAtField) !== getDate(endDateTimeAtField)) {
            setValue('startDateTimeAt', endDateTimeAtField);
        }
    }, [startDateTimeAtField, endDateTimeAtField, setValue]);

    const onSubmitForm = async (data) => {
        const flashSaleAccounts = await Promise.all(data.flashSaleAccounts.map(async (account) => {
            if (account.imageFile) {
                const imageUrl = await uploadImage(account.imageFile);
                return { ...account, imageUrl };
            }
            return account;
        }));

        onSubmit({ ...data, flashSaleAccounts });
        reset();
        setPreviewImages({});
        onClose();
    };

    const onCloseForm = () => {
        reset();
        setPreviewImages({});
        onClose();
    };

    const handleImageChange = (file, index) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages(prev => ({ ...prev, [index]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileInputClick = (index) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].click();
        }
    };

    const handleDuplicateAccount = (index) => {
        const flashSaleAccounts = [...getValues('flashSaleAccounts')];
        const duplicatedAccount = { ...flashSaleAccounts[index] };
        flashSaleAccounts.splice(index + 1, 0, duplicatedAccount);
        setValue('flashSaleAccounts', flashSaleAccounts);

        const urlImage = previewImages[index];
        const updatedPreviewImages = previewImages;
        const keys = Object.keys(updatedPreviewImages);
        let newPreviewImages = {};

        keys.forEach((key, idx) => {
            if (idx < index) {
                newPreviewImages[idx] = updatedPreviewImages[idx];
            } else if (idx === index) {
                newPreviewImages[idx] = updatedPreviewImages[idx];
                newPreviewImages[idx + 1] = urlImage;
            } else {
                newPreviewImages[idx + 1] = updatedPreviewImages[idx];
            }
        });
        setPreviewImages(newPreviewImages);
    };

    const handleRemoveAccount = (index) => {
        const flashSaleAccounts = getValues('flashSaleAccounts');
        flashSaleAccounts.splice(index, 1);
        setValue('flashSaleAccounts', flashSaleAccounts);

        const updatedPreviewImages = { ...previewImages };
        const keys = Object.keys(updatedPreviewImages);
        let newPreviewImages = {};

        keys.forEach((key, idx) => {
            if (idx < index) {
                newPreviewImages[idx] = updatedPreviewImages[idx];
            } else if (idx > index) {
                newPreviewImages[idx - 1] = updatedPreviewImages[idx];
            }
        });

        setPreviewImages(newPreviewImages);
    }

    const handleAddNewAccount = () => {
        append({
            title: '',
            accountId: '',
            imageUrl: '',
            imageFile: null,
            description: '',
            price: 0,
            discount: 0
        });
        setPreviewImages((prev) => ({
            ...prev,
            [fields.length]: ''
        }));
    }

    return (
        <Modal
            size='100%'
            opened={opened}
            onClose={onCloseForm}
            title={page.flashSale.formAdd.title}
        >
            <form
                onSubmit={handleSubmit(onSubmitForm)}
                className='flex flex-col gap-4'
            >
                <div className='flex gap-3 items-center'>
                    <Controller
                        name="startDateTimeAt"
                        control={control}
                        rules={{ required: 'Ngày bắt đầu bắt buộc' }}
                        render={({ field }) => (
                            <DateTimePicker
                                label={
                                    <div className='flex gap-1 items-center'>
                                        <div>{page.flashSale.formAdd.startDate} </div>
                                        <Tooltip label="SA: sáng | CH: chiều"><IconHelp size={14} stroke={1.5} /></Tooltip>
                                    </div>
                                }
                                {...field}
                                error={errors.startDateTimeAt && errors.startDateTimeAt.message}
                                leftSection={<IconCalendar size={18} stroke={1.5} />}
                                maxDate={endDateTimeAtField}
                                clearable
                            />
                        )}
                    />

                    <Controller
                        name="endDateTimeAt"
                        control={control}
                        rules={{ required: 'Ngày kết thúc bắt buộc' }}
                        render={({ field }) => (
                            <DateTimePicker
                                label={
                                    <div className='flex gap-1 items-center'>
                                        <div>{page.flashSale.formAdd.endDate} </div>
                                        <Tooltip label="SA: sáng | CH: chiều"><IconHelp size={14} stroke={1.5} /></Tooltip>
                                    </div>
                                }
                                {...field}
                                error={errors.endDateTimeAt && errors.endDateTimeAt.message}
                                leftSection={<IconCalendar size={18} stroke={1.5} />}
                                minDate={startDateTimeAtField}
                                clearable
                            />
                        )}
                    />
                </div>
                <Text className='mt-3 font-medium text-lg'>Danh sách tài khoản</Text>

                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-3 pb-4 mb-4 border-b-[0.5px]">
                        <div className='flex gap-2 flex-nowrap'>
                            <div className='min-w-14 '>
                                <Controller
                                    name={`flashSaleAccounts.${index}.imageFile`}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className='flex flex-col mt-1'>
                                            <FileInput
                                                ref={(el) => fileInputRefs.current[index] = el}
                                                label={page.flashSale.formAdd.urlImg}
                                                accept="image/*"
                                                onChange={(file) => {
                                                    onChange(file);
                                                    handleImageChange(file, index);
                                                }}
                                                placeholder="Chọn ảnh"
                                                className='hidden'
                                            />
                                            <Text className='text-sm font-medium'>{page.flashSale.formAdd.urlImg}</Text>
                                            <div
                                                onClick={() => handleFileInputClick(index)}
                                                className="cursor-pointer h-9 p-1 bg-white border rounded-md flex items-center justify-center"
                                            >
                                                <Image src={previewImages[index] ? previewImages[index] : "/images/default_img.png"} alt="Preview" className="w-full h-full" />
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className='min-w-48'>
                                <Controller
                                    name={`flashSaleAccounts.${index}.title`}
                                    control={control}
                                    rules={{
                                        required: 'Tên tài khoản bắt buộc',
                                        validate: value => value.trim() !== "" || 'Tên tài khoản bắt buộc'
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            label={page.flashSale.formAdd.accountName}
                                            {...field}
                                            error={errors.flashSaleAccounts?.[index]?.title && errors.flashSaleAccounts[index].title.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='min-w-48'>
                                <Controller
                                    name={`flashSaleAccounts.${index}.accountId`}
                                    control={control}
                                    rules={{
                                        required: 'Mã tài khoản bắt buộc',
                                        validate: value => value.trim() !== "" || 'Mã tài khoản bắt buộc'
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            label={page.flashSale.formAdd.accountId}
                                            {...field}
                                            error={errors.flashSaleAccounts?.[index]?.accountId && errors.flashSaleAccounts[index].accountId.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='min-w-48'>
                                <ControlledNumberInput
                                    label={page.flashSale.formAdd.price}
                                    control={control}
                                    name={`flashSaleAccounts.${index}.price`}
                                    min={0}
                                    thousandSeparator=","
                                    error={errors.flashSaleAccounts?.[index]?.price && errors.flashSaleAccounts[index].price.message}
                                />
                            </div>
                            <div className='min-w-48'>
                                <ControlledNumberInput
                                    label={page.flashSale.formAdd.discount}
                                    control={control}
                                    name={`flashSaleAccounts.${index}.discount`}
                                    min={0}
                                    max={100}
                                    error={errors.flashSaleAccounts?.[index]?.discount && errors.flashSaleAccounts[index].discount.message}
                                />
                            </div>
                            <div className='min-w-64'>
                                <TextInput
                                    autosize
                                    minRows={2}
                                    label={page.flashSale.formAdd.description}
                                    {...register(`flashSaleAccounts.${index}.description`)}
                                />
                            </div>

                            <div className='flex flex-col mt-1 min-w-24'>
                                <Text className='text-sm font-medium'>{page.flashSale.formAdd.action}</Text>
                                <Group className='flex gap-1'>
                                    <Button
                                        variant="light"
                                        color="red"
                                        onClick={() => handleRemoveAccount(index)}
                                        className='p-0 w-10 h-10'
                                    >
                                        <IconTrashFilled size={18} />
                                    </Button>
                                    <Button
                                        type="button"
                                        color="blue"
                                        onClick={() => handleDuplicateAccount(index)}
                                        className='p-0 w-10 h-10'
                                    >
                                        <IconCopy size={18} />
                                    </Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                ))}

                <div className='flex justify-end'>
                    <Button
                        type="button"
                        onClick={handleAddNewAccount}
                    >
                        <IconPlus size={18} />
                        Thêm tài khoản
                    </Button>
                </div>

                <div className='flex border-t pt-3 bottom-0'>
                    <Button variant="light" color='grey' onClick={onCloseForm}>Hủy</Button>
                    <Button type="submit" className='ml-1'>{mode === 'edit' ? 'Cập nhật' : 'Lưu'}</Button>
                </div>
            </form>
        </Modal>
    );
};
export default FlashSaleForm;
