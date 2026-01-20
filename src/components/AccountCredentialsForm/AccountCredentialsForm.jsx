import { LOGIN_TYPE_ACCOUNT, TYPE_CATE_OTHER_GAME_ACCOUNT, TYPE_CATE_RANDOM_GAME_ACCOUNT, TYPE_FREE_FIRE_GAME } from "@/constants/common";
import { page } from "@/constants/page";
import CategorySelect from "@/lib/CategorySelect/CategorySelect";
import { Button, Group, Modal, Select, Textarea } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

function AccountCredentialsForm({ opened, onClose, onSubmit }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            categoryId: "",
            accounts: "",
            type: TYPE_FREE_FIRE_GAME,
            loginType: ""
        }
    });

    const onCloseForm = () => {
        reset();
        onClose();
    };

    const onSubmitForm = async (data) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Modal
            size="100%"
            opened={opened}
            onClose={onCloseForm}
            title="Cài đặt thêm nhiều tài khoản"
        >
            <form onSubmit={handleSubmit(onSubmitForm)} className='flex flex-col gap-4'>
                <CategorySelect
                    control={control}
                    name="categoryId"
                    rules={{ required: "Danh mục bắt buộc" }}
                    type={[TYPE_CATE_RANDOM_GAME_ACCOUNT, TYPE_CATE_OTHER_GAME_ACCOUNT]}
                    defaultValue=""
                    errors={errors}
                />

                <Controller
                    name="loginType"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label={page.accountGame.formAdd.typeLogin}
                            placeholder="Chọn trạng thái"
                            data={LOGIN_TYPE_ACCOUNT}
                            {...field}
                            error={errors.loginType && errors.loginType.message}
                        />
                    )}
                />

                <Controller
                    name="accounts"
                    control={control}
                    rules={{ required: "Danh sách tài khoản mật khẩu bắt buộc" }}
                    render={({ field }) => (
                        <Textarea
                            label="Danh sách tài khoản mật khẩu"
                            placeholder={`username1|password1|email dùng cho loại tài khoản đăng nhập bằng X (Twitter),\nusername1|password1|email1@gmail.com\nusername2|password2|email2@gmail.com\n...\n\nusername2|password2|2fa dùng cho loại tài khoản đăng nhập bằng Facebook,\nusername1|password1|2fa1xxxxxxxx\nusername2|password2|2fa2xxxxxxxx\n...\nusername1|password1 dùng cho loại đăng nhập bằng Roblox,\nusername1|password1,\nusername2|password2`}
                            resize="vertical"
                            rows={10}
                            {...field}
                            error={errors.accounts && errors.accounts.message}
                        />
                    )}
                />

                <Group position="right" mt="md" >
                    <Button variant="light" color='grey' onClick={onCloseForm}>Hủy</Button>
                    <Button type="submit">Lưu</Button>
                </Group>
            </form>
        </Modal>
    );
}

export default AccountCredentialsForm;
