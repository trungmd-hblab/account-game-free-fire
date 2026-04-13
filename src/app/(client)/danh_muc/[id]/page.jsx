'use client';
import { useGetGuideByCategoryId, useGetListCardsByCategoryId } from "@/api/client/listCard";
import SectionCards from "@/components/SectionCards/SectionCards";
import { LIMIT } from "@/constants/common";
import { Box, Button, Group, Pagination, Select, Text } from "@mantine/core";
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

const PRICE_OPTIONS = [
  { value: 'all', label: 'Chọn giá tiền' },
  { value: '100000-2000000', label: '100K - 2 triệu' },
  { value: '2000000-5000000', label: '2 triệu - 5 triệu' },
  { value: '5000000-10000000', label: '5 triệu - 10 triệu' },
  { value: '10000000-30000000', label: '10 triệu - 30 triệu' },
  { value: '30000000-500000000', label: '30 triệu - 500 triệu' },
];

function ListCards() {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  const parsePriceRange = (value) => {
    if (!value || value === 'all') return {};
    const [min, max] = value.split('-').map(Number);
    return {
      ...(Number.isFinite(min) ? { minPrice: min } : {}),
      ...(Number.isFinite(max) ? { maxPrice: max } : {}),
    };
  };

  const sortQuery = {
    highest_price: { orderBy: 'price', orderDirection: 'desc' },
    lowest_price: { orderBy: 'price', orderDirection: 'asc' },
    newest: { orderBy: 'createdAt', orderDirection: 'desc' },
    oldest: { orderBy: 'createdAt', orderDirection: 'asc' },
  };

  const handleChangeSort = (value) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handleChangePrice = (value) => {
    setPriceFilter(value || 'all');
    setCurrentPage(1);
  };

  const { data, isLoading, isError, error } = useGetListCardsByCategoryId(
    {
      page: currentPage,
      limit: LIMIT,
      categoryId: id,
      ...sortQuery[sortOption],
      ...parsePriceRange(priceFilter),
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

        <Group className="mt-1 mb-2" justify="space-between" align="center">
          <Group gap="sm" align="center" wrap="wrap">
            <Text fw={700}>Sắp xếp theo:</Text>
            <Select
              value={priceFilter}
              data={PRICE_OPTIONS}
              onChange={handleChangePrice}
              w={170}
            />
            <Button
              variant={sortOption === 'highest_price' ? 'filled' : 'outline'}
              color="red"
              onClick={() => handleChangeSort('highest_price')}
            >
              Giá từ cao đến thấp
            </Button>
            <Button
              variant={sortOption === 'lowest_price' ? 'filled' : 'outline'}
              color="red"
              onClick={() => handleChangeSort('lowest_price')}
            >
              Giá từ thấp đến cao
            </Button>
            <Button
              variant={sortOption === 'newest' ? 'filled' : 'outline'}
              color="red"
              onClick={() => handleChangeSort('newest')}
            >
              Mới nhất
            </Button>
            <Button
              variant={sortOption === 'oldest' ? 'filled' : 'outline'}
              color="red"
              onClick={() => handleChangeSort('oldest')}
            >
              Cũ nhất
            </Button>
          </Group>
          <Group gap={6} align="center">
            <IconAdjustmentsHorizontal size={18} color="#2563eb" />
            <Text fw={600}>Bộ lọc</Text>
          </Group>
        </Group>

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
