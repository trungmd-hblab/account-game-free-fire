'use client';
import { useGetGuideByCategoryId, useGetListCardsByCategoryId } from "@/api/client/listCard";
import SectionCards from "@/components/SectionCards/SectionCards";
import { LIMIT } from "@/constants/common";
import { Box, Pagination, Text } from "@mantine/core";
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import { useState } from 'react';

function ListCards() {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useGetListCardsByCategoryId(
    {
      page: currentPage,
      limit: LIMIT,
      categoryId: id,
    },
    !!id
  );

  const { data: guideData, isLoading: isGuideLoading, isError: isGuideError, error: guideError } = useGetGuideByCategoryId(id, !!id);

  const sanitizedGuideContent = guideData
    ? DOMPurify.sanitize(guideData?.result?.guild)
    : '';

  return (
    <>
      <main className="flex flex-col">
        <Text size="xl" fw={600} className="mb-3">
          Danh mục: {data?.result?.items ? data?.result?.items[0]?.category?.title : ''}
        </Text>
        {guideData && (
          <Box>
            <Text size="md" component="div" dangerouslySetInnerHTML={{ __html: sanitizedGuideContent }} />
          </Box>
        )}
        <Box className="mt-2">
          <SectionCards data={data} />
        </Box>
        <Box className="flex justify-center mt-6">
          <Pagination
            size='md'
            value={currentPage}
            onChange={(page) => setCurrentPage(page)}
            total={Math.ceil(data?.result?.totalItems / LIMIT)}
          />
        </Box>
      </main>
    </>
  );
}

export default ListCards;
