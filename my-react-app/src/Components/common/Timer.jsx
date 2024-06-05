import React, { useEffect, useState } from "react";

const SECOND = 1_000;

const useTimer = ({ startTime, interval = SECOND }) => {
    const [now, setNow] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>{
            setNow(newDate());
        }, interval)
        return () => clearInterval(timer)
    }, [])

}