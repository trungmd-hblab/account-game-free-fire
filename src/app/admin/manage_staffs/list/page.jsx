"use client";
import { useAddStaff, useGetStaffs } from "@/api/staffs";
import StaffAddForm from "@/components/StaffAddForm/StaffAddForm";
import StaffTable from "@/components/StaffTable/StaffTable";
import { page } from "@/constants/page";
import SearchInput from "@/lib/SearchInput/SearchInput";
import { Box, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Suspense, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoadingLayout from "./loading";

export default function ManageStaffs() {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitView, setLimitView] = useState(10);
  const [modalOpened, setModalOpened] = useState(false);
  const columns = page.staffs.tableColumns;

  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useGetStaffs(
    {
      keyword,
      page: currentPage,
      limit: limitView,
    },
    true
  );
  const mutation = useAddStaff();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value) => {
    setCurrentPage(1);
    setLimitView(value);
  };

  const handleSearchByKeyWord = (value) => {
    setCurrentPage(1);
    setKeyword(value);
  };

  const handleAddStaff = async (data) => {
    try {
      await mutation.mutateAsync({ 
        clientId: data.username,
        rate: data.rate
        });
      setModalOpened(false);
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
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="mb-6">
      <ToastContainer />
      <Box style={{ display: "flex", justifyContent: "space-between", gap:"8px", flexWrap:'wrap' }}>
        <SearchInput
          handleSearch={handleSearchByKeyWord}
          placeholder={page.staffs.searchPlaceholder}
        />
        <Button onClick={() => setModalOpened(true)}>
          <IconPlus size={18} /> {page.staffs.buttonAdd}
        </Button>
      </Box>
      <Suspense fallback={<LoadingLayout />}>
        <StaffTable
          columns={columns}
          data={data?.result?.items}
          limitView={limitView}
          totalItems={data?.result?.totalItems}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </Suspense>
      <StaffAddForm
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSubmit={handleAddStaff}
      />
    </div>
  );
}
