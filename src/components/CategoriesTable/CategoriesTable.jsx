import { NAME_FREE_FIRE, NAME_ORTHER, NAME_RANDOM, TYPE_CATE_FREE_FIRE_ACCOUNT, TYPE_CATE_OTHER_GAME_ACCOUNT, TYPE_CATE_RANDOM_GAME_ACCOUNT } from "@/constants/common";
import TableHima from "@/lib/TableHima/TableHima";
import { formatNumber } from "@/utils/formatNumber";
import { Alert, Badge, Button, Group, Modal, Table } from "@mantine/core";
import { useState } from "react";
import CategoryForm from "../CategoryForm/CategoryForm";
function CategoriesTable(props) {
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
            {item?.title}
          </Table.Td>
          <Table.Td>
            {item?.type == TYPE_CATE_FREE_FIRE_ACCOUNT && <Badge size="xs" color="green" >{NAME_FREE_FIRE}</Badge>}
            {item?.type == TYPE_CATE_OTHER_GAME_ACCOUNT && <Badge size="xs" color="blue" >{NAME_ORTHER}</Badge>}
            {item?.type == TYPE_CATE_RANDOM_GAME_ACCOUNT && <Badge size="xs" color="violet" >{NAME_RANDOM}</Badge>}
          </Table.Td>
          <Table.Td>
            {formatNumber(item?.availableItemCount || 0)}
          </Table.Td>
          <Table.Td>
            {formatNumber(item?.soldItemCount || 0)}
          </Table.Td>
          <Table.Td>
            {formatNumber(item?.price)}
          </Table.Td>
          <Table.Td>
            {formatNumber(item?.discountPercent)}
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
      <CategoryForm
        opened={modalOpened}
        onClose={handleCloseModal}
        onSubmit={handleSaveEditForm}
        id={selectedId}
        mode="edit"
      />
      <Modal
        opened={confirmModalOpened}
        onClose={() => setConfirmModalOpened(false)}
        title="Xác nhận xoá chương trình danh mục"
        size={380}
        centered
      >
        <Alert title="Cảnh báo" color="red">
          Bạn có chắc chắn muốn xoá danh mục này?
        </Alert>
        <Group position="right" mt="md">
          <Button onClick={() => setConfirmModalOpened(false)}>Hủy</Button>
          <Button color="red" onClick={handleRemoveProgramFlashSale}>Xác nhận</Button>
        </Group>
      </Modal>
    </>
  );
}

export default CategoriesTable;
