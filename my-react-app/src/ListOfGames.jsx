import React, { useState } from 'react'
import { Games } from "./games/DataAboutGames.jsx"
import Header from './Components/Header.jsx'
import './Components/css/section.css'
import ListOfGamesItem from './Components/common/ListOfGamesItem.jsx'
import { Modal } from './Components/common/Modal.jsx'
//import { InputText } from './Components/common/Input.jsx'
import { Link } from 'react-router-dom';



export default function ListOfGames() {
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState(<h1>Заголовок</h1>);
    return (
        <>
            <Header />
            <div className='content-box height-fullscreen'>
                <div className='content-single'>
                    {/*
                    <div style={{width: '200px'}}>
                        <InputText labelText='ID комнаты' placeholder='#0000' name='roomID'/>
                    </div>
                    */}
                    
                    <div className='list'>
                        {Games.map((game, index) => (
                            <ListOfGamesItem 
                                key={index}
                                gameInfo = {game}
                                setContent={setModalContent}
                                setActive={setModalActive}
                            />
                        )
                        )}
                    </div>
                    <Link to={'/lobbylist'}>Интерактовное лобби</Link>
                    <Modal active={modalActive} setActive={setModalActive}>
                        {modalContent}
                    </Modal>
                </div>
            </div>
        </>
    )
}

