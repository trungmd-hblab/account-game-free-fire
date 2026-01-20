"use client";
import { changePassword } from "@/api/client/profile";
import {
  Box,
  Button,
  Card,
  Container,
  PasswordInput,
  Text,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function ChangePassword() {
  const [error, setError] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await changePassword(data.newPassword, data.oldPassword);
      toast.info('Đổi mật khẩu thành công.', {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
    });
    } catch (error) {
      toast.error('Đổi mật khẩu không thành công.', {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
    });
    }
  };

  const newPassword = watch("newPassword", "");

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
              Đổi mật khẩu
            </Text>
          </Box>
          {error && (
            <Text color="red" size="sm" className="mb-4">
              {error}
            </Text>
          )}
          <Box className="flex flex-col gap-4">
            <PasswordInput
              label="Mật khẩu cũ"
              placeholder="Nhập mật khẩu cũ của bạn"
              {...register("oldPassword", {
                required: "Mật khẩu cũ là bắt buộc",
              })}
              error={errors.oldPassword?.message}
            />
            <PasswordInput
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới của bạn"
              {...register("newPassword", {
                required: "Mật khẩu mới là bắt buộc",
                minLength: {
                  value: 8,
                  message: "Mật khẩu mới phải có ít nhất 8 ký tự",
                },
              })}
              error={errors.newPassword?.message}
            />
            <PasswordInput
              label="Xác nhận mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới của bạn"
              {...register("confirmPassword", {
                required: "Xác nhận mật khẩu mới là bắt buộc",
                validate: (value) =>
                  value === newPassword || "Mật khẩu không khớp",
              })}
              error={errors.confirmPassword?.message}
            />
            <Box className="mt-4 flex justify-end">
              <Button type="submit">Cập nhật</Button>
            </Box>
          </Box>
        </Card>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default ChangePassword;
