import React, { useEffect, useState } from "react";
import { InputText2 } from '../Components/common/Input'
import styles from './lobbySearchPage.module.css'
import '../Components/css/image.css'
import image_unlocked from './public/unlocked_icon.png'
import image_locked from './public/locked_icon1.png'
import image_group2 from './public/playersnumberimg@2x.png'
import Button from '../Components/common/button'
import { Room } from "./testData";
import { useSearchLobby } from "./SearchLobbyContext";



export const CreateLobbyModal = () =>{
    const {DataAboutGame, setRoomSettings, createLobbyFunc} = useSearchLobby()
    const playersOptions = Array.from({ length: DataAboutGame.maxPlayers - DataAboutGame.minPlayers + 1 }, 
        (_, i) => i + parseInt(DataAboutGame.minPlayers));
    const [getName, setName] = useState('');
    const [getPassword, setPassword] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [maxPlayers, setMaxPlayers] = useState(DataAboutGame.minPlayers);

    const handleCreateLobby = () => {
        if (getName.trim() === '') {
            alert('Поле имени лобби не может быть пустым или состоять из пробелов');
            return;
        } else {
            createLobbyFunc()
        }
    };

    useEffect(()=>{
        setRoomSettings({
            name: getName,
            locked: !isPublic,
            password: getPassword,
            maxCount: maxPlayers
        })
    }, [getName, getPassword, isPublic, maxPlayers]);

    return(
        <>
            <div className={styles.createLobbyModal}>
                <InputText2 labelText='Название лобби' value={getName} setValue={setName} maxlength="20"/>
                <div style={{ display: !isPublic ? 'none' : 'block' }}>
                    <InputText2 labelText='Пароль' value={getPassword} setValue={setPassword} maxlength="20"/>
                </div>
                <div className={styles.checkBox}>
                    <img src={image_unlocked} className='size32'/>
                    <input type='checkbox' id="switch" value={isPublic} onChange={()=>setIsPublic(!isPublic)}/>
                    <label htmlFor='switch'/>
                    <img src={image_locked} className='size32'/>
                </div>
                <div className={styles.enternumber}>
                    <img src={image_group2} className='size32'/>
                    <select className="enternumber" 
                    value={maxPlayers} onChange={e=>setMaxPlayers(Number(e.target.value))}>
                        {playersOptions.map(option => (
                            <option value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <Button onClick={handleCreateLobby}>
                    <p>Создать</p>
                </Button>
            </div>
        </>
    )
}

export const ConnectToRoomModal = () =>{
    const {lobbyInfo, connectToRoomFunc,
        password, setPassword
    } = useSearchLobby()
    const handleConnect = () => {
        connectToRoomFunc();
    }

    return(
        <>
            <div className={styles.createLobbyModal}>
                <p>Название лобби: {lobbyInfo.name}</p>
                <p>{lobbyInfo.count}/{lobbyInfo.maxCount}</p>
                <div style={{ display: !lobbyInfo.locked ? 'none' : 'block' }}>
                    <InputText2 labelText='Пароль' 
                        value={password} setValue={setPassword}/>
                </div>
                <Button onClick={handleConnect}>
                    <p>Подключиться</p>
                </Button>
            </div>
        </>
    )
}