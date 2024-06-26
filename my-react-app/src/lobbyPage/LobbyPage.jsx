import Header from '../Components/Header'
import '../Components/css/section.css'
import styles from './lobbyPage.module.css'
import { InputText } from '../Components/common/Input'
import Button from '../Components/common/button'
import img_playButton from './public/playbuttonimage@2x.png'
import img_makeHost from './public/makehostimage@2x.png'
import img_kickPlayer from './public/kickplayerimage@2x.png'
import { TestData } from './TestData.js'
import io from 'socket.io-client';
import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../SocketContext'
import { useNavigate } from 'react-router-dom'
import UserImage1 from '../assets/UserImage1.png'
import UserImage2 from '../assets/UserImage2.png'
import { TextDataLobby } from './TextViewData.js'
import { useLogger } from '../hooks.jsx'

export const PlayerItem = ({
    Img=img_playButton, 
    Name='player', 
    forHost = false, 
    host = false,
    TextContextId = '0',
}) =>{
    const TextContext = TextDataLobby[TextContextId];
    var Options = ""
    if (forHost){
        Options =<>
            <button className={styles.SimpleButton + ' '+ styles.Icon}>
                <img src={img_makeHost}/>
            </button>
            <button className={styles.SimpleButton + ' '+ styles.Icon}>
                <img src={img_kickPlayer}/>
            </button>
        </> 
    }
    if (host){
        Options = <p>{TextContext.Host}</p>
    }
    return(
        <div className={styles.Player}>
            <div>
                <img src={Img} alt='image'/>
                <p>{Name}</p>
            </div>
            <div>
                {Options}
            </div>
        </div>
    )
}

export const LobbyPage = ({
    RoomName = "Lobby",
    GameName ="Skull",
    roomId = "#1234 - система идентификаторов комнат будет добавлена позже",
    PlayersData = TestData,
    TextContextId = '0',
}) =>{
    const TextContext = TextDataLobby[TextContextId];
    const socket = useContext(SocketContext);
    const [lobbyName, setLobbyName] = useState('Lobby name');
    const [isCreator, setIsCreator] = useState(false);
    const [gameName, setGameName] = useState('Game name');
    const [usersData, setUsersData] = useState([]);
    const [isLobbyDataRequested, setIsLobbyDataRequested] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate();

    const handleSendClick = (inputValue) => {
        socket.emit('send_chat_message', inputValue);
        setInputValue("");
    }
    
    if (!isLobbyDataRequested){
        if (!socket) {
            console.error("Socket not available");
            return;
        }
        socket.emit('get_lobby_info');
        socket.on('lobby_name', (lobbyName) => {
            setLobbyName(lobbyName);
        })
        socket.on('isCreator', (creator) => {
            if(creator) {
                setIsCreator(true);
            }
        })
        socket.on('gameName', (gameName) => {
            setGameName(gameName);
        })
        socket.on('users', (users) => {
            let currentUsers = [];
            users.forEach((user) => {
                currentUsers.push({
                    img:{UserImage1},
                    Name: user.nickname,
                    host: user.isCreator,
                })
            });

            setUsersData(currentUsers);
        })
        socket.on('chat_history', (chatHistory) => {
            setChatHistory(chatHistory);     
            console.log(chatHistory);       
        })
        setIsLobbyDataRequested(true);
    }

    if (socket) {
        socket.on(`${gameName}_started`, (callback) => {
            navigate(`/${gameName}`);
        })
    }


    const handleStartClick = () => {
        socket.emit(`${gameName}_start`);
    };

    const handleLeaveLobbyClick = () => {
        socket.emit('leave_lobby');
        navigate(`/lobbyList${gameName}`)
    }

    const RoomData = () => {
        return(
            <div className={styles.RoomData}>
                <h1>{TextContext.LobbyName}: {lobbyName}</h1>
                <p>{TextContext.GameName}: {gameName}</p>
                <p>{roomId}</p>
            </div>
        )
    }

    const UsersPanel = () => {
        return(
            <div className={styles.UserListPanel}>
                <div className={styles.UserList}>
                    {usersData.map(player => (
                        <PlayerItem Img={player.img.UserImage1} Name={player.Name} host={player.host}/>
                    ))}
                    <button className={styles.ButtonAddPlayer}>
                        <p>{TextContext.InviteAPlayer}</p>
                    </button>
                </div>
            </div>
        )
    }

    const ButtonPanel = () => {
        return(
            <div className={styles.ButtonPanel}>
                <button className={styles.SimpleButton} onClick={handleLeaveLobbyClick}>
                    {TextContext.Exit}
                </button>
                <button className={styles.SimpleButton}>
                    {TextContext.Settings}
                </button>
                <button className={styles.SimpleButton + " " + styles.Large}>
                    {TextContext.HowToPlay}
                </button>
                {isCreator ? (
                    <button className={styles.SimpleButton + " " + styles.Large + ' ' + styles.WithIcon}
                    onClick={handleStartClick}>
                        <img src={img_playButton} alt="Play" />
                        {TextContext.Play}
                    </button>
                ) : null}
            </div>
        )
    }

    useLogger(usersData)
    return (
        <>
        <Header/>
        <div className='content-box height-fullscreen fix-height'>
            <div className='content-single' style={{paddingBottom: '30px'}}>
                <RoomData/>
                <div className={styles.MainPanel}>
                    <UsersPanel/>
                    <div className={styles.chatFrame}>
                        <div className={styles.chatLog}>
                            {chatHistory.map((message, index) => (
                                <p key={index}>
                                    {message.sender}: {message.text}
                                </p>
                            ))}
                        </div>
                        <div id="input" className={styles.InputWithButton}>
                            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                            <button onClick={() => handleSendClick(inputValue)}>
                                {TextContext.ToSend}
                            </button>
                        </div>
                    </div>
                </div>
                <ButtonPanel/>
            </div>
        </div>
        </>
    )
}