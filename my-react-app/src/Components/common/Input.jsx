import { useState } from 'react'
import './input.css'

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

export const InputText = ({ labelText='', name = 'username', id = 'username', 
    placeholder = 'Username', value, setValue , disabled = false, readonly = false }) => {
    
    if (!setValue){
        [value, setValue] = useState(value)
    }
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <div className="text-field">
            <label className="text-field__label" htmlFor={name}>{labelText}</label>
            <input className="text-field__input" type="text" name={name} id={id} placeholder={placeholder} value={value} onChange={handleChange} disabled={disabled} readOnly={readonly} />
        </div>
    )
}

export const InputText2 = ({ labelText, 
    name = 'username', 
    id = name,
    placeholder = '',
    value = '',
    setValue
}) => {
    if (!setValue){
        [value, setValue] = useState(value)
    }
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <div className="text-field text-field_floating">
            <input className="text-field__input" type="text" name={name} id={id} value={value} placeholder={placeholder} onChange={handleChange}/>
            <label className="text-field__label" htmlFor={name}>{labelText}</label>
        </div>
    )
}
