import { RANKS, SOLD } from "@/constants/common";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Alert, Badge, Button, Group, Image, Modal, Table } from "@mantine/core";
import { useState } from "react";
import AccountGameForm from "../AccountGameForm/AccountGameForm";

const { default: TableHima } = require("@/lib/TableHima/TableHima");

const AccountGameTable = (props) => {
    const { type, columns, data, limitView, totalItems, currentPage, onPageChange, onLimitChange, onRemove, onSubmit, } = props

    const [selectedId, setSelectedId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [confirmModalOpened, setConfirmModalOpened] = useState(false);


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
    }

    const tableBody = () => {
        if (data?.length) {
            return data.map((item, index) => (
                <Table.Tr
                    key={index}
                    style={{ cursor: 'pointer' }}
                >
                    <Table.Td>
                        <Image src={item?.thumbnailUrl ? item?.thumbnailUrl : "/images/default_img.png"} alt="Preview" className="w-10" />
                    </Table.Td>
                    <Table.Td>
                        {item?.rank == RANKS[0] && <Badge size="xs" color="rgba(255, 173, 250, 1)">Không hạng</Badge>}
                        {item?.rank == RANKS[1] && <Badge size="xs" color="rgba(196, 155, 108, 1)">Đồng</Badge>}
                        {item?.rank == RANKS[2] && <Badge size="xs" color="gray">Bạc</Badge>}
                        {item?.rank == RANKS[3] && <Badge size="xs" color="yellow">Vàng</Badge>}
                        {item?.rank == RANKS[4] && <Badge size="xs" color="cyan">Tinh anh</Badge>}
                        {item?.rank == RANKS[5] && <Badge size="xs" color="blue">Kim cương</Badge>}
                        {item?.rank == RANKS[6] && <Badge size="xs" color="pink">Cao thủ</Badge>}
                    </Table.Td>
                    <Table.Td>
                        {item?.username}
                    </Table.Td>
                    <Table.Td>
                        {item?.password}
                    </Table.Td>
                    <Table.Td>
                        {item?.category?.length ? item?.category[0]?.title : ""}
                    </Table.Td>
                    <Table.Td>
                        {formatNumber(item?.price)}
                    </Table.Td>
                    <Table.Td>
                        {formatNumber(item?.discountPercent)}
                    </Table.Td>
                    <Table.Td>
                        {item?.creator}
                    </Table.Td>
                    <Table.Td>
                        {item?.status == "available" && <Badge size='xs' color='green'>Đăng bán</Badge>}
                        {item?.status == "unavailable" && <Badge size='xs' color='yellow'>Tạm ẩn</Badge>}
                        {item?.status == "sold" && <Badge size='xs' color='orange'>Đẫ bán</Badge>}
                    </Table.Td>
                    {type !== SOLD ? (
                        <Table.Td display='flex'>
                            <Button size='xs' mr='6' color="yellow" onClick={() => handleEdit(item._id)}>Sửa</Button>
                            <Button size='xs' color='red' onClick={() => handleOpenModalConfirm(item._id)}>Xóa</Button>
                        </Table.Td>
                    ) : (
                        <Table.Td>
                            {formatDate(item?.purchasedAt)}
                        </Table.Td>
                    )}
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

    const handleRemoveAccountGame = () => {
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
            <AccountGameForm
                opened={modalOpened}
                mode="edit"
                onClose={handleCloseModal}
                onSubmit={handleSaveEditForm}
                id={selectedId}
            />
            <Modal
                opened={confirmModalOpened}
                onClose={() => setConfirmModalOpened(false)}
                title="Xác nhận xoá chương trình tài khoản"
                size={380}
                centered
            >
                <Alert title="Cảnh báo" color="red">
                    Bạn có chắc chắn muốn xoá tài khoản này?
                </Alert>
                <Group position="right" mt="md">
                    <Button onClick={() => setConfirmModalOpened(false)}>Hủy</Button>
                    <Button color="red" onClick={handleRemoveAccountGame}>Xác nhận</Button>
                </Group>
            </Modal>
        </>
    );
}
export default AccountGameTable;