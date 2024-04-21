import React from 'react';


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

export default Button;