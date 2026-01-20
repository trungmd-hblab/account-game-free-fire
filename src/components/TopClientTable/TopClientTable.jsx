import TableHima from "@/lib/TableHima/TableHima";
import { formatNumber } from "@/utils/formatNumber";
import { Table } from "@mantine/core";

function TopClientTable(props) {
    const { dataClient } = props

    const tableHead = () => {
        return (
            <Table.Tr>
                <Table.Th>Tên khách hàng</Table.Th>
                <Table.Th>Tổng nạp (VND)</Table.Th>
            </Table.Tr>
        );
    };
    const tableBody = () => {
        if (dataClient?.length) {
            return dataClient.map((item, index) => (
                <Table.Tr
                    key={index}
                    style={{ cursor: 'pointer' }}
                >
                    <Table.Td>{item?.username}</Table.Td>
                    <Table.Td>{formatNumber(item?.totalAmount)}</Table.Td>
                </Table.Tr>
            ));
        }
        return <></>;
    }
    return (
        <TableHima
            thead={tableHead()}
            tbody={tableBody()}
            hiddenFooter = {true}
        />
    );
}

export default TopClientTable;