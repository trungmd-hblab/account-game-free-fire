'use client';
import { useGetListCardsByCategoryId } from "@/api/client/listCard";
import SectionCards from "../SectionCards/SectionCards";

function SliderCards({ categoryId }) {
    const { data, isLoading, isError, error } = useGetListCardsByCategoryId(
        {
            page: 1,
            limit: 10,
            categoryId,
        },
        !!categoryId
    );

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p>Error loading data: {error.message}</p>;

    return (
        <SectionCards data={data} />
    );
}

export default SliderCards;
