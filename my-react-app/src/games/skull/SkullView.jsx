import {PlayersTablet, PlayersTablet2} from './components/playersTablet'
import {BottomPanel, BottomPanel2} from './components/BottomPanel'
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
 * @param {PlayerView} playerView 
 */
export const SkullView = ({players, thisPlayer, waiting = false, 
    thisPlayerView, playerView 
}) =>{
    const indexDictionary = 0;
    
    if (!players){
        players = [
            {
                Name: "Test Player 1",
                VP: 0,
                CardsDown: 1,
                openCards: ['0','1'],
                onclick: ()=>{}
            },
            {
                Name: "Test Player 2",
                VP: 1,
                CardsDown: 0,
                openCards: ['0','0','0'],
                onclick: ''
            }
        ]
    }
    if (!thisPlayer){
        thisPlayer = {
            Cards: [{
                type: '0',
                onclick: ()=>{},
                active:true
            },{
                type: '0',
                onclick: ()=>{},
                active:true
            },{
                type: '0',
                onclick: ()=>{},
                active:true
            },{
                type: '1',
                onclick: ()=>{},
                active:true
            }],
            winPoint: false
        }
    }
    function PlayersHand(){
        var _bidVisibility = true,
            _handVisibility = true,
            _unavailable = false
        if (waiting){
            _bidVisibility = false;
            _unavailable = true;
        }

        return(
            <BottomPanel 
                handVisibility={_handVisibility} 
                bidVisibility={_bidVisibility} 
                unavailable={_unavailable}
                cards={thisPlayer.Cards}
                /*playerInfo*//>
        );
    }
    return (
        <>
            <Body>
                <div className="PlayingField">
                    {players.map(player => (
                        <PlayersTablet /*players/>*/
                            PlayerName={player.Name}
                            VP={player.VP}
                            cardsDown={player.CardsDown}
                            openCards={player.openCards}
                            onclick={player.onclick}/>
                    ))}
                </div>
                {PlayersHand()}
            </Body>
        </>
    )
}

/**
 * @param {ThisPlayerView} thisPlayerView 
 */
export const SkullView2 = ({
    thisPlayerView = TestDataThisPlayer(), 
    players = TestDataPlayers}) =>
{    
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState(<h1>Заголовок</h1>);
    /*
    if (thisPlayerView.WinWindow){
        setModalActive(true);
        var sortable = players.slice(0);

        sortable.sort(function(a,b){
            return a.VP - b.VP;
        })
        setModalContent(
            <>
                <h1>Победил игрок {sortable[0]}</h1>
                {sortable.map(player=>{
                    return(
                        <p>{player.Name} {player.VP}</p>
                    )
                })}
            </>
        )
    }*/
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
    return (
        <>
            <Body>
                <div className="PlayingField">
                    {players.map(player => (
                        <PlayersTablet2 playerView = {player} 
                        active={active} thisPlayer={IfThisPlayer(player)}/>
                    ))}
                </div>
                <BottomPanel2
                    thisPlayerView = {thisPlayerView}/>
            </Body>
            {/* 
            <Modal active={modalActive} setActive={setModalActive}>
                    {modalContent}
            </Modal>*/}
        </>
    )
}



/*
SkullView2.propTypes = {
    thisPlayerView: ThisPlayerView,
    players: PropTypes.array
}
*/
/*
export const SkullView2 = ({
    deck, bet, victoryPoints, 
    updateBet, updateIsFlipping, 
    Pass, FlipCard,
    players}) =>{

    function PlayersHand(){
        return(
            <BottomPanel2
                deck={deck} bet={bet} victoryPoints={victoryPoints} 
                updateBet={updateBet} updateIsFlipping={updateIsFlipping}
                Pass={Pass} FlipCard={FlipCard}
                /*playerInfo*//*/>
        );
    }
    return (
        <>
            <Body>
                <div className="PlayingField">
                    {players.map(player => (
                        <PlayersTablet2 /*players/>*//*
                            PlayerName={player.Name}
                            VP={player.VP}
                            cardsDown={player.CardsDown}
                            openCards={player.openCards}
                            onclick={player.onclick}/>
                    ))}
                </div>
                {PlayersHand()}
            </Body>
        </>
    )
}*/