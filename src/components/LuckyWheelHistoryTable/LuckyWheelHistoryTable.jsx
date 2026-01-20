import { GAME_ACCOUNT } from '@/constants/common';
import TableHima from '@/lib/TableHima/TableHima';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { Table } from '@mantine/core';
import React from 'react';

function LuckyWheelHistoryTable(props) {
    const { columns, data, limitView, totalItems, currentPage, onPageChange, onLimitChange } = props
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
            return data.map((item, index) => (
                <Table.Tr key={index}>
                    <Table.Td>
                        {item?.client?.username}
                    </Table.Td>
                    <Table.Td>
                        {item?.luckyWheel?.name}
                    </Table.Td>
                    <Table.Td>
                        {formatNumber(item?.fee?.value)}
                    </Table.Td>
                    <Table.Td>
                        {item?.result?.type == GAME_ACCOUNT ? "Tài khoản game" : "Kim cương"}
                    </Table.Td>
                    <Table.Td>
                        {item?.result?.type == GAME_ACCOUNT ? item?.result?.value : formatNumber(item?.result?.value)}
                    </Table.Td>
                    <Table.Td>
                        {formatDate(item?.createdAt)}
                    </Table.Td>
                </Table.Tr>
            ));
        }
        return <></>;
    }
    return (
        <TableHima
            thead={tableHead()}
            tbody={tableBody()}
            totalPageCount={Math.ceil(totalItems / limitView)}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
        />
    );
}

export default LuckyWheelHistoryTable;