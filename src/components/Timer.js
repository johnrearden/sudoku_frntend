import React, { useEffect, useState } from 'react'

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

    let secs = time / 1000;
    const hours = Math.floor(secs / 3600);
    const hourString = hours ? `${hours}:` : '';
    secs = secs - hours * 3600;
    const minutes = Math.floor(secs / 60);
    secs = Math.floor(secs - minutes * 60);
    const displayString = `${hourString}${String(minutes).padStart(1, '0')}:${String(secs).padStart(2, '0')}`;

    return (
        <div>{displayString}</div>
    )
}

export default Timer