import {PlayersTablet2} from './components/playersTablet'
import {BottomPanel2} from './components/BottomPanel'
import './components/playingField.css'
//import { textDataToView } from './textDataToView'
import {Body} from '../../Components/Body'
import {ThisPlayerView, PlayerView, CardView} from './Classes.js'
import PropTypes, { array } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { TestDataPlayers, TestDataThisPlayer } from './textDataToView.js'
import { act } from 'react'
import { Modal } from '../../Components/common/Modal.jsx'
import Button, { SimpleButton } from '../../Components/common/button.jsx'


/**
 * @param {ThisPlayerView} thisPlayerView 
 */
export const SkullView2 = ({
    thisPlayerView = TestDataThisPlayer(), 
    players = TestDataPlayers, 
    onChange = ()=>{},
    returnToLobbyClick = null
}) =>
{    
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState(<h1>Заголовок</h1>);

    //const indexDictionary = 0;

    var active = false;
    if (thisPlayerView.Phase === 'flippingChips'){
        active = true;
    }
    function IfThisPlayer(player){
        if (thisPlayerView.Id === player.Id)
            return true;
        return false;
    }

    useEffect(()=>{
        if(thisPlayerView.WinWindow){
            WinHandle();
        }
    }, [thisPlayerView.WinWindow])
    function WinHandle(){
        setModalContent(WinModal(players, returnToLobbyClick));
        setModalActive(true);
    }
    return (
        <>
            <Body>
                <div className="PlayingField">
                    {players.map((player, index) => (
                        <PlayersTablet2 key={index} playerView = {player} 
                        active={active} thisPlayer={IfThisPlayer(player)}/>
                    ))}
                </div>
                <BottomPanel2
                    thisPlayerView = {thisPlayerView} handleChange = {onChange}/>
            </Body>
            <Modal active={modalActive} setActive={setModalActive}>
                {modalContent}
            </Modal>
        </>
    )
}

function WinModal(players, returnToLobbyClick){
    const sortedPlayers = [...players].sort((a, b) => b.VP - a.VP);

    function PlayerItem(player){
        return(
            <div className='PlayerItem'>
                <img src={player.Img} className='size64'/>
                <p>{player.Name}</p>
                <p>{player.VP}</p>
            </div>
        )
    }

    return (
        <>
            <h1>Победил игрок {sortedPlayers[0].Name}</h1>
            {sortedPlayers.map(player => (
                PlayerItem(player)
            ))}
            <SimpleButton onClick={()=>returnToLobbyClick()}>
                <h1>Вернуться в лобби</h1>
            </SimpleButton>
        </>
    );
}