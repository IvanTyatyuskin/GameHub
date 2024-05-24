import image_group2 from './public/playersnumberimg@2x.png'
import image_unlocked from './public/unlocked_icon.png'
import image_locked from './public/locked_icon1.png'
import Header from '../Components/Header'

import styles from './lobbySearchPage.module.css'
import '../Components/css/image.css'
import '../Components/css/section.css'

import { Games } from '../games/DataAboutGames'
import { Input3, InputText2 } from '../Components/common/Input'
import Button from '../Components/common/button'
import { Modal } from '../Components/common/Modal'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

export const LobbyItem = ({
    roomName = "Test Room",
    locked = false,
    count = '0',
    maxcount = '6',
    onClick = ''
}) =>{
    var availability = image_unlocked;
    if (locked) availability = image_locked;
    var styleItem = styles.lobbyItem;
    if (onClick) styleItem += ' ' + styles.clickable;
    return(
        <button className={styleItem} onClick={onClick}>
            <div className={styles.lobbyIcon}>
                <img src={image_group2}/>
            </div>
            <div className={styles.lobbyname}>
                <p>{roomName}</p>
            </div>
            <div className={styles.playersnumber}>
                <p>{count}/{maxcount}</p>
            </div>
            <div class={styles.lobbyIcon}>
                <img src={availability}/>
            </div>
        </button>
    )
} 

export const CreateLobbyModal = ({maxPlayers = '5', minPlayers = '3'}) =>{
    const playersOptions = Array.from({ length: maxPlayers - minPlayers + 1 }, 
        (_, i) => i + parseInt(minPlayers));
    return(
        <>
            <div className={styles.createLobbyModal}>
                <InputText2 labelText='Название лобби'/>
                <InputText2 labelText='Пароль'/>
                <div className={styles.checkBox}>
                    <img src={image_unlocked} className='size32'/>
                    <input type='checkbox' id="switch"/>
                    <label htmlFor='switch'/>
                    <img src={image_locked} className='size32'/>
                </div>
                <div className={styles.enternumber}>
                    <img src={image_group2} className='size32'/>
                    <select class="enternumber">
                        {playersOptions.map(option => (
                            <option value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <Button>
                    <p>Создать</p>
                </Button>
            </div>
        </>
    )
}

function SearchLobbyPage()
{
    const location = useLocation();
    const [gameName, setGameName] = useState(null);
  
    useEffect(() => {
      setGameName(location.state?.name);
    }, [location]);
  
    console.log(gameName);
    console.log(location);
    let index = 3;
    if (gameName == 'Diamant') index = 0;
    if (gameName == 'Skull') index = 1;

    const GameIndex = index;

    console.log(index);

    const DataAboutGame = Games[GameIndex];
    const [modalActive, setModalActive] = useState(false);
    return(
        <>
            <Header/>
            <div className='content-box height-fullscreen fix-height'>
                <div className='content-single horizontal'>
                    <div className={styles.box_info}>
                        <h1>{DataAboutGame.Name}</h1>
                        <img src={DataAboutGame.Image}/>
                        <p>{DataAboutGame.Description}</p>
                    </div>
                    <div className={styles.box_lobbyList}>
                        <h1>Список доступных лобби</h1>
                        <div className={styles.search_block}>
                            <InputText2 labelText="Название комнаты"/>
                            <Button>
                                <p>Случайная игра</p>
                            </Button>
                            <Button onClick={()=>{setModalActive(true)}}>
                                <p>Создать лобби</p>
                            </Button>
                        </div>
                        
                        <div className={styles.lobbyList}>
                            <LobbyItem/>
                            <LobbyItem locked={true} onClick={()=>{}}/>
                            <LobbyItem onClick={()=>{}}/>
                            <LobbyItem/>
                            <LobbyItem/>
                            <LobbyItem locked={true}/>
                            <LobbyItem locked={true}/>                            
                            <LobbyItem/>
                            <LobbyItem/>
                            {/*список лобби*/}
                        </div>
                    </div>

                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateLobbyModal/>
            </Modal>
        </>
    )
}

export default SearchLobbyPage;