import { Box, Card, Pagination, Select, Table } from "@mantine/core";
import classes from './TableHima.module.css'

function TableHima(props) {
    const { thead, tbody, totalPageCount, currentPage, onPageChange, onLimitChange, hiddenFooter, hiddenSelect } = props;

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const handleLimitChange = (value) => {
        onLimitChange(value)
    }

    return (
        <div>
            <Card className={classes.table_wrapper}>
                <Table highlightOnHover striped horizontalSpacing="sm" verticalSpacing="sm" stickyHeader stickyHeaderOffset={0} >
                    <Table.Thead>
                        {thead}
                    </Table.Thead>
                    <Table.Tbody>
                        {tbody}
                    </Table.Tbody>
                </Table>
            </Card>
            <Box className={classes.footer} style={{ display: hiddenFooter ? 'none' : '' }}>
                {hiddenSelect ? <></> : <Select
                    className={classes.select}
                    size='sm'
                    checkIconPosition="right"
                    data={["10", "50", "100", "200", "500"]}
                    label="Hiển thị"
                    defaultValue='10'
                    onChange={handleLimitChange}
                />
                }
                <Pagination
                    size='sm'
                    value={currentPage}
                    onChange={handlePageChange}
                    total={totalPageCount}
                />
            </Box>

        </div>
    );
}

export default TableHima;