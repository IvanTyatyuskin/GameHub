import React, { useEffect, useState } from "react";

const SECOND = 1_000;

export const useTimer = (startTime = new Date(), interval = SECOND) => {
    const [now, setNow] = useState('');
    useEffect(()=>{
        const timer = setInterval(()=>{
            const time = new Date()-startTime
            setNow(formatTime(time));
        }, interval)
        return () => clearInterval(timer)
    }, [startTime, interval])

    const formatTime = (time) =>{
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return now
}

const TimerComponent = () =>{

}