import { InputText2 } from '../../../Components/common/Input'
import './BottomPanel.css'
import { Chip } from './chip'

export const BottomPanel = ({
    Cards=[{
        type: '0',
        onclick: ()=>{}
    },{
        type: '0',
        onclick: ()=>{}
    },{
        type: '0',
        onclick: ()=>{}
    },{
        type: '1',
        onclick: ()=>{}
    }],
    minimumBid = '0',
    value,
    setValue
}) => {
    return(
        <div className="BottomPanel1">
            <div>
                {Cards.map(card=>(
                <Chip 
                    type={card.type}
                    onClick={card.onclick}
                    />
                ))}
            </div>
            <div>
                <button className="OptionButton" onClick={()=>{}}>
                    Сделать ставку
                </button>
                <InputText2 labelText={minimumBid+" >"} name='userInput' value={value} setValue={setValue}/>
                <button className="OptionButton" onClick={()=>{}}>
                    Пасс
                </button>
            </div>
            
            {/*
            <button  hidden={deck[0].IsDisabled} className="Card" onClick={FlipCard(0)}>
                img name = 'img' src = {deck[0].Image} className="OptionImage" />
            </button>
            <button hidden={deck[1].IsDisabled} className="Card" onClick={FlipCard(1)}>
                <img name = 'img' src = {deck[1].Image} className="OptionImage" />
            </button>
            <button hidden={deck[2].IsDisabled} className="Card"  onClick={FlipCard(2)}>
                <img name = 'img' src = {deck[2].Image} className="OptionImage" />
            </button>
            <button hidden={deck[3].IsDisabled} className="Card"  onClick={FlipCard(3)}>
                <img name = 'img' src = {deck[3].Image} className="OptionImage" />
            </button>
        
            <button className="OptionButton" onClick={updateShowBets}>
                Сделать ставку
            </button>
                
            <button className="OptionButton" onClick={Pass}>Спасовать</button>
            <input type="text" id="userInput" placeholder="Ставка"></input>
            <p className="DisplayText"> ПО: {victoryPoints}</p>
        */}
        </div>
    )
}