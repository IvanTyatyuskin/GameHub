import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import flower from '../../assets/flower.png'
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
  const [isActive, setIsActive] = useState(true);
  const [havePassed, setHavePassed] = useState(false);
  const [gameMode, setGameMode] = useState("0");
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
      new Card(false, false, flower,flower,false),
      new Card(false, false, flower,flower,false),
      new Card(false, false, flower,flower,false),
      new Card(true, false, skull, skull, false)
    ]; 
    socket.emit('AddSkullPlayer');
    setDeck([...deck, ...initialDeck]);
    setThisPlayer(ThisPlayerToView(initialDeck,false,0,'setup'));
   
  }, []);
  
  useEffect(() => {
   /* const initplayers = [
      new Player("player1", 0, 0, flower, false, false),
      new Player("player2", 0, 0, flower, false, false),
      new Player("player3", 0, 0, flower, false, false),
      new Player("player4", 0, 0, flower, false, false),
      new Player("player5", 0, 0, flower, false, false),
    ];

    setPlayers([...players, ...initplayers]);
    setPlayersView(PlayersToView(initplayers));*/
  }, []);

  socket.on('SkullPLayersUpdate', (data) => {
    console.log('SkullPLayersUpdate');

    setPlayers([...players, ...data]);
    console.log(players);
    setPlayersView(PlayersToView(data));  
    let ind=0
    for (let i = 0; i < players.length; i++) 
    {
     
      if(players[i].Id==id) 
        {
          setVP(players[i].VP);
          setIsActive(players[i].IsActive);
          setGameMode(players[i].GameMode);
          ind=i;
        }
        players[i].onClick=() =>openChip(i);
    }
    setThisPlayer(ThisPlayerToView(deck,players[ind].IsActive,players[ind].VP,players[ind].GameMode));
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

  function EndTurn() {
    setIsActive(false);
    let downCount=CardsDown();
    let active=false;
    socket.emit('EndTurn',{id,downCount,playedDeck,gameMode,bet,active,havePassed});
    console.log("EndTurn");
  }
  function Pass() {
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
    if (!newDeck[ind].IsDown&&isActive&&!gameMode=="flippingChips"){
      newDeck[ind].IsDown=true;
      //newDeck[ind].Image=back;
      newPlayedDeck.push(newDeck[ind]);
    }
   /* else if (newDeck[ind].IsDown&&isActive&&gameMode=="flippingChips"){
     
      newDeck[ind].IsDown=false;
      prev=true;
    //  newDeck[ind].Image=newDeck[ind].InitialImage;
      if (!newDeck[ind].IsSkull){
        let n=bet-1;
        setBet(bet-1);
      
      }
      else{
        alert("Поиграно"); 
        console.log(Math.floor(Math.random()*(3+1)));
        newDeck[Math.floor(Math.random()*(3+1))].IsDisabled=true;
        fail=true;

      }
      console.log(bet);
    }
    
    
    if(isFlipping&&bet==1&&prev==true&&fail==false){
      alert("Ставка сыграла");
      setIsFlipping(false);
      setShowBets(false);
      setVP(victoryPoints+1);
    }*/
    setDeck(newDeck);
   playedDeck= newPlayedDeck;
    let downCount=CardsDown();
    let active=false;
    let pass=true;
    socket.emit('EndTurn',{id,downCount,newPlayedDeck,gameMode,bet,active,pass});
    console.log(deck)
    setThisPlayer(ThisPlayerToView(newDeck,isActive,victoryPoints,gameMode));
    console.log(thisPlayer);
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
          <button className='OptionButton'  onClick={() => EndTurn()}>
            Test
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