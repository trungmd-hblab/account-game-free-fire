import TableHima from "@/lib/TableHima/TableHima";
import { calculateTimeDifference } from "@/utils/calculateDuration";
import { formatDate, getTimeGMT7 } from "@/utils/formatDate";
import { formatDateTime } from "@/utils/formatDateTime";
import { Alert, Badge, Button, Group, Modal, Table } from "@mantine/core";
import React, { useState } from "react";
import FlashSaleForm from "../FlashSaleForm/FlashSaleForm";
function FlashSaleTable(props) {
  const {
    columns,
    data,
    limitView,
    totalItems,
    currentPage,
    onPageChange,
    onLimitChange,
    onRemove,
    onSubmit,
  } = props;

  const [selectedId, setSelectedId] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

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
          style={{ cursor: "pointer" }}
        >
          <Table.Td>
            {formatDate(item?.startDateTimeAt)}
          </Table.Td>
          <Table.Td>
            {getTimeGMT7(item?.startDateTimeAt)}
          </Table.Td>
          <Table.Td>
            {getTimeGMT7(item?.endDateTimeAt)}
          </Table.Td>
          <Table.Td display='flex'>
            <Button
              size='xs'
              mr='6'
              color='yellow'
              onClick={() => handleEdit(item._id)}
            >
              Sửa
            </Button>
            <Button
              size='xs'
              color='red'
              onClick={() => handleOpenModalConfirm(item._id)}
            >
              Xoá
            </Button>
          </Table.Td>
        </Table.Tr>
      ));
    }
    return <></>;
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setModalOpened(true);
  };
  const handleOpenModalConfirm = (id) => {
    setSelectedId(id);
    setConfirmModalOpened(true);
  };

  const handleRemoveProgramFlashSale = () => {
    onRemove(selectedId);
    setSelectedId(null);
    setConfirmModalOpened(false);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setModalOpened(false);
  };

  const handleSaveEditForm = (data) => {
    onSubmit(selectedId, data);
    setSelectedId(null);
    setModalOpened(false);
  };

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
      <FlashSaleForm
        opened={modalOpened}
        onClose={handleCloseModal}
        onSubmit={handleSaveEditForm}
        id={selectedId}
        mode="edit"
      />
      <Modal
        opened={confirmModalOpened}
        onClose={() => setConfirmModalOpened(false)}
        title="Xác nhận xoá chương trình flash sale"
        size={380}
        centered
      >
        <Alert title="Cảnh báo" color="red">
          Bạn có chắc chắn muốn xoá flash sale này?
        </Alert>
        <Group position="right" mt="md">
          <Button onClick={() => setConfirmModalOpened(false)}>Hủy</Button>
          <Button color="red" onClick={handleRemoveProgramFlashSale}>Xác nhận</Button>
        </Group>
      </Modal>
    </>
  );
}

export default FlashSaleTable;
