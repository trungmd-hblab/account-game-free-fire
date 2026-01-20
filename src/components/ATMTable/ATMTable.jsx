import TableHima from '@/lib/TableHima/TableHima';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { Table } from '@mantine/core';
import React from 'react';

function ATMTable(props) {
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
            {item?.clientName}
          </Table.Td>
          <Table.Td>
            {formatNumber(item?.amount)}
          </Table.Td>
          <Table.Td>
            {item?.rate}
          </Table.Td> 
          <Table.Td>
            {item?.note}
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

export default ATMTable;