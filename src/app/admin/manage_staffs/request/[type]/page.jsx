"use client";

import { useGetStaffsRequest } from "@/api/staffs";
import RequestTable from "@/components/RequestTable/RequestTable";
import { PENDING, STATUS_CHECKED, STATUS_PENDING } from "@/constants/common";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { useState } from "react";

export default function RequestStaffs({ params }) {
  const { type } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [limitView, setLimitView] = useState(10);
  const status = type == PENDING ? STATUS_PENDING : STATUS_CHECKED;
  const columns =
    type == PENDING
      ? page.staffs.tablePendingColumns
      : page.staffs.tableCheckedColumns;
  const [cardQuery, setCardQuery] = useState({
    keyword: "",
    page: 1,
    limit: 10,
    statuses: status,
    startDate: "",
    endDate: "",
  });

  const { data: data } = useGetStaffsRequest({
    ...cardQuery,
    statuses: status,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCardQuery({
      ...cardQuery,
      page: page,
    });
  };

  const handleLimitChange = (value) => {
    setCurrentPage(1);
    setLimitView(value);
    setCardQuery({
      ...cardQuery,
      page: 1,
      limit: value,
    });
  };

  const handleSearch = (startDate, endDate, keyword) => {
    setCurrentPage(1);
    setCardQuery({
      ...cardQuery,
      page: 1,
      keyword: keyword,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    <div className="mb-6">
       <SearchInput
          handleSearch={handleSearch}
          placeholder={page.staffs.searchPlaceholder}
        />
      <RequestTable
        type={type}
        columns={columns}
        data={data?.result?.items}
        limitView={limitView}
        totalItems={data?.result?.totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}
