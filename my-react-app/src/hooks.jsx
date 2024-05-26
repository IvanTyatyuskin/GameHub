import {useEffect, useState} from 'react'

export function useToggle(initianValue){
    const [value, setValue] = useState(initianValue);
    const onChange = () => setValue(!value);
    return {value, onChange};
}

export function useLocalStorage(initianValue, key){
    const getValue = () => {
        const storage = localStorage.getItem(key); //string || null
        if (storage){
            return JSON.parse(); // '[]'
        }
        return (initianValue);
    }
    const [value, setValue] = useState(getValue);
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])
    return [value, setValue];
}
//const newItem = list.find(item => item.id === id);
//setOrder([...order, newItem]);

export function useInput(initianValue){
    const [value, setValue] = useState(initianValue);
    const onChange = e => setValue(e.target.value);
    return {value, onChange};
}

export function useSelect(initianValue){
    const [value, setValue] = useState(initianValue);
    const onChange = e => setValue(Number(e.target.value));
    return {value, onChange}
}

export function useMultiInput(initianValues = {}){
    const [inputs, setInputs] = useState(initianValues);
    const handleChange  = (e) => {
        const {name, value} = e.target;
        setInputs(prevState => ({...prevState, [name]:value}));
    };
    return [inputs, handleChange];
}

export function useCreateLobbyInput(_Name = '', 
    _Password = '', _isPublic = false, _maxPlayers = 0)
{
    const Name = useInput(_Name);
    const Password = useInput(_Password);
    const isPublic = useToggle(_isPublic);
    const maxPlayers = useSelect(_maxPlayers);

    return {Name, Password, isPublic, maxPlayers};
}


//<input name="field1" value={inputs.field1 || ''} onChange={handleChange} />
//<input name="field2" value={inputs.field2 || ''} onChange={handleChange} />