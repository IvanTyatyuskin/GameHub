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
    GameName,
    roomId = "#1234 - система идентификаторов комнат будет добавлена позже",
    PlayersData = TestData,
}) =>{
    const TextContext = TextDataLobby[0];
    const socket = useContext(SocketContext);
    const [lobbyName, setLobbyName] = useState('Popka');
    const [isCreator, setIsCreator] = useState(false);
    const [isLobbyDataRequested, setIsLobbyDataRequested] = useState(false);
    const navigate = useNavigate();
    const { gameName } = useParams();


    useEffect(() => {
        if (socket && !isLobbyDataRequested) {
            socket.emit('get_lobby_info');
            socket.on('lobby_name', (lobbyName) => {
                setLobbyName(lobbyName);
            });
            socket.on('isCreator', (creator) => {
                if (creator) {
                    setIsCreator(true);
                }
            });
            setIsLobbyDataRequested(true);

            // Cleanup function to remove event listeners
            return () => {
                socket.off('lobby_name');
                socket.off('isCreator');
            };
        }
    }, [socket, isLobbyDataRequested]);


    const handleStartClick = () => {
        console.log(gameName)
        socket.emit(`${gameName}_start`);
    };

    useEffect(() => {
        if (socket) {
            const handleGameStarted = (callback) => {
                console.log("HEY");
                navigate(`/${gameName}`);
                callback();
            };

            socket.on(`${gameName}_started`, handleGameStarted);

            // Cleanup function to remove event listeners
            return () => {
                socket.off(`${gameName}_started`, handleGameStarted);
            };
        }
    }, [socket, gameName, navigate]);


    const RoomData = () => {
        return(
            <div className={styles.RoomData}>
                <h1>{lobbyName}</h1>
                <p>{gameName}</p>
                <p>{roomId}</p>
            </div>
        )
    }

    const UsersPanel = () => {
        return(
            <div className={styles.UserListPanel}>
                <div className={styles.UserList}>
                    {PlayersData.map(player => (
                        <PlayerItem Img={player.img} Name={player.Name} host={player.host}/>
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
                <button className={styles.SimpleButton}>
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
                        <img src={img_playButton} alt="" />
                        {TextContext.Play}
                    </button>
                ) : null}
            </div>
        )
    }
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
                            <p>Admin: Привет</p>
                            <p>User: Вечер в хату!</p>
                        </div>
                        <div id="input" className={styles.InputWithButton}>
                            <input type='text'/>
                            <button>
                                Отправить
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