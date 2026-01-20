"use client";
import { useFetchTransactionHistory } from "@/api/client/history_client";
import { LIMIT, TYPE_SUBTRACT, TYPETRANSLATIONS } from "@/constants/common";
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
    const columns = ['Số tiền', 'Loại giao dịch', 'Nội dung giao dịch', 'Thời gian giao dịch'];

    const { data: response, isLoading } = useFetchTransactionHistory({
        page: currentPage,
        limit: limitView,
        types: ["lucky_wheel"],
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
                    <Table.Td>{!TYPE_SUBTRACT.includes(item.type) ?
                        <Text style={{ color: 'green', fontSize: '14px' }} >+{formatNumber(item.amount)}</Text>
                        :
                        <Text style={{ color: 'red', fontSize: '14px' }}>{item.amount > 0 ? `-${formatNumber(item.amount)}` : formatNumber(item.amount)}
                        </Text>
                    }</Table.Td>
                    <Table.Td>{TYPETRANSLATIONS[item.type] || item.type}</Table.Td>
                    <Table.Td>{item.note}</Table.Td>
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
                    Lịch sử chơi vòng quay
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
