import { page } from "@/constants/page";
import ControlledNumberInput from "@/lib/ControlledNumberInput/ControlledNumberInput";
import useRoleStore from "@/stores/role";
import { formatNumber } from "@/utils/formatNumber";
import { Button, Group, Modal, Text, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";

export default function RequestForm({ opened, onClose, onSubmit }) {
  const {balance} = useRoleStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm({
    defaultValues: {
      value: "",
      note: "",
    },
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`${page.staffs.formRequest.title} - Số dư: ${formatNumber(balance)} VND `}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-3"
      >
        <ControlledNumberInput
          label="Số tiền"
          control={control}
          name="value"
          max={balance}
          rules={{ required: "Số tiền là bắt buộc" }}
          thousandSeparator=","
        />
        
        <Textarea
            label="Ghi chú"
            placeholder="Nhập stk...."
            {...register('note')}
        />
        <Group position="right" mt="md">
          <Button type="submit">{page.staffs.formAdd.buttonRequest}</Button>
          <Button variant="default" onClick={onClose}>
            {page.staffs.formAdd.buttonCancel}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
