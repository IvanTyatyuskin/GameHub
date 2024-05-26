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
import { useState } from 'react'
import { ConnectToRoomModal, CreateLobbyModal, CreateLobbyModal1 } from './ModalWindows'
import {LobbyInfoView, testRoomsData} from './LobbyInfoClass.js'
import { LobbyItem } from './LobbyItem.jsx'
import GameInfo from '../games/GameInfoClass.js'


/**
 * 
 * @param {GameInfo} DataAboutGame 
 * @returns 
 */
const SearchLobbyPage = ({
    DataAboutGame = Games[0],
    Rooms = [],
    createLobbyFun,
    connectToRoomFun,
    canCreateLobbyCheck,
    canConnectToRoomCheck
}) => {
    //console.log(Rooms);
    const [modalActive, setModalActive] = useState(false);
    const [getModalContent, setModalContent] = useState("");
    const [searchText, setSearchText] = useState("");

    function tryCreateLobby(roomSettings){
        const [canCreate, message] = canCreateLobbyCheck(roomSettings);
        if (canCreate){ //какая-то проверка
            createLobbyFun(roomSettings);
        }
        else{
            alert("Чел, ты не прав " + message);
        }
    }
    function tryConnectToLobby(roomSettings, password){
        const [canCreate, message] = canConnectToRoomCheck(roomSettings, password);
        if (canCreate){ //какая-то проверка
            connectToRoomFun(roomSettings);
        }
        else{
            alert("Чел, ты не прав " + message);
        }
    }

    function CreateLobbyButton() {
        setModalContent(
            <CreateLobbyModal1 DataAboutGame={DataAboutGame} createFun={tryCreateLobby} />
        )
        setModalActive(true);
    }
    function СonnectToRoomButton(lobbyInfo){
        setModalContent(
            <ConnectToRoomModal 
                lobbyInfo = {lobbyInfo}
                connectFunc = {tryConnectToLobby}/>
        );
        setModalActive(true);
    }

    const handleSearchChange = (value) => {
        setSearchText(value);
    };

    const filteredLobbies = Rooms.filter(lobby =>
        lobby.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleRandomGame = () => {
        const openLobbies = filteredLobbies.filter(room => !room.locked);
        if (openLobbies.length > 0) {
            const randomRoom = openLobbies[Math.floor(Math.random() * openLobbies.length)];
            СonnectToRoom(randomRoom);
        } else {
            alert("Нет доступных открытых комнат.");
        }
    };
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
                            <InputText2 labelText="Название комнаты"
                                value={searchText}
                                setValue={handleSearchChange}/>
                            <Button onClick={handleRandomGame}>
                                <p>Случайная игра</p>
                            </Button>
                            <Button onClick={CreateLobbyButton}>
                                <p>Создать лобби</p>
                            </Button>
                        </div>
                        
                        <div className={styles.lobbyList}>
                            {filteredLobbies.map((room, index) =>{
                                return (
                                <LobbyItem key={index} roomInfo={room}
                                onClick={СonnectToRoomButton}
                                />);
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                {getModalContent}
            </Modal>
        </>
    )
}

export default SearchLobbyPage;