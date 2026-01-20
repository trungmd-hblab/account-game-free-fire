"use client";
import { useUpdateStaff } from "@/api/staffs";
import { page } from "@/constants/page";
import ControlledNumberInput from "@/lib/ControlledNumberInput/ControlledNumberInput";
import {
  Alert,
  Badge,
  Button,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export default function StaffEditForm(props) {
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const { satffData, setOpenFormEditStaff } = props;
  const mutationUpdate = useUpdateStaff();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rate: satffData.rate,
    },
  });

  const handleCloseForm = () => {
    setOpenFormEditStaff(false);
  };
  const onSubmitForm = async (data) => {
    try {
      await mutationUpdate.mutateAsync({ id: satffData._id, data });
      toast.info("Cập nhật thành công.", {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
    reset();
    handleCloseForm();
  };

  const handleOpenAccount = async () => {
    try {
      await mutationUpdate.mutateAsync({
        id: satffData._id,
        data: { isActive: true },
      });
      toast.info("Cập nhật thành công.", {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
    handleCloseForm();
  };

  const handleLockAccount = async () => {
    try {
      await mutationUpdate.mutateAsync({
        id: satffData._id,
        data: { isActive: false },
      });
      toast.info("Cập nhật thành công.", {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
    handleCloseForm();
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        opened={true}
        onClose={() => handleCloseForm()}
        title="Thông tin cộng tác viên"
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <TextInput
            label="Tên tài khoản"
            value={satffData.username}
            readOnly
            disabled
          />
          <NumberInput
            label="Số dư"
            disabled
            value={satffData.money}
            thousandSeparator=","
          />
          <ControlledNumberInput
            label="Tỷ lệ"
            control={control}
            name="rate"
            rules={{ required: "Tỷ lệ là bắt buộc" }}
            thousandSeparator=","
          />
          <Badge color={satffData.isActive ? "green" : "red"}>
            {satffData.isActive ? "Đang hoạt động" : "Đã bị khoá"}
          </Badge>
          <Group position="right" mt="md">
            <Button variant="default" onClick={handleCloseForm}>
              {page.staffs.formAdd.buttonCancel}
            </Button>
            <Button type="submit">{page.staffs.formAdd.buttonUpdate}</Button>
            {satffData.isActive ? (
              <Button color="red" onClick={() => setConfirmModalOpened(true)}>
                Khoá tài khoản
              </Button>
            ) : (
              <Button color="green" onClick={handleOpenAccount}>
                Mở khoá tài khoản
              </Button>
            )}
          </Group>
        </form>
      </Modal>
      <Modal
        opened={confirmModalOpened}
        onClose={() => setConfirmModalOpened(false)}
        title="Xác nhận khoá tài khoản"
        size={380}
        centered
      >
        <Alert title="Cảnh báo" color="red">
          Bạn có chắc chắn muốn khoá tài khoản này?
        </Alert>
        <Group position="right" mt="md">
          <Button onClick={() => setConfirmModalOpened(false)}>Hủy</Button>
          <Button color="red" onClick={handleLockAccount}>
            Xác nhận
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
