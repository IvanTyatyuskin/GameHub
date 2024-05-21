import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import skull from '../../assets/skull.png'
import './index.css'
import { SkullView2} from './SkullView';
import { CardView,ThisPlayerView,PlayerView } from './Classes'; 

const socket = io.connect('http://localhost:4000');
class Card {
  constructor(isSkull, isDown, isDisabled) {
    this.IsSkull = isSkull;
    this.IsDown = isDown;
    this.IsDisabled=isDisabled;
  }

}

let id=0
function Counter() {
  const [bet, setBet] = useState(0);
  const [victoryPoints, setVP] = useState(0);
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([]);
  const [input, setInput] = useState("");
  let playedDeck=[]
  const [isActive, setIsActive] = useState(false);
  const [havePassed, setHavePassed] = useState(false);
  const [gameMode, setGameMode] = useState("setup");
  const [thisPlayer, setThisPlayer] = useState([]);
  const [PlayersView, setPlayersView] = useState([]);
 

  const ThisPlayerToView = (deckValue,active,vp,gameMode) => () => {
  let cards=[];
  for (let i = 0; i < deckValue.length; i++) { 
    cards.push(new CardView(deckValue[i].IsSkull,FlipCard(i), deckValue[i].IsDown,deckValue[i].IsDisabled));
  }
  let view= new ThisPlayerView(0,cards,active,vp,bet,updateBet,Pass,input,setInput,false,gameMode);
 // setThisPlayer([...thisPlayer, ...view]);
 return view;
  }

  const PlayersToView = (playersValue) => () => {
    let newPlayers=[];
    for (let i = 0; i < playersValue.length; i++) { 
      newPlayers.push(new PlayerView(i, "player "+String(i), skull, playersValue[i].VP, playersValue[i].CardsDown,playersValue[i].IsActive, null));
    }

   // setThisPlayer([...thisPlayer, ...view]);
   return newPlayers;
    }
  useEffect(() => {
    const initialDeck = [
      new Card(false, false, false),
      new Card(false, false, false),
      new Card(false, false, false),
      new Card(true, false,  false)
    ]; 
    socket.emit('AddSkullPlayer');
    setDeck([...deck, ...initialDeck]);
    setThisPlayer(ThisPlayerToView(initialDeck,false,0,'setup'));
   
  }, []);

  socket.on('SkullPLayersUpdate', (data) => {
    console.log('SkullPLayersUpdate');
    console.log(data);
    
    let ind=0
    for (let i = 0; i < data.length; i++) 
    {
     
      if(data[i].Id==id) 
        {
          setVP(data[i].VP);
          setIsActive(data[i].IsActive);
          setGameMode(data[i].GameMode);
          ind=i;
        }
        data[i].onClick=() =>openChip(i);
    }
    setPlayers([...players, ...data]);
    setPlayersView(PlayersToView(data)); 
    setThisPlayer(ThisPlayerToView(deck,data[ind].IsActive,data[ind].VP,data[ind].GameMode));
  });

  socket.on('SkullGetPlayerId', (data) => {
  id=data;
  console.log(id);
  });  

  socket.on('BetFail', () => {
    const newDeck = [...deck];
    newDeck[Math.floor(Math.random()*(3+1))].IsDisabled=true;
    setDeck(newDeck);
    setThisPlayer(ThisPlayerToView(newDeck,isActive,victoryPoints,gameMode));
  }); 

  socket.on('Reset', () => {
    let newDeck = [];
    for (let i = 0; i < deck.length; i++) 
      {
        newDeck.push(deck[i]);
        newDeck[i].IsDown=false;
      }
    setDeck([...deck, ...newDeck]);
    setThisPlayer(ThisPlayerToView(newDeck,isActive,victoryPoints,gameMode));
  });  

function CardsDown(){
  let count=0
  for (let i = 0; i < deck.length; i++) { 
    if(deck[i].IsDown){
count++
    }
  }
  return count;
}

  function updateBet() {
    const val= (Number(input));
    if (val>bet&&(val<=CardsDown())){
      if(bet==0)
      {
        setGameMode('betting');
      }
      setBet(val);
      setIsActive(false);
    let mode='Betting';
    let downCount=CardsDown();
    let active=false;
    socket.emit('EndTurn',{id,downCount,playedDeck,mode,val,active,havePassed});
    }
    else if(val>CardsDown()){
      alert("Недостаточно карт на столе")
    }
    else if(val<bet){
      alert("Ставка меньше текущей")
    }
    else{
      alert("Назначьте ставку")
    }
  }
/*
  function EndTurn() {
    setIsActive(false);
    let downCount=CardsDown();
    let active=false;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,bet,active,havePassed});
    console.log("EndTurn");
  }*/
  const Pass = () => () => {
    setHavePassed(true);
    setIsActive(false);
    let downCount=CardsDown();
    let active=false;
    let pass=true;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,bet,active,pass});
 
  }
  /*
  function updateIsFlipping() {
    setIsFlipping(true);
  }
*/
  const FlipCard = (ind) => () => {
    const newDeck = [...deck];
    const newPlayedDeck = [...playedDeck];
    if (!newDeck[ind].IsDown&&isActive)
      {
      newDeck[ind].IsDown=true;
      //newDeck[ind].Image=back;
      newPlayedDeck.push(newDeck[ind]);
  
    setDeck(newDeck);
    playedDeck= newPlayedDeck;
    let downCount=CardsDown();
    let active=false;
    let pass=false;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,bet,active,pass});
    console.log(deck)
    setThisPlayer(ThisPlayerToView(newDeck,isActive,victoryPoints,gameMode));
    console.log(thisPlayer);
  }
   };

   const openChip = (ind) => () => {
    let id=players[ind].id;
    socket.emit('OpenChip',{id});
   }
   

  if(deck.length>0&&players.length>0){
    //if(isActive&&!isFlipping){
     // if (!showBets) {
        return (
          <>        
            {/*
            <SkullView players = {players} thisPlayer={thisPlayer} waiting = {false}/>
            <button hidden={deck[3].IsDisabled} className="Card"  onClick={FlipCard(3)}>
              <img name = 'img' src = {deck[3].Image} className="OptionImage" />
            </button>
            */
            
           }
            <button className='OptionButton'  onClick={ FlipCard(0)}>
            Play
           </button>
          <button className='OptionButton'  onClick={ Pass()}>
            Pass
           </button>
            <SkullView2 players = {PlayersView} thisPlayerView={thisPlayer}/>
           
            {/*
            
            <Header/>
            
            <div className="PlayingField">
              {players.map(player => (
                <PlayersTablet
                PlayerName={player.Name}
                VP={player.VP}
                cardsDown={player.CardsDown}
                openCards={["0", "1"]}/>
              ))}


            </div>
            <BottomPanel/>
            */}
          </>
        );
      } 
    }
  //}
//}

export default Counter;