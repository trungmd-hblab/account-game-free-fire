"use client";
import { useRequestOfStaff } from "@/api/staffs";
import {
  useGetStaffRequests,
  useGetStatisticStaff,
} from "@/api/statisticStaff";
import RequestForm from "@/components/RequestForm/RequestForm";
import StaffRequestTable from "@/components/StaffRequestTable/StaffRequestTable";
import StaffsRevenueTable from "@/components/StaffsRevenueTable/StaffsRevenueTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Box, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function StaffRequest() {
  const [query, setQuery] = useState({
    statuses:["pending","success", "failed"]
  });
  const [pageRevenue, setPageRevenue] = useState(1);
  const [limitViewRevenue, setLimitViewRevenue] = useState(10);
  const [modalOpened, setModalOpened] = useState(false);

  const { data } = useGetStatisticStaff(query);
  const { data: staffRequests } = useGetStaffRequests(query);
  const mutation = useRequestOfStaff();

  const handlePageChange = async (page) => {
    setPageRevenue(page);
    setQuery({
      ...query,
      page: page,
    });
  };

  const handleLimitChange = (value) => {
    setPageRevenue(1);
    setLimitViewRevenue(value);
    setQuery({
      ...query,
      page: 1,
      limit: value,
    });
  };

  const handleSearch = (keyword) => {
    setPageRevenue(1);
    setQuery({
      ...query,
      page: 1,
      keyword: keyword,
    });
  };

  const handleRequest = async (data) => {
    try {
      await mutation.mutateAsync(data);
      setModalOpened(false);
      toast.info("Gửi yêu cầu thành công.", {
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
  };

  return (
    <div>
      <ToastContainer />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <SearchInput
          handleSearch={handleSearch}
          placeholder={page.staffs.searchPlaceholder}
        />
        <Button onClick={() => setModalOpened(true)}>
          <IconPlus size={18} /> {page.staffs.buttonRequest}
        </Button>
      </Box>
      <Box>
        <StaffRequestTable
          columns={page.staffs.tableStaffsRequestsColumns}
          data={staffRequests?.result?.items || []}
          totalRevenueData={staffRequests?.result?.totalItems}
          pageRevenue={pageRevenue}
          handlePageChange={handlePageChange}
          limitViewRevenue={limitViewRevenue}
          handleLimitChange={handleLimitChange}
        />
      </Box>
      <RequestForm
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSubmit={handleRequest}
      />
    </div>
  );
}
