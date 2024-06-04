import React from 'react';
import styles from './button.module.css'


const Button = ({ type = 'button', onClick, children, color, background, width, padding, className }) =>
{
    return (
        <button type={type} onClick={onClick} className={className}
            style={{
                color: color, background: background,
                width: width, padding: padding
            }}>
            {children}
        </button>
    )
}

export const SimpleButton = ({children, onClick}) => {
    return(
        <button className={styles.SimpleButton} onClick={onClick}>
            {children}
        </button>
    )
}


export const LanguageButton = ({children, text}) => {
    return(
        <button className={styles.langbutton}>
            <p>{text}</p>
        </button>
    )
}



export default Button;