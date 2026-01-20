import { useGetStaffsRevenue } from "@/api/staffs";
import { LIMIT } from "@/constants/common";
import { page } from "@/constants/page";
import TableHima from "@/lib/TableHima/TableHima";
import { formatNumber } from "@/utils/formatNumber";
import { Badge, Button, Modal, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import StaffEditForm from "../StaffEditForm/StaffEditForm";
import StaffsRevenueTable from "../StaffsRevenueTable/StaffsRevenueTable";

export default function StaffTable(props) {
  const {
    columns,
    data,
    limitView,
    totalItems,
    currentPage,
    onPageChange,
    onLimitChange,
  } = props;

  const [idStaffSelected, setIdStaffSelected] = useState("");
  const [pageRevenue, setPageRevenue] = useState(1);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [limitViewRevenue, setLimitViewRevenue] = useState(10);
  const [totalRevenueData, setTotalRevenueData] = useState(0);
  const [nameStaffSelected, setNameStaffSelected] = useState("");
  const [openModalBalance, setOpenModalBalance] = useState(false);
  const [openFormEditStaff, setOpenFormEditStaff] = useState(false);
  const [staffSelected, setStaffSelected] = useState({});
  const [staffsRevenueQuery, setStaffsRevenueQuery] = useState({
    page: 1,
    limit: 10,
  });

  const columnsDataOfStaff = [
    "Tài khoản đã bán",
    "Giá bán",
    "Số tiền nhận",
    "Thời gian bán",
  ];

  const { data: staffsRevenueData, refetch } = useGetStaffsRevenue(
    idStaffSelected,
    {
      page: pageRevenue,
      limit: limitViewRevenue,
    }
  );

  useEffect(() => {
    if (staffsRevenueData) {
      setDataRevenue(staffsRevenueData?.result?.items);
      setTotalRevenueData(staffsRevenueData?.result?.totalItems);
    }
  }, [staffsRevenueData]);

  const handleViewRevenueOfStaff = async (id, name) => {
    setIdStaffSelected(id);
    setNameStaffSelected(name);
    setOpenModalBalance(true);
  };

  const handlePageChange = async (page) => {
    setPageRevenue(page);
    setStaffsRevenueQuery({
      ...staffsRevenueQuery,
      page: page,
    });
  };

  const handleLimitChange = (value) => {
    setPageRevenue(1);
    setLimitViewRevenue(value);
    setStaffsRevenueQuery({
      ...staffsRevenueQuery,
      page: 1,
      limit: value,
    });
  };

  const handleCloseModal = () => {
    setOpenModalBalance(false);
  };

  const handleOpenFormEditStaff = (index) => {
    setStaffSelected(data[index]);
    setOpenFormEditStaff(true);
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
          <Table.Td>{item?.username}</Table.Td>
          <Table.Td>{formatNumber(item?.money)}</Table.Td>
          <Table.Td>{formatNumber(item?.rate)}</Table.Td>
          <Table.Td>
            <Badge color={item.isActive ? "green" : "red"}>
              {item.isActive ? "Đang hoạt động" : "Đã bị khoá"}
            </Badge>
          </Table.Td>
          <Table.Td className="flex gap-1">
            <Button
              size="xs"
              color="yellow"
              onClick={() => handleOpenFormEditStaff(index)}
            >
              Chi tiết thông tin
            </Button>

            {/* <Button
              size="xs"
              color="blue"
              onClick={() => handleViewRevenueOfStaff(item._id, item?.username)}
            >
              Chi tiết doang thu
            </Button> */}
          </Table.Td>
        </Table.Tr>
      ));
    }
    return <></>;
  };

  return (
    <>
      <TableHima
        thead={tableHead()}
        tbody={tableBody()}
        totalPageCount={Math.ceil(totalItems / limitView)}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
      {openFormEditStaff && (
        <StaffEditForm
          satffData={staffSelected}
          setOpenFormEditStaff={setOpenFormEditStaff}
        />
      )}
      {openModalBalance && (
        <Modal
          size="100%"
          opened={openModalBalance}
          onClose={handleCloseModal}
          title={`Thông tin cộng tác viên - ${nameStaffSelected}`}
        >
          <Text className="mb-1">
            <strong>Tổng số giao dịch:</strong> {totalRevenueData}
          </Text>
          <StaffsRevenueTable
            columns={columnsDataOfStaff}
            dataRevenue={dataRevenue || []}
            totalRevenueData={totalRevenueData}
            pageRevenue={pageRevenue}
            handlePageChange={handlePageChange}
            limitViewRevenue={limitViewRevenue}
            handleLimitChange={handleLimitChange}
          />
        </Modal>
      )}
    </>
  );
}
