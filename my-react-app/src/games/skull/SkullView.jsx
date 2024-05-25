import {PlayersTablet2} from './components/playersTablet'
import {BottomPanel2} from './components/BottomPanel'
import './components/playingField.css'
//import { textDataToView } from './textDataToView'
import {Body} from '../../Components/Body'
import {ThisPlayerView, PlayerView, CardView} from './Classes.js'
import PropTypes, { array } from 'prop-types';
import React, { useState } from 'react'
import { TestDataPlayers, TestDataThisPlayer } from './textDataToView.js'
import { act } from 'react'
import { Modal } from '../../Components/common/Modal.jsx'


/**
 * @param {ThisPlayerView} thisPlayerView 
 */
export const SkullView2 = ({
    thisPlayerView = TestDataThisPlayer(), 
    players = TestDataPlayers}) =>
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
    function WinHandle(){
        setModalContent(WinModal(players));
        setModalActive(true);
    }
    return (
        <>
            <Body>
                <button onClick={WinHandle}>Победа</button>
                <div className="PlayingField">
                    {players.map(player => (
                        <PlayersTablet2 playerView = {player} 
                        active={active} thisPlayer={IfThisPlayer(player)}/>
                    ))}
                </div>
                <BottomPanel2
                    thisPlayerView = {thisPlayerView}/>
            </Body>
            <Modal active={modalActive} setActive={setModalActive}>
                    {modalContent}
            </Modal>
        </>
    )
}

function WinModal(players){
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
        </>
    );
}