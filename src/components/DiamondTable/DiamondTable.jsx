import { useUpdateStatusDiamond } from '@/api/diamond';
import { PENDING } from '@/constants/common';
import TableHima from '@/lib/TableHima/TableHima';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { Button, Table } from '@mantine/core';

function DiamondTable(props) {
  const { type, columns, data, limitView, totalItems, currentPage, onPageChange, onLimitChange } = props

  const updateMutation = useUpdateStatusDiamond();

  const handleConfirm = (id) => {
    const newData = {
      status: "success"
    }
    updateMutation.mutate({ id, newData });
  };

  const handleReject = (id) => {
    const newData = {
      status: "failed"
    }
    updateMutation.mutate({ id, newData });
  };

  const tableHead = () => {
    return (
      <Table.Tr>
        {columns.map((column, index) => (
          <Table.Th key={index}>
            {column}
          </Table.Th>
        ))}
      </Table.Tr>
    );
  };

  const tableBody = () => {
    if (data?.length) {
      return data.map((item, index) => (
        <Table.Tr
          key={index}
          style={{ cursor: 'pointer' }}
        >
          <Table.Td>
            {item?.clientName}
          </Table.Td>
          <Table.Td>
            {item?.idInGame}
          </Table.Td>
          <Table.Td>
            {formatNumber(item?.diamondValue)}
          </Table.Td>
          <Table.Td>
            {formatDate(item?.createdAt)}
          </Table.Td>
          {type == PENDING ? (
            <Table.Td display='flex'>
              <Button size='xs' mr='6' onClick={() => handleConfirm(item._id)}>Xác nhận</Button>
              <Button size='xs' color='red' onClick={() => handleReject(item._id)}>Từ chối</Button>
            </Table.Td>
          ) : (
            <Table.Td>
              {formatDate(item?.confirmedAt)}
            </Table.Td>
          )}
        </Table.Tr>
      ));
    }
    return <></>;
  };

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

export default DiamondTable;