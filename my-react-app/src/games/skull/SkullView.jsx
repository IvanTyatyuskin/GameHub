import {PlayersTablet} from './components/playersTablet'
import {BottomPanel} from './components/BottomPanel'
import './components/playingField.css'
import { textDataToView } from './textDataToView'
import {Body} from '../../Components/Body'

const SkullView = ({players, thisPlayer, waiting = false}) =>{
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
export default SkullView;

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