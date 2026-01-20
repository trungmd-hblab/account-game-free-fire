import { useUpdateStatusOrder } from "@/api/staffs";
import { PENDING } from "@/constants/common";
import TableHima from "@/lib/TableHima/TableHima";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Badge, Button, Table } from "@mantine/core";
import { toast, ToastContainer } from "react-toastify";

export default function RequestTable(props) {
  const {
    type,
    columns,
    data,
    limitView,
    totalItems,
    currentPage,
    onPageChange,
    onLimitChange,
  } = props;

  const updateMutation = useUpdateStatusOrder();

  const handleConfirm = async (id) => {
    const newData = {
      status: "success",
    };
    try{
      await updateMutation.mutateAsync({ id, newData });
      toast.info("Xác nhận thành công.", {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }catch(error){
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
  };

  const handleReject = async (id) => {
    const newData = {
      status: "failed",
    };
    try{
      await updateMutation.mutateAsync({ id, newData });
      toast.info("Từ chối thành công.", {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }catch(error){
      toast.error(error?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
  };

  const tableHead = () => {
    return (
      <Table.Tr>
        {columns.map((column, index) => (
          <Table.Th key={index}>{column}</Table.Th>
        ))}
      </Table.Tr>
    );
  };

  const tableBody = () => {
    if (data?.length) {
      return data.map((item, index) => (
        <Table.Tr key={index} style={{ cursor: "pointer" }}>
          <Table.Td>{item?.collaboratorName}</Table.Td>
          <Table.Td>{formatNumber(item?.value)}</Table.Td>
          <Table.Td>{formatDate(item?.createdAt)}</Table.Td>
          <Table.Td className="whitespace-pre-wrap" >{item?.note}</Table.Td>
          {type == PENDING ? (
            <Table.Td display="flex">
              <Button size="xs" mr="6" onClick={() => handleConfirm(item._id)}>
                Xác nhận
              </Button>
              <Button
                size="xs"
                color="red"
                onClick={() => handleReject(item._id)}
              >
                Từ chối
              </Button>
            </Table.Td>
          ) : (
            <Table.Td>{formatDate(item?.updatedAt)}</Table.Td>
          )}
          {type != PENDING && (
            <Table.Td>
              <Badge color={item.status == "success" ? "green" : "red"}>
                {item.status == "success" ? "Đã duyệt" : "Đã từ chối"}
              </Badge>
            </Table.Td>
          )
        }
        </Table.Tr>
      ));
    }
    return <></>;
  };

  return (
    <>
    <ToastContainer />
    <TableHima
      thead={tableHead()}
      tbody={tableBody()}
      totalPageCount={Math.ceil(totalItems / limitView)}
      currentPage={currentPage}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    />
    </>
  );
}
