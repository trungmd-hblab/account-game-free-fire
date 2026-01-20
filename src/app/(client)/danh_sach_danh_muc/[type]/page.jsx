'use client';
import { useGetCategories } from '@/api/client/listCategory';
import SectionCategories from '@/components/SectionCategories/SectionCategories';
import { LIMIT, PATH_TYPE_CATEGORY } from '@/constants/common';
import { Box, Pagination, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';

function ListCategories() {

  const { type } = useParams()
  const limit = LIMIT;
  const [currentPage, setCurrentPage] = useState(1)

  const originPath = PATH_TYPE_CATEGORY.find(item => item.link === type) || {};

  const { data, isLoading, isError, error } = useGetCategories(
    {
      page: currentPage,
      limit,
      type: originPath.value,
    },
    !!type
  );

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <main className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <Text size="xl" fw={600}>{originPath.title}</Text>
        <Box>
          <SectionCategories data={data} />
        </Box>
        <Box className="flex justify-center mt-6">
          <Pagination
            size='md'
            value={currentPage}
            onChange={(page) => setCurrentPage(page)}
            total={Math.ceil(data?.result?.totalItems / limit)}
          />
        </Box>
      </main>
    </>
  );
}

export default ListCategories;
