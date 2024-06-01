import './playersTablet.css'
import react from '../assets/react.svg'
import '../../../Components/css/image.css'
import { Chip } from './chip'
import { PlayerView } from '../Classes.js'
import React from 'react'


/**
 * 
 * @param {PlayerView} playerView 
 * @returns 
 */
export const PlayersTablet2 = ({
    playerView, active, thisPlayer
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
                    <p className={thisPlayer?'thisPlayer':''}>{playerView.Name}</p>
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