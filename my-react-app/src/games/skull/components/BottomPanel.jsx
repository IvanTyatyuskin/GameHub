import { InputText2 } from '../../../Components/common/Input'
import './BottomPanel.css'
import { Chip } from './chip'
import { textDataToView } from '../textDataToView'
import {ThisPlayerView} from '../Classes.js'
import { useEffect, useState } from 'react'


/**
 * 
 * @param  {ThisPlayerView} thisPlayerView 
 * @returns 
 */
export const BottomPanel2 = ({ 
    indexDictionary = '0',
    thisPlayerView
}) => {
    const textContext = textDataToView[indexDictionary];
    //if (!thisPlayerView.Active){return(<></>)}

    const [HandIsActive, setHandIsActive] = useState(false);
    const [CounterIsVisible, setCounterIsVisible] = useState(false);
    const [BetIsVisible, setBetIsVisible] = useState(false);
    const [PassIsVisible, setPassIsVisible] = useState(false);


    //const [Dimmed, setDimmed] = useState(<></>)
    //var HandIsActive = false;
    //var CounterIsVisible = false;
    //var BetIsVisible = false;
    //var BetIsActive = false;
    //var PassIsVisible = false;

    useEffect(()=>{
        setHandIsActive(false);
        setCounterIsVisible(false);
        setBetIsVisible(false);
        setPassIsVisible(false);

        switch (thisPlayerView.Phase){
            /*only the choice of chips*/
            case 'setup':{
                setHandIsActive(true);
                break;
            }
            /*You can place a bet*/
            case 'play':{
                setHandIsActive(true);
                setBetIsVisible(true);
                //BetIsActive = true;
                break;
            }
            /*the betting phase*/
            case 'betting':{
                setBetIsVisible(true);
                //BetIsActive = true;
                setPassIsVisible(true);
                break;
            }
            /*opening chips*/
            case 'flippingChips':{
                setCounterIsVisible(true);
                break;
            }
            default:{
                break;
            }
        };
        if (thisPlayerView.IsActive) {
            setHandIsActive(false);
            setBetIsVisible(false);
            //setDimmed(
            //    <div className='dimmed'/>
            //)
        }
    }, [thisPlayerView.Phase, thisPlayerView.IsActive]);

    function CardsView(cards)
    {
        if (cards.length === 0) return(
            <div className='Cards'>
                <p>Карт нет</p>
            </div>
        )
        return(
            <div className='Cards'>
                {cards.map((card, index)=>{
                    return(
                        <Chip 
                            key={index}
                            type={card.Type}
                            onClick={HandIsActive? card.Onclick:null}
                            disabled={card.Disabled}
                            />
                    )
                })}
                {/*<h1>{HandIsActive.toString()}</h1>*/}
            </div>
        )
    }
    function WindowWithBid()
    {
        if (!BetIsVisible) return(<></>);
        else return(
            <div className='Bid'>

                <button className="OptionButton" 
                    onClick={thisPlayerView.UpdateBet}>
                    {textContext.placeBet}
                </button>
                <InputText2 
                    labelText={thisPlayerView.Bet +" >"} 
                    name='userInput' 
                    value={thisPlayerView.InputValue} 
                    setValue={thisPlayerView.SetInputValue}/>
                {/*<PassButton func = {thisPlayerView.Pass}/>*/}
                <div style={{ display: !PassIsVisible? 'none' : 'block' }}>
                    <button className="OptionButton" onClick={thisPlayerView.Pass}>
                        {textContext.skip}
                    </button>
                </div>
            </div>
        );
    }
    function CounterView() {
        if (!CounterIsVisible) return (<></>)
        return (
            <div className='Bid'>
                <p>{textContext.ItRemainsToTurnItOver}:</p>
                <p>{thisPlayerView.Bet}</p>
            </div>
        )
    }
    function CurrentBetView() {
        if (!BetIsVisible) return (<></>)
        return (
            <div className='Bid'>
                <p>{textContext.currentBet}:</p>
                <p>{thisPlayerView.Bet}</p>
            </div>
        )
    }
    return(
        <div className="BottomPanel1">
            {CardsView(thisPlayerView.ViewCards)}
            {CounterView()}
            {CurrentBetView()}
            {WindowWithBid()}
        </div>
    )
}