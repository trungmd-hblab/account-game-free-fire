"use client";
import { updateProfile } from "@/api/client/profile";
import useStore from "@/stores/clientStore";
import { formatNumber } from "@/utils/formatNumber";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const {
    code,
    name,
    email,
    phoneNumber,
    username,
    moneyBalance,
    diamondBalance,
  } = useStore((state) => ({
    code: state?.code,
    name: state?.name,
    email: state?.email,
    phoneNumber: state?.phoneNumber,
    username: state?.username,
    moneyBalance: state?.moneyBalance,
    diamondBalance: state?.diamondBalance,
  }));

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      code: code || "",
      name: name || "",
      email: email || "",
      phoneNumber: phoneNumber || "",
      username: username || "",
      moneyBalance: moneyBalance || 0,
      diamondBalance: diamondBalance || 0,
    },
  });

  useEffect(() => {
    setValue("code", code);
    setValue("name", name);
    setValue("email", email);
    setValue("phoneNumber", phoneNumber);
    setValue("username", username);
    setValue("moneyBalance", moneyBalance);
    setValue("diamondBalance", diamondBalance);
  }, [
    code,
    name,
    email,
    phoneNumber,
    username,
    moneyBalance,
    diamondBalance,
    setValue,
  ]);

  const onSubmit = async (data) => {
    const { name, email, phoneNumber } = data;
    try {
      await updateProfile({ name, email, phoneNumber });
      toast.info("Cập nhật thông tin thành công.", {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      toast.error("Cập nhật không thành công.", {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
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
              Thông tin tài khoản
            </Text>
          </Box>
          <Box className="flex flex-col gap-4">
            <Box className="flex justify-between items-end">
              <Box className="flex flex-col gap-4 flex-[0.7] lg:flex-[0.5]">
                <TextInput
                  label="Mã khách hàng"
                  disabled
                  value={watch("code")}
                />
                <TextInput
                  label="Tên tài khoản"
                  disabled
                  value={watch("username")}
                />
              </Box>
              <Box className="flex flex-col gap-3 flex-[0.2] items-center">
                <Avatar
                  src={"/images/avatar-default.png"}
                  alt="avatar tài khoản"
                  className="rounded-full"
                  size={120}
                />
              </Box>
            </Box>
            <TextInput
              label="Họ và tên"
              {...register("name")}
              error={errors.name?.message}
            />
            <TextInput
              label="Địa chỉ email"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Địa chỉ email không hợp lệ",
                },
              })}
              error={errors.email?.message}
            />
            <TextInput
              label="Số điện thoại"
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              error={errors.phoneNumber?.message}
            />
            <TextInput
              label="Số dư tiền"
              disabled
              value={formatNumber(watch("moneyBalance")) + " đ"}
            />
            <TextInput
              label="Số dư kim cương"
              disabled
              value={formatNumber(watch("diamondBalance"))}
            />
          </Box>
          <Box className="flex justify-end">
            <Button type="submit" mt="lg">
              Cập nhật thông tin
            </Button>
          </Box>
        </Card>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default Profile;
