import './playersTablet.css'
import react from '../assets/react.svg'
import '../../../Components/css/image.css'
import { Chip } from './chip'
import { PlayerView } from '../Classes.js'
import React from 'react'


export const PlayersTablet = ({
        PlayerImg = react, 
        PlayerName = "Player", 
        VP = "0", 
        cardsDown="0",
        openCards=[],
        onclick
    }) => {
    function ViewOpenCards(){
        if (openCards.length > 0){
            return(
                openCards.map(chip=>(
                    <Chip type={chip}/>
                ))
            )
        }
        return (<></>)
    }
    return(
        <div className='playersTablet'>
            <div className='playerCard'>
                <div>
                    <img src={PlayerImg} className='size64'/>
                    <p>{PlayerName}</p>
                    <p>{VP}</p>
                </div>
                <div>
                    <span id="count">{cardsDown}</span>
                    <Chip onClick={onclick}/>
                </div>
            </div>
            <div>
                {ViewOpenCards()}
            </div>
        </div>
    )
}


/**
 * 
 * @param {PlayerView} playerView 
 * @returns 
 */
export const PlayersTablet2 = ({
    playerView, active
}) => {
    console.table(playerView)
    function ViewOpenCards(Cards){
        if (Cards.length > 0){
            return(
                Cards.map(chip=>(
                    <Chip type={chip.Type}/>
                ))
            )
        }
        return (<></>)
    }
    function OnClickFun(){
        if (!active){
            return null;
        }
        return playerView.Onclick;
    }
    return(
        <div className='playersTablet'>
            <div className={playerView.IsActive?'playerCard active':'playerCard'}>
                <div>
                    <img src={playerView.Img} className='size64'/>
                    <p>{playerView.Name}</p>
                    <p>{playerView.VP}</p>
                </div>
                <div>
                    <span id="count">{playerView.CardsDown}</span>
                    <Chip onClick={OnClickFun()}/>
                </div>
            </div>
            <div>
                {ViewOpenCards(playerView.OpenCards)}
            </div>
        </div>
    )
}
{/*<div className='Player' >
        <p className="DisplayText">{players[0].Name}</p>
        <p className="DisplayText"> ПО: {players[0].VP}</p>
        <button style={{display:"block"}} hidden={players[0].IsDisabled} className="Card" >
        <img name = 'img' src = {back} className="OptionImage" />
        <p  className="DisplayText">  {players[0].CardsDown}</p>
        </button>
        <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
</div>*/}