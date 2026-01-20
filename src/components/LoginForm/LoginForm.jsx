"use client";
import { page } from "@/constants/page";
import { Anchor, Box, Button, Card, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import classes from './LoginForm.module.css';
import { clientRegister, login, loginClient } from "@/api/auth";
import { toast, ToastContainer } from "react-toastify";
import { handleRequestPassword } from "@/api/card";
import { useFetchAdminProfile } from "@/api/client/getMyProfile";
import useRoleStore from "@/stores/role";
import Cookies from "js-cookie";

export default function LoginForm(props) {
    const { type, pathNext, showFormRegister, setShowFormRegister } = props;
    const [errorMessage, setErrorMessage] = useState("");
    const [openedModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const navigation = useRouter();
  const {setRole} = useRoleStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const mutationFn = type === 'login_admin' ? login : loginClient;
    const { data: profileAdminData, refetch: refetchAdminProfile } = useFetchAdminProfile(false);

    const mutation = useMutation(mutationFn, {
        onSuccess: async  (data) => {
            if (data && data?.statusCode == 200) {
                setErrorMessage("");
                toast.info('Đăng nhập thành công.', {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
                if(pathNext=="/admin/dashboard"){
                    await refetchAdminProfile();
                } else {
                    navigation.push(pathNext)
                }
            } else {
                toast.error('Đăng nhập thất bại.', {
                    position: "bottom-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
            }
        },
        onError: (error) => {
            if (error?.response?.data?.message) {
                setErrorMessage(error?.response?.data?.message)
            } else {
                setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại.");
            }
            toast.error(error?.response?.data?.message, {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });

        },
    });

    const mutatonRegister = useMutation(clientRegister, {
        onSuccess: (data) => {
            const newData = {
                password: newPassword,
                username: newUsername
            }
            mutation.mutate(newData);
        },
        onError: (error) => {
            setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
        },
    })

    useEffect(()=> {
        if(profileAdminData?.result && pathNext == "/admin/dashboard"){
            if (profileAdminData?.result?.user?.isOwner) {
                setRole("admin")
                Cookies.set("isOwner", true);
                navigation.push(pathNext)
              } else {
                setRole("staff")
                Cookies.set("isOwner", false);
                navigation.push("/admin/statistic")
              }
        }
    }, [profileAdminData, navigation, pathNext, setRole])

    const onSubmit = (data) => {
        const newData = {
            password: data.password,
            username: data.username
        }
        if (showFormRegister) {
            mutatonRegister.mutate(newData)
        } else {
            mutation.mutate(newData);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.currentTarget.value);
    };

    const handleShowFormRegister = useCallback(() => {
        setShowFormRegister(true);
        setErrorMessage('');
        reset();
    }, [showFormRegister, reset, setShowFormRegister]);

    const handleShowFormLogin = useCallback(() => {
        setShowFormRegister(false);
        setErrorMessage('');
        reset();
    }, [showFormRegister, reset, setShowFormRegister]);

    const newPassword = watch("password", "");
    const newUsername = watch("username", "");

    const handleSubmitForGotPass = async () => {
        try {
            await handleRequestPassword(email);
            toast.info('Yêu cầu lấy lại mật khẩu đã được gửi.', {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
            setOpenModal(false);
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "bottom-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        }
    };

    return (
        <>
            <Card className={classes.card}>
                {!showFormRegister && (
                    <>
                        <Text size="36px" fw={700}>{page.login.title}</Text>
                        <Text size="15px" fw={400} mt='-10px'>{page.login.welcome}</Text>
                    </>
                )}

                {showFormRegister && (
                    <>
                        <Text size="36px" fw={700}>{page.login.titleRegister}</Text>
                        <Text size="15px" fw={400} mt='-10px'>{page.login.registerMess}</Text>
                    </>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="relative">
                    {showFormRegister ?
                        <TextInput
                            mb={32}
                            className={classes.form}
                            label={page.login.labelUsername}
                            placeholder={page.login.placeHolderUsername}
                            {...register("username", {
                                required: true,
                                validate: value => value.trim() !== "" || page.login.errorUsername,
                                pattern: {
                                    value: /^\S*$/,
                                    message: "Tên đăng nhập không được chứa dấu cách"
                                }
                            })}
                            error={errors.username && (errors.username.message || page.login.errorUsername)}
                        /> :
                        <TextInput
                            mb={32}
                            className={classes.form}
                            label={page.login.labelUsername}
                            placeholder={page.login.placeHolderUsername}
                            {...register("username", {
                                required: true,
                                validate: value => value.trim() !== "" || page.login.errorUsername,
                            })}
                            error={errors.username && (errors.username.message || page.login.errorUsername)}
                        />
                    }

                    <PasswordInput
                        mb={32}
                        label={
                            <Box className="flex justify-between">
                                <Text>{page.login.labelPassword}</Text>
                                {type === 'login_client' && !showFormRegister && <Anchor href="#" size="sm" className="absolute right-0" onClick={() => setOpenModal(true)}>{page.login.forgotPassword}</Anchor>}
                            </Box>
                        }
                        placeholder={page.login.placeHolderPassword}
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Mật khẩu phải có ít nhất 8 ký tự",
                            },
                            validate: value => value.trim() !== "" || page.login.errorPassword
                        })}
                        error={errors.password && (errors.password.message || page.login.errorPassword)}
                    />
                    {type === 'login_client' && showFormRegister &&
                        <PasswordInput
                            mb={40}
                            className={classes.form}
                            label="Xác nhận mật khẩu mới"
                            placeholder="Nhập lại mật khẩu mới của bạn"
                            {...register("confirmPassword", {
                                required: "Xác nhận mật khẩu mới là bắt buộc",
                                validate: value => value === newPassword || "Mật khẩu không khớp",
                            })}
                            error={errors.confirmPassword?.message}
                        />
                    }
                    {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                    <Button loading={mutation.isLoading} type="submit" w="100%" mb={16}>
                        {!showFormRegister ? page.login.button : page.login.buttonRegister}
                    </Button>
                    {type === 'login_client' && !showFormRegister && <Text mt={10}>Bạn chưa có tài khoản? Đăng ký ngay tại <strong className="underline cursor-pointer" onClick={handleShowFormRegister}>đây.</strong></Text>}
                    {type === 'login_client' && showFormRegister && <Text mt={10}>Bạn đã có tài khoản? Đăng nhập tại <strong className="underline cursor-pointer" onClick={handleShowFormLogin}>đây.</strong></Text>}
                    <Text onClick={() => { navigation.push('/') }} mt={10} className="text-center underline cursor-pointer">Tiếp tục dùng dịch vụ.</Text>
                </form>
                <ToastContainer />
            </Card>
            <Modal
                title="Điền email lấy lại mật khẩu"
                size={400}
                centered
                opened={openedModal}
                onClose={() => setOpenModal(false)}
            >
                <TextInput
                    label="Địa chỉ email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
                <Button
                    onClick={handleSubmitForGotPass}
                    fullWidth
                    mt="md"
                >
                    Gửi yêu cầu
                </Button>
            </Modal>
        </>
    );
}
