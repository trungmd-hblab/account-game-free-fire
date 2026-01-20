"use client";
import { useFetchDiamondHistory } from "@/api/client/history_client";
import { LIMIT, STATUS } from "@/constants/common";
import TableHima from "@/lib/TableHima/TableHima";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Box, Container, Table, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function HistoryByType() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [data, setData] = useState([]);

    const limitView = LIMIT;
    const columns = ['Số kim cương', 'Trạng thái', 'Thời gian yêu cầu'];

    const { data: response, isLoading } = useFetchDiamondHistory({
        page: currentPage,
        limit: limitView,
        status: ["pending", "success", "failed"],
    });

    useEffect(() => {
        setData(response?.result?.items);
        setTotalItems(response?.result?.totalItems);
    }, [response])

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
                    <Table.Td>{formatNumber(item.diamondValue)}</Table.Td>
                    <Table.Td>{STATUS[item.status] || item.status}</Table.Td>
                    <Table.Td>{formatDate(item.createdAt)}</Table.Td>
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
                    Lịch sử rút kim cương
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

export default HistoryByType;
