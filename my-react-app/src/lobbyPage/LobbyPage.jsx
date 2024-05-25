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
import { useParams } from 'react-router-dom';
import { TextDataLobby } from './TextViewData.js'
import LobbyPageView from './LobbyPageView.jsx'


export const PlayerItem = ({Img={img_playButton}, Name='player', forHost = false, host = false}) =>{
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
        Options = <p>Хост</p>
    }
    return(
        <div className={styles.Player}>
            <div>
                <img src={Img}/>
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
    GameName = "Diamant",
    roomId = "#1234 - система идентификаторов комнат будет добавлена позже",
    PlayersData = TestData,
}) =>{
    const TextContext = TextDataLobby[0];
    const socket = useContext(SocketContext);
    const [lobbyName, setLobbyName] = useState('Popka');
    const [isCreator, setIsCreator] = useState(false);
    const [gameName, setGameName] = useState('Hihihaha');
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


    const handleStartClick = () => {
        socket.emit('tictactoe_start');
    };

    socket.on('tictactoe_started', () => {
        navigate('/TicTacToe');
    })

    return(
        <LobbyPageView
            LobbyName = {lobbyName}
            isCreator = {isCreator}
            GameName = {gameName}
            roomId={roomId}
            usersData = {usersData}
            inputValue = {inputValue}
            setInputValue = {inputValue}
            chatHistory = {chatHistory}
            handleSendClick={handleSendClick}
            handleStart={isCreator?handleStartClick:null}
            TextContext = {TextContext}
        />
    )
}