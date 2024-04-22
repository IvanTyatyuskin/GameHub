import './playersTablet.css'
import react from '../assets/react.svg'
import '../../../Components/css/image.css'
import { Chip } from './chip'


export const PlayersTablet = ({
        PlayerImg = react, 
        PlayerName = "Player", 
        VP = "0", 
        cardsDown="0",
        openCards=[]
    }) => {
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
                    <Chip onClick={()=>{}}/>
                </div>
            </div>
            <div>
                {openCards.map(chip=>(
                    <Chip type={chip}/>
                ))}
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