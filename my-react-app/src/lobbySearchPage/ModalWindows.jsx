import React, { useEffect, useState } from "react";
import { InputText2 } from '../Components/common/Input'
import styles from './lobbySearchPage.module.css'
import '../Components/css/image.css'
import image_unlocked from './public/unlocked_icon.png'
import image_locked from './public/locked_icon1.png'
import image_group2 from './public/playersnumberimg@2x.png'
import Button from '../Components/common/button'
import { Room } from "./testData";



export const CreateLobbyModal = (
    {gameRestrictions, getRoomSettings, setRoomSettings, createFunc}
) =>{
    const playersOptions = Array.from({ length: gameRestrictions.maxPlayers - gameRestrictions.minPlayers + 1 }, 
        (_, i) => i + parseInt(gameRestrictions.minPlayers));
    const [getName, setName] = useState(getRoomSettings.Name);
    const [getPassword, setPassword] = useState(getRoomSettings.Password);
    const [isPublic, setIsPublic] = useState(getRoomSettings.Public);
    const [maxPlayers, setMaxPlayers] = useState(getRoomSettings.MaxOfPlayers);

    const handleCreateLobby = () => {
        createFunc(getRoomSettings);
    };

    useEffect(()=>{
        setRoomSettings({
            Name: getName,
            Public: isPublic,
            Password: getPassword,
            MaxOfPlayers: maxPlayers
        });
    }, [getName, getPassword, isPublic, maxPlayers, setRoomSettings]);

    return(
        <>
            <div className={styles.createLobbyModal}>
                <InputText2 labelText='Название лобби' value={getName} setValue={setName}/>
                <div style={{ display: !isPublic ? 'none' : 'block' }}>
                    <InputText2 labelText='Пароль' value={getPassword} setValue={setPassword}/>
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

/**
 * 
 * @param {Room} lobbyInfo 
 * @returns 
 */
export const ConnectToRoomModal = ({lobbyInfo, connectFunc}) =>{
    const [password, setPassword] = useState('');
    const handleConnect = () => {
        connectFunc(lobbyInfo, password);
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