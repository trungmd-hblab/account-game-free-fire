import CardProduct from "@/lib/CardProduct/CardProduct";
import { Box } from "@mantine/core";
import styles from '../SectionCards/SectionCards.module.css';


export default function SectionCards(props) {
    const { data } = props
  
    return (
           <Box className={styles.gridContainer}>
            {
                data?.result?.items?.map((account, index) => {
                        return (
                            <CardProduct key={account._id} card={account} />
                        )
                })
            }
        </Box>
    );
};