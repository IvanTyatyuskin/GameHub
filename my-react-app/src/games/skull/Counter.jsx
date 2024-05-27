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
let debug=0;
let id=0;
let playedDeck=[];
let debounceTimeout;
let UpdateDebounceTimeout;
let lost=false;
function Counter() {
  const [bet, setBet] = useState(0);
  const [victoryPoints, setVP] = useState(0);
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([]);
  const [input, setInput] = useState("");
 
  const [isActive, setIsActive] = useState(false);
 // const [havePassed, setHavePassed] = useState(false);
  const [gameMode, setGameMode] = useState("setup");
  const [thisPlayer, setThisPlayer] = useState([]);
  const [PlayersView, setPlayersView] = useState([]);   
 // const [winWindow, setWinWindow] = useState(false);  

  const ThisPlayerToView = (deckValue,active,vp,gameMode,Bet,winWindow) => () => {
  let cards=[];
  for (let i = 0; i < deckValue.length; i++) { 
    let val='0';
    if(deckValue[i].IsSkull)
      {
        val='1';
    }
    if(deckValue[i].IsDown)
      {
        val=null;
      }
    cards.push(new CardView(val,FlipCard(i), deckValue[i].IsDown,deckValue[i].IsDisabled));
  }
  //console.log(cards);
  let view= new ThisPlayerView(id,cards,active,vp,Bet,updateBet(),Pass(),input,setInput,winWindow,gameMode);
 // setThisPlayer([...thisPlayer, ...view]);
 return view;
  }

  const PlayersToView = (playersValue) => () => {
    let newPlayers=[];
    
    for (let i = 0; i < playersValue.length; i++) { 
      let cards=[];
       for (let j = 0; j < playersValue[i].OpenCards.length; j++) { 
        let val='0';
                
        if(playersValue[i].OpenCards[j].IsSkull)
          {
            val='1';
        }
      
          cards.push(new CardView(val,null, false,false));
        }
        if(debug==0)
          {
          debug++;
          //console.log(cards);
          }
       
        newPlayers.push(new PlayerView(playersValue[i].Id, "player"+String(i), skull, playersValue[i].VP, playersValue[i].CardsDown,cards, playersValue[i].IsActive, openChip(i)));
       
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
    setThisPlayer(ThisPlayerToView(initialDeck,false,0,'setup', 0,false));
    
  }, []);

  if (UpdateDebounceTimeout) clearTimeout(UpdateDebounceTimeout);
  UpdateDebounceTimeout = setTimeout(() => {
  socket.emit('SkullUpdate');
}, 100);

  socket.on('SkullPLayersUpdate', (data) => {
   // console.log('SkullPLayersUpdate');
    //console.log(data);
    if(data!=null){
    let ind=0
    for (let i = 0; i < data.length; i++) 
    {
     
      if(data[i].Id==id) 
        {
          setVP(data[i].VP);
          setIsActive(data[i].IsActive);
          setGameMode(data[i].GameMode);
          setBet(data[i].Bet);
          ind=i;
        }
       
    }
   // console.log(id);
    setPlayers(data);
    setPlayersView(PlayersToView(data)); 
    setThisPlayer(ThisPlayerToView(deck,data[ind].IsActive,data[ind].VP,data[ind].GameMode,data[ind].Bet,data[ind].WinWindow));
  }
  });

  socket.on('SkullGetPlayerId', (data) => {
  id=data;
 // console.log("got id");
 // console.log(id);  
  });  

  socket.on('BetFail', () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
if(deck.length>0)
  { 
    if(lost==false)
    {
    const newDeck = [...deck];
    lost=true;
    //const enabled=deck.filter(em=>!em.IsDisabled);
    newDeck.splice(Math.floor(Math.random()*((newDeck.length-1)+1)),1);
   // newDeck[Math.floor(Math.random()*((deck.length-1)+1))].IsDisabled=true;
    //const randomInd=Math.floor(Math.random()*((newDeck.length-1)+1));
    //const removedElement = enabled.splice(randomInd, 1);
    //const ind=newDeck.indexOf(removedElement[0]);
    //newDeck[ind].IsDisabled=true;
    setDeck(newDeck);
   // console.log("fail");
    //console.log(newDeck);
    setThisPlayer(ThisPlayerToView(newDeck,isActive,victoryPoints,gameMode,bet,false));
  }
}
}, 100);
  }); 

  socket.on('Reset', () => {
    let newDeck = [];
    playedDeck=[]
    lost=false;
    for (let i = 0; i < deck.length; i++) 
      {
        newDeck.push(deck[i]);
        newDeck[i].IsDown=false;
      }
    setDeck(newDeck);
    setThisPlayer(ThisPlayerToView(newDeck,isActive,victoryPoints,gameMode,bet,false));
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

function totalCardsDown(){
  let count=0
  for (let i = 0; i < players.length; i++) { 
    count+=players[i].CardsDown;
  }
  return count;
}

const updateBet = () => () => {
   if(isActive)
    {
    const Bet=(Number(input));
    if (Bet>bet&&Bet<=totalCardsDown()){
      if(bet==0)
      {
        //setGameMode('betting');
      }
      setBet(Bet);
      setIsActive(false);
    let downCount=CardsDown();
    let active=false;
    let pass=false;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,Bet,active,pass});
    }
    else if(Bet>totalCardsDown()){
      alert("Недостаточно карт на столе")
    }
    else if(Bet<=bet){
      alert("Ставка меньше текущей")
    }
    else{
      alert("Назначьте ставку")
    }
  }
  }
/*
   const EndTurn=()=> {
    if(deck.length>0){
    if (!newDeck[ind].IsDown&&isActive)
      {
    setIsActive(false);
    let downCount=CardsDown();
    let active=false;
    let pass=false;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,bet,active,pass});
    console.log("EndTurn");
      }
      }
  }*/
  const Pass = () => () => {
   if(isActive)
    {
    setIsActive(false);
    let downCount=CardsDown();
    let active=false;
    let pass=true;
    let Bet=bet;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,Bet,active,pass});
   }
  }
  /*
  function updateIsFlipping() {
    setIsFlipping(true);
  }
*/
  const FlipCard = (ind) =>() => {

    const newDeck = [...deck];
    if (!newDeck[ind].IsDown&&isActive)
      {
      newDeck[ind].IsDown=true;
      //newDeck[ind].Image=back;
      playedDeck.push(newDeck[ind]);
  
    setDeck(newDeck);     
    let downCount=CardsDown();
    let active=false;
    let pass=false;
    let Bet=bet;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,Bet,active,pass});
    //console.log(deck)
   // setThisPlayer(ThisPlayerToView(newDeck,isActive,victoryPoints,gameMode,Bet));
    //console.log(thisPlayer);
  }
  
   };   

   const openChip = (ind) => () => {
    if(gameMode=='flippingChips'&&players[ind].Id!=id&&isActive)
    {
        let targetId=players[ind].Id;
        socket.emit('OpenChip',{targetId});
    }
    
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