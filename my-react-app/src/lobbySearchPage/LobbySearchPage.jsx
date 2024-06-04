import Header from '../Components/Header'

import styles from './lobbySearchPage.module.css'
import '../Components/css/image.css'
import '../Components/css/section.css'

import { InputText2 } from '../Components/common/Input'
import Button from '../Components/common/button'
import { Modal } from '../Components/common/Modal'
import { useState } from 'react'
import { ConnectToRoomModal, CreateLobbyModal } from './ModalWindows'
import LobbyItem from './LobbyItem.jsx'
import { SearchLobbyProvider, useSearchLobby } from './SearchLobbyContext.jsx'

const SearchLobbyPage = () => {
    const [modalActive, setModalActive] = useState(false);
    const [getModalContent, setModalContent] = useState("");
    const [searchText, setSearchText] = useState("");

    const {
        DataAboutGame,
        Rooms,
        setLobbyInfo
    } = useSearchLobby()

    function CreateLobbyButton() {
        setModalContent(
            <CreateLobbyModal/>);
        setModalActive(true);
    }
    function СonnectToRoom(_lobbyInfo){
        setLobbyInfo(_lobbyInfo)
        setModalContent(
            <ConnectToRoomModal/>
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
                            {filteredLobbies.map((room, index) =>{
                                return (
                                <LobbyItem key={index} roomInfo={room}
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

const SearchLobby = ({GameIndex='0', Game='Diamant', navigateAddress='/LobbyPage'}) => {
    return(
        <SearchLobbyProvider GameIndex={GameIndex} Game={Game} navigateAddress={navigateAddress}>
            <SearchLobbyPage/>
        </SearchLobbyProvider>
    )
}

export default SearchLobby