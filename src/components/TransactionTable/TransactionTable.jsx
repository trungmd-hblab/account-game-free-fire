import TableHima from '@/lib/TableHima/TableHima';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { Badge, Table, Text } from '@mantine/core';
import React from 'react';

function TransactionTable(props) {
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
            {item?.type == "add_money" ? <Badge size='xs' color='green'>Công tiền</Badge> : <Badge size='xs' color='red'>Trừ tiền</Badge>}
          </Table.Td>
          <Table.Td>
            {item?.note}
          </Table.Td>  
          <Table.Td>
            {item?.type == "add_money" ? <Text style={{color:'green', fontSize:'14px'}} >+{formatNumber(item?.amount)}</Text> : <Text style={{color:'red', fontSize:'14px'}}>-{formatNumber(item?.amount)}</Text>}
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

export default TransactionTable;