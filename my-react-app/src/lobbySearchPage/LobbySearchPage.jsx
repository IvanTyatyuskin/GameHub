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
import { ConnectToRoomModal, CreateLobbyModal } from './ModalWindows'
import {Room, testRoomsData} from './testData.js'


/**
 * 
 * @param {Room} roomInfo 
 * @returns 
 */
export const LobbyItem = ({
    roomInfo,
    onClick = ()=>{},
    connectFunc
}) =>{
    const availability = roomInfo.locked? image_locked : image_unlocked;
    var styleItem = styles.lobbyItem;
    if (onClick) styleItem += ' ' + styles.clickable;
    return(
        <button className={styleItem} onClick={()=>
            {
                connectFunc(roomInfo);
            }}>
            <div className={styles.lobbyIcon}>
                <img src={image_group2}/>
            </div>
            <div className={styles.lobbyname}>
                <p>{roomInfo.name}</p>
            </div>
            <div className={styles.playersnumber}>
                <p>{roomInfo.count}/{roomInfo.maxCount}</p>
            </div>
            <div className={styles.lobbyIcon}>
                <img src={availability}/>
            </div>
        </button>
    )
} 


const SearchLobbyPage = ({
    GameIndex = "1",
    Rooms = testRoomsData
}) => {
    const DataAboutGame = Games[GameIndex];
    const [modalActive, setModalActive] = useState(false);
    const [getModalContent, setModalContent] = useState("");
    const [searchText, setSearchText] = useState("");
    const GameRestrictions = {
        maxPlayers: DataAboutGame.maxPlayers,
        minPlayers: DataAboutGame.minPlayers
    }
    const [getRoomSettings, setRoomSettings] = useState({
        Name: '',
        Public: false,
        Password:'',
        MaxOfPlayers: GameRestrictions.minPlayers
    })

    function createButtonClick(roomSettings){
        if (roomSettings.Name === ''){ //какая-то проверка
            alert("Чел, ты не прав");
        }
        else{
            alert("Дело сделано");
            setModalActive(false);
        }
    }
    function connectToRoomClick(lobbyInfo, password) {
        //логика подключения если комната публичная пароль игнорируем
    }
    function CreateLobbyButton() {
        setModalContent(
            <CreateLobbyModal 
                gameRestrictions = {GameRestrictions}
                getRoomSettings = {getRoomSettings}
                setRoomSettings = {setRoomSettings}
                createFunc = {createButtonClick}/>);
        setModalActive(true);
    }
    function СonnectToRoom(lobbyInfo){
        setModalContent(
            <ConnectToRoomModal 
                lobbyInfo = {lobbyInfo}
                connectFunc = {connectToRoomClick}/>
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
                                value={searchText} setValue={handleSearchChange}/>
                            <Button onClick={handleRandomGame}>
                                <p>Случайная игра</p>
                            </Button>
                            <Button onClick={CreateLobbyButton}>
                                <p>Создать лобби</p>
                            </Button>
                        </div>
                        
                        <div className={styles.lobbyList}>
                            {filteredLobbies.map(room =>{
                                return (
                                <LobbyItem roomInfo={room}
                                connectFunc={СonnectToRoom}
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