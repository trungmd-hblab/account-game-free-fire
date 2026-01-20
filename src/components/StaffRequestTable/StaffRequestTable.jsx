import TableHima from "@/lib/TableHima/TableHima";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Badge, Table } from "@mantine/core";

export default function StaffRequestTable(props) {
  const {
    columns,
    data,
    totalRevenueData,
    limitViewRevenue,
    handleLimitChange,
    pageRevenue,
    handlePageChange,
  } = props;
  const tableHeadOfRevenueStaff = () => {
    return (
      <Table.Tr>
        {columns.map((column, index) => (
          <Table.Th key={index}>{column}</Table.Th>
        ))}
      </Table.Tr>
    );
  };

  const tableBodyOfRevenueStaff = () => {
    if (data?.length) {
      return data.map((item) => (
        <Table.Tr key={item?._id}>
          <Table.Td>{formatNumber(item?.value)}</Table.Td>
          <Table.Td>{formatDate(item?.createdAt)}</Table.Td>
          <Table.Td className="whitespace-pre-wrap" >{item?.note}</Table.Td>
          <Table.Td>
          {item?.status == "failed" && <Badge color="red">Đã từ chối</Badge>}
          {item?.status == "success" && <Badge color="green">Đã duyệt</Badge>}
          {item?.status == "pending" && <Badge color="yellow">Đang chờ</Badge>}
           
          </Table.Td>
        </Table.Tr>
      ));
    }
  };

  return (
    <TableHima
      thead={tableHeadOfRevenueStaff()}
      tbody={tableBodyOfRevenueStaff()}
      totalPageCount={Math.ceil(totalRevenueData / limitViewRevenue)}
      currentPage={pageRevenue}
      onPageChange={handlePageChange}
      onLimitChange={handleLimitChange}
    />
  );
}
