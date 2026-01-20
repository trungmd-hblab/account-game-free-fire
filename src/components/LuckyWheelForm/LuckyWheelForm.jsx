import { useGetLuckyWheelById } from "@/api/luckyWheel";
import { uploadImage } from "@/api/uploadImage";
import { TYPE_CATE_RANDOM_GAME_ACCOUNT } from "@/constants/common";
import CategorySelect from "@/lib/CategorySelect/CategorySelect";
import ControlledNumberInput from "@/lib/ControlledNumberInput/ControlledNumberInput";
import { Button, FileInput, Image, Modal, Select, Text, Textarea, TextInput } from "@mantine/core";
import { IconPlus, IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

function LuckyWheelForm(props) {
    const [previewImage, setPreviewImage] = useState('');
    const [previewThumbnailImage, setPreviewThumbnailImage] = useState('');
    const fileInputRef = useRef(null);
    const fileThumbnailImgInputRef = useRef(null);
    const { opened, onClose, onSubmit, id, mode } = props;
    const { control, handleSubmit, formState: { errors }, reset, setValue, register, watch } = useForm({
        defaultValues: {
            name: '',
            description: '',
            coverImageUrl: '',
            imageFile: null,
            thumbnailUrl: '',
            thumbnailFile: null,
            prizes: [{ name: '', rate: 0, description: '', type: '', imageUrl: '', value: {} }],
            fee: { type: 'money', value: 0 },
            status: ''
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "prizes"
    });

    const { data: dataLuckyWheel, isLoading } = useGetLuckyWheelById(id, mode === 'edit' && !!id);

    useEffect(() => {
        if (dataLuckyWheel) {
            setValue('name', dataLuckyWheel?.result?.name);
            setValue('description', dataLuckyWheel?.result?.description);
            setValue('coverImageUrl', dataLuckyWheel?.result?.coverImageUrl);
            setValue('thumbnailUrl', dataLuckyWheel?.result?.thumbnailUrl);
            setValue('prizes', dataLuckyWheel?.result?.prizes);
            setValue('fee', dataLuckyWheel?.result?.fee);
            setValue('status', dataLuckyWheel?.result?.status);
            dataLuckyWheel?.result?.coverImageUrl && setPreviewImage(dataLuckyWheel?.result?.coverImageUrl);
            dataLuckyWheel?.result?.thumbnailUrl && setPreviewThumbnailImage(dataLuckyWheel?.result?.thumbnailUrl);
        }
    }, [dataLuckyWheel, setValue]);

    const onSubmitForm = async (formData) => {
        try {
            let coverImageUrl = formData?.coverImageUrl;
            if (formData.imageFile) {
                coverImageUrl = await uploadImage(formData.imageFile);
            }
            let thumbnailUrl = formData?.thumbnailUrl;
            if (formData.thumbnailFile) {
                thumbnailUrl = await uploadImage(formData.thumbnailFile);
            }

            const data = {
                ...formData,
                coverImageUrl: coverImageUrl || formData.coverImageUrl,
                thumbnailUrl: thumbnailUrl || formData.thumbnailUrl,
            };
            onSubmit(data);
            toast.info("Lưu thành công.", {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
            reset();
            setPreviewImage('');
            setPreviewThumbnailImage('')
            onClose();
        } catch (error) {
            toast.error("Lưu không thành công.", {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        }
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleFileThumbnailInputClick = () => {
        fileThumbnailImgInputRef.current.click();
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

    const handleThubnailImageChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewThumbnailImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCloseForm = () => {
        reset();
        setPreviewImage('');
        setPreviewThumbnailImage('');
        onClose();
    };

    const handleRemoveCoverImage = () => {
        setValue('imageFile', null);
        setValue('coverImageUrl', null);
        setPreviewImage('');
    };

    const handleRemoveThumbnailImage = () => {
        setValue('thumbnailFile', null);
        setValue('thumbnailUrl', null);
        setPreviewThumbnailImage('');

    };

    return (
        <Modal
            size='100%'
            opened={opened}
            onClose={onCloseForm}
            title="Cài đặt vòng quay may mắn"
        >
            <form onSubmit={handleSubmit(onSubmitForm)} className='flex flex-col gap-4'>
                <div className="lg:flex justify-between gap-10">
                    <div className="flex-[2] flex flex-col gap-1 mb-2">
                        <TextInput
                            label="Tên vòng quay"
                            {...register('name', { required: 'Tên vòng quay bắt buộc' })}
                            error={errors.name && errors.name.message}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Trạng thái"
                                    placeholder="Chọn trạng thái"
                                    data={[
                                        { value: 'active', label: 'Đăng bán' },
                                        { value: 'inactive', label: 'Tạm ẩn' }
                                    ]}
                                    {...field}
                                    error={errors.status && errors.status.message}
                                />
                            )}
                        />

                        <ControlledNumberInput
                            label="Giá mua lượt quay"
                            control={control}
                            name="fee.value"
                            rules={{ required: 'Giá mua lượt quay bắt buộc' }}
                            min={0}
                            thousandSeparator=","
                            error={errors.fee?.value && errors.fee.value.message}
                        />

                        <Textarea
                            label="Mô tả"
                            resize="vertical"
                            rows={4}
                            {...register('description')}
                            error={errors.description && errors.description.message}
                        />

                        <Text className='mt-3 font-medium text-lg'>Cài đặt các ô thưởng</Text>

                        {fields.map((field, index) => (
                            <div key={field.id} className='flex flex-col gap-2 mt-3'>
                                <div className="flex gap-2">
                                    <TextInput
                                        label={`Tên ô thưởng`}
                                        {...register(`prizes.${index}.name`, { required: 'Tên ô thưởng bắt buộc' })}
                                        error={errors.prizes?.[index]?.name && errors.prizes[index].name.message}
                                    />

                                    <ControlledNumberInput
                                        label={`Tỷ lệ trúng (%)`}
                                        control={control}
                                        name={`prizes.${index}.rate`}
                                        rules={{ required: 'Tỷ lệ trúng bắt buộc' }}
                                        min={0}
                                        max={100}
                                        error={errors.prizes?.[index]?.rate && errors.prizes[index].rate.message}
                                    />

                                    <Controller
                                        name={`prizes.${index}.type`}
                                        control={control}
                                        rules={{ required: 'Loại phần thưởng bắt buộc' }}
                                        render={({ field }) => (
                                            <Select
                                                label="Loại phần thưởng"
                                                placeholder="Chọn loại phần thưởng"
                                                data={[
                                                    { value: 'game_account', label: 'Tài khoản game' },
                                                    { value: 'diamond', label: 'Kim cương' },
                                                    { value: 'nothing', label: 'Chúc may mắn lần sau' }
                                                ]}
                                                {...field}
                                                error={errors.prizes?.[index]?.type && errors.prizes[index].type.message}
                                            />
                                        )}
                                    />

                                    {watch(`prizes.${index}.type`) === 'diamond' && (
                                        <ControlledNumberInput
                                            label="Số lượng kim cương"
                                            control={control}
                                            name={`prizes.${index}.value`}
                                            rules={{ required: 'Số lượng kim cương bắt buộc' }}
                                            min={0}
                                            error={errors.prizes?.[index]?.value && errors.prizes[index].value.message}
                                        />
                                    )}

                                    {watch(`prizes.${index}.type`) === "game_account" && (
                                        <CategorySelect
                                            control={control}
                                            name={`prizes.${index}.value`}
                                            rules={{ required: 'Danh mục bắt buộc' }}
                                            type={[TYPE_CATE_RANDOM_GAME_ACCOUNT]}
                                            defaultValue=""
                                            errors={errors}
                                        />
                                    )}

                                    <Button color="red" className='p-0 w-9 h-9 mt-6' onClick={() => remove(index)}>
                                        <IconTrashFilled size={18} />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button className="mt-3" onClick={() => append({ name: '', rate: 0, description: '', type: '', imageUrl: '', value: {} })}>
                            <IconPlus className="mr-1" size={18} /> Thêm ô thưởng
                        </Button>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <div>
                            <Controller
                                name="imageFile"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <div className='flex flex-col mt-1'>
                                        <Text className='text-sm font-medium mb-2'>Ảnh vòng quay</Text>
                                        <div
                                            onClick={handleFileInputClick}
                                            className='cursor-pointer w-full'
                                        >
                                            <Image className="w-[80%]" src={previewImage ? previewImage : "/images/default_img.png"} alt="Cover Image" />
                                        </div>
                                        <FileInput
                                            ref={fileInputRef}
                                            id="imageFile"
                                            label="Ảnh vòng quay may mắn"
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
                            <Button variant="outline" mt='10' color="red" onClick={handleRemoveCoverImage}>Xóa ảnh</Button>
                        </div>
                        <div>
                            <Controller
                                name="thumbnailFile"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <div className='flex flex-col mt-1'>
                                        <Text className='text-sm font-medium mb-2'>Ảnh khung vòng quay</Text>
                                        <div
                                            onClick={handleFileThumbnailInputClick}
                                            className='cursor-pointer w-full'
                                        >
                                            <Image className="w-[80%]" src={previewThumbnailImage ? previewThumbnailImage : "/images/default_img.png"} alt="Thumbnail Image" />
                                        </div>
                                        <FileInput
                                            ref={fileThumbnailImgInputRef}
                                            id="thumbnailFile"
                                            label="Ảnh khung vòng quay"
                                            accept="image/*"
                                            onChange={(file) => {
                                                onChange(file);
                                                handleThubnailImageChange(file);
                                            }}
                                            placeholder="Chọn ảnh"
                                            error={errors.thumbnailFile && errors.thumbnailFile.message}
                                            className='hidden'
                                        />
                                        {errors.thumbnailFile && errors.thumbnailFile.message && <Text color='red' size='xs'>{errors.thumbnailFile.message}</Text>}
                                    </div>
                                )}
                            />
                            <Button variant="outline" mt='10' color="red" onClick={handleRemoveThumbnailImage}>Xóa ảnh</Button>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Button variant="light" color='grey' onClick={onCloseForm}>Hủy</Button>
                    <Button type="submit" className='ml-1'>{mode === 'edit' ? 'Cập nhật' : 'Lưu'}</Button>
                </div>
            </form>
            <ToastContainer />
        </Modal>
    );
}

export default LuckyWheelForm
