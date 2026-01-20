import { useGetTransactionHistory } from '@/api/customers';
import { LIMIT, TYPE_SUBTRACT, TYPETRANSLATIONS } from '@/constants/common';
import TableHima from '@/lib/TableHima/TableHima';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { Badge, Button, Modal, Table, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import EditCustomerForm from '../EditCustomerForm/EditCustomerForm';

const CustomerTable = (props) => {
  const { columns, data, limitView, totalItems, currentPage, onPageChange, onLimitChange } = props;
  const [openFormEditCustomer, setOpenFormEditCustomer] = useState(false);
  const [customerSelected, setCustomerSelected] = useState({});
  const [nameCustomerSelected, setNameCustomerSelected] = useState('');
  const [idCustomerSelected, setIdCustomerSelected] = useState('');
  const [openModalHistory, setOpenModalHistory] = useState(false);
  const [dataBalanceHistory, setDataBalanceHistory] = useState([]);
  const [pageHistory, setPageHistory] = useState(1);
  const [totalTransOfClient, setTotalTransOfClient] = useState(0)
  const columnsDataOfClient = ['Số tiền', 'Loại giao dịch', 'Nội dung giao dịch', 'Thời gian giao dịch'];

  const { data: transactionHistoryData, refetch } = useGetTransactionHistory(idCustomerSelected, {
    page: pageHistory,
    limit: LIMIT,
  });

  useEffect(() => {
    if (transactionHistoryData) {
      setDataBalanceHistory(transactionHistoryData?.result?.items);
      setTotalTransOfClient(transactionHistoryData?.result?.totalItems);
    }
  }, [transactionHistoryData]);

  const handleOpenFormEditCustomer = (index) => {
    setCustomerSelected(data[index]);
    setOpenFormEditCustomer(true);
  };

  const handleViewBalanceOfClient = async (id, name) => {
    setIdCustomerSelected(id);
    setNameCustomerSelected(name);
    setOpenModalHistory(true);
  }

  const handlePageChange = async (page) => {
    setPageHistory(page);
  };


  const handleCloseModalHistory = () => {
    setOpenModalHistory(false)
  }

  const tableHead = () => {
    return (
      <Table.Tr>
        {columns.map((column, index) => (
          <Table.Th key={index}>{column}</Table.Th>
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
          <Table.Td>{item?.username}</Table.Td>
          <Table.Td>{formatNumber(item?.moneyBalance)}</Table.Td>
          <Table.Td>{formatNumber(item?.diamondBalance)}</Table.Td>
          <Table.Td>
            <Badge color={item.isActive ? "green" : "red"}>
              {item.isActive ? "Đang hoạt động" : "Đã bị khoá"}
            </Badge>
          </Table.Td>
          <Table.Td className='flex gap-1'>
            <Button size='xs' color='yellow' onClick={() => handleOpenFormEditCustomer(index)}>Chi tiết thông tin</Button>
            <Button size='xs' mr='6' onClick={() => handleViewBalanceOfClient(item._id, item?.username)}>Lịch sử giao dịch</Button>
          </Table.Td>
        </Table.Tr>
      ));
    }
    return <></>;
  };



  const tableHeadOfHistoryClient = () => {
    return (
      <Table.Tr>
        {columnsDataOfClient.map((column, index) => (
          <Table.Th key={index}>{column}</Table.Th>
        ))}
      </Table.Tr>
    );
  }

  const tableBodyOfHistoryClient = () => {
    if (dataBalanceHistory?.length) {
      return dataBalanceHistory.map((item) => (
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

  return (
    <>
      <TableHima
        thead={tableHead()}
        tbody={tableBody()}
        totalPageCount={Math.ceil(totalItems / limitView)}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
      {openFormEditCustomer && (
        <EditCustomerForm customerData={customerSelected} setOpenFormEditCustomer={setOpenFormEditCustomer} />
      )}
      {
        openModalHistory && (
          <Modal
            size="100%"
            opened={openModalHistory}
            onClose={handleCloseModalHistory}
            title={`Thông tin khách hàng - ${nameCustomerSelected}`}
          >
            <Text className='mb-1' >
              <strong>Tổng số giao dịch:</strong> {totalTransOfClient}
            </Text>
            <TableHima
              thead={tableHeadOfHistoryClient()}
              tbody={tableBodyOfHistoryClient()}
              totalPageCount={Math.ceil(totalTransOfClient / LIMIT)}
              currentPage={pageHistory}
              onPageChange={handlePageChange}
              hiddenSelect={true}
            />
          </Modal>
        )
      }
    </>
  );
};

export default CustomerTable;
