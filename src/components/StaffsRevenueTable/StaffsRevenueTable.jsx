import TableHima from "@/lib/TableHima/TableHima";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Table } from "@mantine/core";

export default function StaffsRevenueTable(props) {
  const {
    columns,
    dataRevenue,
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
    if (dataRevenue?.length) {
      return dataRevenue.map((item) => (
        <Table.Tr key={item?._id}>
          <Table.Td>{item?.collaboratorName}</Table.Td>
          <Table.Td>{formatNumber(item?.value)}</Table.Td>
          <Table.Td>{formatNumber(item?.rate)}</Table.Td>
          <Table.Td>{item?.detail}</Table.Td>
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
