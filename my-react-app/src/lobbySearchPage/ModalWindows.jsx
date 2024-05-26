import React, { useEffect, useState } from "react";
import { InputText2 } from '../Components/common/Input'
import styles from './lobbySearchPage.module.css'
import '../Components/css/image.css'
import image_unlocked from './public/unlocked_icon.png'
import image_locked from './public/locked_icon1.png'
import image_group2 from './public/playersnumberimg@2x.png'
import Button from '../Components/common/button'
import { useCreateLobbyInput, useSelect, useToggle } from "../hooks";
import { GameInfo } from '../games/GameInfoClass'
//import { Room } from "./testData";
import { LobbyInfoView } from "./LobbyInfoClass";


export const CreateLobbyModal = ({
    DataAboutGame,
    roomSettings,
    createFunc}
) =>{
    console.log('roomSettings in CreateLobbyModalLocal:', roomSettings);
    if (!roomSettings) return(<div>Loading...</div>)
    const playersOptions = Array.from({ length: DataAboutGame.MaxPlayer - DataAboutGame.MinPlayers + 1 }, 
        (_, i) => i + parseInt(DataAboutGame.MinPlayers));
    const {Name, Password, isPublic, maxPlayers, handleChange} = roomSettings;

    const handleCreateLobby = () => {
        createFunc();
    };

    return(
        <div className={styles.createLobbyModal}>
            <InputText2 labelText='Название лобби' name="Name" value={Name} setValue={handleChange}/>
            <div style={{ display: !isPublic.value ? 'none' : 'block' }}>
                <InputText2 labelText='Пароль' name="Password" value={Password} setValue={handleChange} />
            </div>
            <div className={styles.checkBox}>
                <img src={image_unlocked} className='size32'/>
                <input type='checkbox' id="switch" checked={isPublic.value} onChange={isPublic.onChange}/>
                <label htmlFor='switch'/>
                <img src={image_locked} className='size32'/>
            </div>
            <div className={styles.enternumber}>
                <img src={image_group2} className='size32'/>
                <select className="enternumber" 
                value={maxPlayers.value} onChange={maxPlayers.onChange}>
                    {playersOptions.map(option => (
                        <option value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <Button onClick={handleCreateLobby}>
                <p>Создать</p>
            </Button>
        </div>
    )
}


/**
 * 
 * @param {GameInfo} DataAboutGame
 * @returns 
 */
export const CreateLobbyModal1 = ({
    DataAboutGame, 
    //navigate, 
    //navigateAddress, 
    //socket, 
    createFun}
) =>{
    //if (!roomSettings) return(<div>Loading...</div>)
    const playersOptions = Array.from({ length: DataAboutGame.maxPlayers - DataAboutGame.minPlayers + 1 }, 
        (_, i) => i + parseInt(DataAboutGame.minPlayers));
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const isPublic = useToggle(false);
    const [maxPlayers, setMaxPlayers] = useState(DataAboutGame.minPlayers);
    const handleCreateLobby = () => {
        createFun(
            new LobbyInfoView(null, Name, isPublic.value, Password, null, maxPlayers)
        );    
    };
    

    return(
        <div className={styles.createLobbyModal}>
            <InputText2 labelText='Название лобби' name="Name" value={Name} setValue={setName}/>
            <div style={{ display: !isPublic.value ? 'none' : 'block' }}>
                <InputText2 labelText='Пароль' name="Password" value={Password} setValue={setPassword}/>
            </div>
            <div className={styles.checkBox}>
                <img src={image_unlocked} className='size32'/>
                <input type='checkbox' id="switch" checked={isPublic.value} onChange={isPublic.onChange}/>
                <label htmlFor='switch'/>
                <img src={image_locked} className='size32'/>
            </div>
            <div className={styles.enternumber}>
                <img src={image_group2} className='size32'/>
                <select className="enternumber" 
                value={maxPlayers} onChange={e => setMaxPlayers(Number(e.target.value))}>
                    {playersOptions.map(option => (
                        <option value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <Button onClick={handleCreateLobby}>
                <p>Создать</p>
            </Button>
        </div>
    )
}

/**
 * 
 * @param {LobbyInfoView} lobbyInfo 
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