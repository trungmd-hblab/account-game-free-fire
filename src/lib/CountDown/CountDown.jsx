import { calculateTimeLeft } from '@/utils/formatDate';
import { Box, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

function CountDown(props) {
    const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(props.endDateTimeAt));
        }, 1000);

        return () => clearInterval(timer);
    }, [props.endDateTimeAt]);

    const renderCountDown = () => {
        return (
            <div>
                <div className='flex gap-2'>
                    {badgeTime('HRS', timeLeft.hours)}
                    {badgeTime('MIN', timeLeft.minutes)}
                    {badgeTime('SEC', timeLeft.seconds)}
                </div>
            </div>
        );
    };

    const badgeTime = (label, value) => (
        <Box bg='#b91c1c' style={{padding:'2px 6px', borderRadius:'8px'}}>
            <Text size='md' fw={600} color='white' >{value}</Text>
            <Text size='10px' fw={300} color='white' mt={2}>{label}</Text>
        </Box>
    )


    return (<>{renderCountDown()}</>);
}

export default CountDown;