import { Box, Button, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './SearchInput.module.css'

function SearchInput(props) {
    const { placeholder, handleSearch } = props;
    const [keyword, setKeyword] = useState('')
    const handleSeachByKeyWord = () => {
        handleSearch(keyword);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(keyword);
        }
    };

    return (
        <Box style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            <Input
                rightSectionPointerEvents="all"
                mb="sm"
                radius="4"
                miw={300}
                placeholder={placeholder}
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={handleKeyDown}
                rightSection={
                    <IconSearch
                        className={classes.icon}
                        cursor="pointer"
                        aria-label="button search"
                        size="15"
                        onClick={handleSeachByKeyWord}
                    />
                }
            />
            <Button maw={160}  fw={500} onClick={handleSeachByKeyWord}>
                Tìm kiếm
            </Button>
        </Box>
    );
}

export default SearchInput;
