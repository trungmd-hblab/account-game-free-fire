'use client'

import { Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";

function PaginationComponent(props) {
    const { currentPage, totalItems, limit, originPath } = props
    const router = useRouter();
    const handlePageChange = (page) => {
        router.push(`${originPath}`)
    }

    return (
        <Pagination
            size='md'
            value={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(totalItems / limit)}
        />
    );
}

export default PaginationComponent;