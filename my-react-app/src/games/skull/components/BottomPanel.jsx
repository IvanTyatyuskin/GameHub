import { InputText2 } from '../../../Components/common/Input'
import './BottomPanel.css'
import { Chip, Chip2 } from './chip'
import { textDataToView } from '../textDataToView'

export const BottomPanel = ({
    cards=[{
        type: '0',
        onclick: ()=>{},
        active:true}],
    minimumBid = 'null',
    value,
    setValue,
    indexDictionary = 0,
    bidVisibility = false,
    handVisibility = true,
    unavailable = false
}) => {
    const textContext = textDataToView[indexDictionary];
    function CardsView()
    {
        if (!handVisibility) return(<></>);
        else if (unavailable) return(
            <div className='Cards'>
            {cards.map(card=>{
                if (card.active){
                    return(
                        <Chip type={card.type}/>
                    )
                }
            })}
        </div>
        );
        else return(
            <div className='Cards'>
                {cards.map(card=>{
                    if (card.active){
                        return(
                            <Chip 
                                type={card.type}
                                onClick={card.onclick}
                                />
                        )
                    }
                })}
            </div>
        )
    }
    function WindowWithBid()
    {
        if (bidVisibility==false) return(<></>);
        else return(
            <div className='Bid'>
               <button className="OptionButton" onClick={()=>{}}>
                   {textContext.placeBet}
               </button>
               <InputText2 labelText={minimumBid+" >"} name='userInput' value={value} setValue={setValue}/>
               <button className="OptionButton" onClick={()=>{}}>
                   {textContext.skip}
               </button>
            </div>
        );
    }
    return(
        <div className="BottomPanel1">
            {CardsView()}
            {WindowWithBid()}
        </div>
    )
}   
/*
export const BottomPanel2 = ({deck, bet, victoryPoints, 
    updateBet, updateIsFlipping, Pass, FlipCard}) => {
    const textContext = textDataToView[indexDictionary];
    function CardsView()
    {
        return(
            <div className='Cards'>
                {deck.map((deck1, index)=>{
                    return(
                        <Chip2
                            deck={deck1}
                            onClick={FlipCard(index)}
                            />
                    )
                })}
            </div>)
    }
    function WindowWithBid()
    {
        if (bidVisibility==false) return(<></>);
        else return(
            <div className='Bid'>
               <button className="OptionButton" onClick={updateBet()}>
                   {textContext.placeBet}
               </button>
               <InputText2 labelText={minimumBid+" >"} name='userInput2' value={value} setValue={setValue}/>
               <button className="OptionButton" onClick={Pass()}>
                   {textContext.skip}
               </button>
            </div>
        );
    }
    return(
        <div className="BottomPanel1">
            {CardsView()}
            <div>
                <p>Ставка: {bet}</p>
                <p>ПО: {victoryPoints}</p>
            </div>
            {WindowWithBid()}
        </div>
    )
} */            
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