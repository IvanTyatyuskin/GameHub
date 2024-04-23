import React, { useState } from 'react'
import { Games } from "./games/DataAboutGames.jsx"
import Header from './Components/Header.jsx'
import './Components/css/section.css'
import './Components/css/input.css'
import ListOfGamesItem from './Components/common/ListOfGamesItem.jsx'
import { Modal } from './Components/common/Modal.jsx'
import { InputText } from './Components/common/Input.jsx'

export default function ListOfGames() {
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState(<h1>Заголовок</h1>);
    return (
        <>
            <Header />
            <div className='content-box height-fullscreen'>
                <div className='content-single'>
                    <InputText labelText='ID комнаты' placeholder='#0000' name='roomID'/>
                    
                    {/*
                    <div class="text-field widht-200">
                        <label class="text-field__label" for="roomID">ID комнаты</label>
                        <input class="text-field__input" type="text" name="roomID" id="roomId" placeholder="#0000"/>
                    </div>
                    */}

                    {/*<InputText name='roomID' labelText='ID комнаты'*/}
                    {/*    id='roomId' placeholder='#0000' />*/}
                    
                    <div className='list'>
                        {Games.map(game => (
                            <ListOfGamesItem ImageSrc={game.Image}
                                Name={game.Name}
                                Description={game.Description}
                                rule={game.Rule}
                                setContent={setModalContent}
                                setActive={setModalActive}
                            />
                        )
                        )}
                    </div>
                    <a onClick={() => { setModalActive(true); setModalContent(<h1>что-то с чем-то</h1>)}}>Click</a>
                    <Modal active={modalActive} setActive={setModalActive}>
                        {modalContent}
                    </Modal>
                    {/*<Inputs/>*/}
                </div>
            </div>


            {/* <Footer /> */}
        </>
    )
}