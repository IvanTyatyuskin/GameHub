import React, {useEffect} from "react";


export const useLogger = (value, text = 'Logger') => {
    useEffect(()=>{
        console.log(`${text}:`, value)
    }, [value])
}