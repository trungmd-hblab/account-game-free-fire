import { Text } from '@mantine/core';
import React from 'react'
import classes from './TitlePage.module.css'

function TitlePage(props) {
    const {title} = props;
    return (
        <Text className={classes.title}>{title}</Text>
     );
}

export default TitlePage;