import React, { useState, useEffect } from 'react';
import { Select, Loader, Text } from '@mantine/core';
import { useGetCustomers } from '@/api/customers'; // Giả sử bạn có hook này

const SearchableSelect = ({ onSelect, value, placeholder, error }) => {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState([]);
    
    const { data: dataCustomers, isLoading, isError } = useGetCustomers({
        keyword,
        page: 1,
        limit: 1000,
        statuses: [],
    }, keyword.trim() !== '');

    useEffect(() => {
        if (dataCustomers?.result?.items?.length) {
            const newData = dataCustomers.result.items.map((item) => ({
                value: item._id, 
                label: item.username, 
            }));
            setData(newData);
        }
    }, [dataCustomers]);

    return (
        <div>
            <Select
                placeholder={placeholder}
                searchable
                data={data}
                value={value}
                onChange={(val) => {
                    if (val) {
                        const selectedItem = data.find((item) => item.value === val);
                        onSelect && onSelect(selectedItem);
                    }
                }}
                onSearchChange={setKeyword}
                error={error}  
            />
        </div>
    );
};

export default SearchableSelect;
