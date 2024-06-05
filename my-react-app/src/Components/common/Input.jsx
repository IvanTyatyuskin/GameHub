import { useState } from 'react'
import styles from './input.module.css'
import PropTypes from 'prop-types';

export function Inputs() {
    return (
        <div>
            <h1>Базовое оформление текстового поля &lt;input&gt;</h1>
            <p>1 вариант</p>
            <InputText name='login' labelText='Логин' id='login' placeholder='Login' value='itchief' />
            <p>2. Без value</p>
            <InputText name='username' labelText='Логин' id='username' placeholder='Username'/> 
            <p>3. В состоянии фокуса</p>
            <InputText name='email' labelText='Email' id='email' placeholder='Email' value="alexander@itchief.ru" /> 
            <p>4. В состоянии disabled и readonly</p>
            <InputText name='firstname' labelText='Имя пользователя (disabled)' id='firstname' placeholder='Alaxander' disabled /> 
            <InputText name='city' labelText='Город (readonly)' id='city' placeholder='Moscow' value="Moscow" readonly /> 
            <InputText name='lastname' labelText='Фамилия пользователя (disabled и readonly)' id='lastname' placeholder='Last Name' value="Maltsev" disabled readonly /> 
            <p>5. Плавающий lable</p>
            <InputText2 labelText='Логин' name='username' id='username1' placeholder='Username' /> 
        </div>

    )
}

export const InputText = ({ labelText='', name = 'username', maxlength, id = name, 
    placeholder = 'Username', value, setValue , 
    disabled = false, readonly = false }) => {
    
    if (!setValue){
        [value, setValue] = useState(value)
    }
    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= maxlength) {
            setValue(event.target.value)
        }
    }
    return (
        <div className={styles.text_field}>
            <label className={styles.text_field__label} htmlFor={name}>{labelText}</label>
            <input className={styles.text_field__input} type="text" name={name} id={id} placeholder={placeholder} value={value} onChange={handleChange} maxlength={maxlength} disabled={disabled} readOnly={readonly} />
        </div>
    )
}

export const InputText2 = ({ labelText = null, 
    name = 'username', 
    id = name,
    maxlength = '20',
    placeholder = '',
    value: propValue,
    setValue: propSetValue
}) => {
    const [value, setValue] = useState(propValue || '');
    const handleChange = (event) => {
        if (propSetValue){
            if (event.target.value.length <= maxlength) {
                propSetValue(event.target.value);
            }
        } else{
            setValue(event.target.value);
        }
    }
    return (
        <div className={styles.text_field + ' ' + styles.text_field_floating}>
            <input 
                className={styles.text_field__input} 
                type="text" 
                name={name} 
                id={id} 
                maxlength={maxlength}
                value={propSetValue ? propValue : value} 
                placeholder={placeholder} 
                onChange={handleChange}
                />
            <label 
                className={styles.text_field__label} 
                htmlFor={name}>
                    {labelText}
            </label>
        </div>
    )
}
InputText2.propTypes = {
    labelText: PropTypes.string.isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
    maxlength: PropTypes.number,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func
  };


export const Input3 = ({
    labelText = "Имя пользователя", 
    name = 'inputname', 
    id = name,
    placeholder = '',
    value = '',
    setValue,
    maxlength = '50'
}) => {
    if (!setValue){
        [value, setValue] = useState(value)
    }
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return(
        <div className={styles.textinputfield_V3}>
            <div className={styles.fieldname_V3}>
                <div className={styles.username_V3}>{labelText}</div>
            </div>
            <input
                className={styles.fieldinput_V3}
                name={name}
                maxlength={maxlength}
                placeholder={placeholder}
                type="text"
                onChange={handleChange}
                maxLength={maxlength}
            />
        </div>
    )
}
