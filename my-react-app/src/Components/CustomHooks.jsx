import React, { useState, useEffect } from "react";

export function useLogger(value, name='value'){
    useEffect(()=>{
        console.log(`Значение ${name}: (useLogger)`, value)
    })
}

export function useInput(initialValue){
    const [value,setValue] = useState(initialValue)
	const onChange = event => {
		setValue(event.target.value)
	}
	const clear = () => setValue('')
	return {bind:{value, onChange}, value, clear}
}