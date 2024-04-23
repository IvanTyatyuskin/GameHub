import React from 'react';
import style from "./modal.module.css";

export const Modal = ({ active, setActive, children}) => {
    var style1 = style.modal+' ';
    var style2 = style.modal_content+' ';
    if (active){
        style1 = style1 + style.active; 
        style2 = style2 + style.active;
    }

    return (
        <div className={style1} onClick={() => setActive(false)}>
            <div className={style2} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};