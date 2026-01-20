"use client";
import { useFetchGameAccounts } from "@/api/client/history_client";
import { LIMIT, LOGIN_TYPE_ACCOUNT } from "@/constants/common";
import TableHima from "@/lib/TableHima/TableHima";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Box, Container, Table, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function HistoryByAccount() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [data, setData] = useState([]);

    const limitView = LIMIT;
    const columns = ['Tài khoản', 'Mật khẩu', 'Đăng nhập bằng', 'Email', 'Mã MFA', 'Giá', 'Ngày mua'];

    const { data: response, isLoading } = useFetchGameAccounts({
        page: currentPage,
        limit: limitView,
    });

    useEffect(() => {
        setData(response?.result?.items);
        setTotalItems(response?.result?.totalItems);
    }, [response])

    const getLoginTypeLabel = (value) => {
        const type = LOGIN_TYPE_ACCOUNT.find(item => item.value === value);
        return type ? type.label : value;
    };

    const tableHead = () => {
        return (
            <Table.Tr>
                {columns.map((column, index) => (
                    <Table.Th key={index}>{column}</Table.Th>
                ))}
            </Table.Tr>
        );
    }

    const tableBody = () => {
        if (data?.length) {
            return data.map((item) => (
                <Table.Tr key={item._id}>
                    <Table.Td>{item.username}</Table.Td>
                    <Table.Td>{item.password}</Table.Td>
                    <Table.Td>{getLoginTypeLabel(item.loginType)}</Table.Td>
                    <Table.Td>{item.email}</Table.Td>
                    <Table.Td>{item.mfaCode}</Table.Td>
                    <Table.Td>{formatNumber(item?.price)} đ</Table.Td>
                    <Table.Td>{formatDate(item.purchasedAt)}</Table.Td>
                </Table.Tr>
            ));
        }
        return <Table.Tr><Table.Td colSpan={columns.length}>Không có bản ghi nào hiển thị.</Table.Td></Table.Tr>;
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <Container size="full" p={0}>
            <Box className="flex gap-2 items-center mb-4">
                <Link href="/cac_danh_muc_thong_tin" className="block lg:hidden">
                    <IconArrowLeft size={22} className="cursor-pointer" />
                </Link>
                <Text size="xl" fw={600}>
                    Tài khoản đã mua
                </Text>
            </Box>
            <TableHima
                thead={tableHead()}
                tbody={tableBody()}
                totalPageCount={Math.ceil(totalItems / limitView)}
                currentPage={currentPage}
                onPageChange={onPageChange}
                hiddenSelect={true}
            />
        </Container>
    );
}

export default HistoryByAccount;
