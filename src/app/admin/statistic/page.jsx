"use client";
import {
  useGetStatisticStaff
} from "@/api/statisticStaff";
import StaffsRevenueTable from "@/components/StaffsRevenueTable/StaffsRevenueTable";
import { page } from "@/constants/page";
import useRoleStore from "@/stores/role";
import { formatNumber } from "@/utils/formatNumber";
import { Box, Text } from "@mantine/core";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Statistic() {
  const [query, setQuery] = useState({
    statuses:["pending","success", "failed"]
  });
  const [pageRevenue, setPageRevenue] = useState(1);
  const [limitViewRevenue, setLimitViewRevenue] = useState(10);
  const {balance} = useRoleStore();
  const { data } = useGetStatisticStaff(query);

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

  return (
    <div>
      <ToastContainer />
      <Box>
        <Text 
         style={{
          color:"#fff",
        }}
        ><strong>Tổng số dư: </strong>{formatNumber(balance)} VND </Text>
      </Box>
      <Box>
        <StaffsRevenueTable
          columns={page.staffs.tableStaffsRevenueColumns}
          dataRevenue={data?.result?.items || []}
          totalRevenueData={data?.result?.totalItems}
          pageRevenue={pageRevenue}
          handlePageChange={handlePageChange}
          limitViewRevenue={limitViewRevenue}
          handleLimitChange={handleLimitChange}
        />
      </Box>
 
    </div>
  );
}
