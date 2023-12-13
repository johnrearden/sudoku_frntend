import React, { useEffect, useState } from 'react'
import { millisToTimeString } from '../utils/utils';

const Timer = ({ startTime }) => {

    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime) {
                const timeElapsed = new Date() - new Date(startTime);
                setTime(timeElapsed);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime])

    
    const displayString = millisToTimeString(time);

    return (
        <div>{displayString}</div>
    )
}

export default Timer