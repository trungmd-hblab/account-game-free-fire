'use client'
import CardCate from "@/lib/CardCate/CardCate";
import { Box } from "@mantine/core";
import styles from '../SectionCate/SectionCate.module.css';


export default function SectionCategories(props) {
    const { data } = props
  
    return (
           <Box className={styles.gridContainer}>
            {
                data?.result?.items?.map((cate, index) => {
                        return (
                            <CardCate key={cate._id} card={cate} />
                        )
                })
            }
        </Box>
    );
};