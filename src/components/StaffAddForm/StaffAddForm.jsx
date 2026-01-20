import { useGetCustomers } from "@/api/customers";
import { page } from "@/constants/page";
import ControlledNumberInput from "@/lib/ControlledNumberInput/ControlledNumberInput";
import { Button, Group, Modal, Select, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function StaffAddForm({ opened, onClose, onSubmit }) {
  const [dataCustomers, setDataCustomers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const {
    data: resultSearch,
    isLoading,
    isError,
  } = useGetCustomers(
    {
      keyword,
      page: 1,
      limit: 1000,
      statuses: [],
    },
    keyword.trim() !== ""
  );

  useEffect(() => {
    if (resultSearch?.result?.items?.length) {
      const newData = resultSearch.result.items.map((item) => ({
        value: item._id,
        label: item.username,
      }));
      setDataCustomers(newData);
    }
  }, [resultSearch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm({
    defaultValues: {
      username: "",
      rate: "",
    },
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={page.staffs.formAdd.title}>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-3"
      >
        <Controller
          name="username"
          control={control}
          {...register("username", {
            required: true,
            validate: (value) =>
              value.trim() !== "" || "Tên khách hàng là bắt buộc",
          })}
          render={({ field }) => (
            <Select
              searchable
              checkIconPosition="right"
              label={page.staffs.formAdd.clientName}
              data={dataCustomers}
              {...field}
              onSearchChange={(value) => setKeyword(value)}
              error={errors.username?.message}
            />
          )}
        />
        <ControlledNumberInput
          label="Tỷ lệ"
          control={control}
          name="rate"
          rules={{ required: "Tỷ lệ là bắt buộc" }}
          thousandSeparator=","
        />
        <Group position="right" mt="md">
          <Button type="submit">{page.staffs.formAdd.buttonSave}</Button>
          <Button variant="default" onClick={onClose}>
            {page.staffs.formAdd.buttonCancel}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
