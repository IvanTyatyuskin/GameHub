import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import flower from '../../assets/flower.png'
import skull from '../../assets/skull.png'
import back from '../../assets/back.png'
import './index.css'
import {Chip} from './components/chip'
import { PlayersTablet } from './components/playersTablet';
import './components/playingField.css'
import Header from '../../Components/Header';
import { BottomPanel } from './components/BottomPanel';


const socket = io.connect('http://localhost:3000');
class Card {
  constructor(isSkull, isDown,initialImage,image, isDisabled) {
    this.IsSkull = isSkull;
    this.IsDown = isDown;
    this.Image = image;
    this.InitialImage=initialImage;
    this.IsDisabled=isDisabled;
  }

  get IsSkull() {
    return this._IsSkull;
  }

  set IsSkull(value) {
    this._IsSkull = value;
  }
  get IsDown() {
    return this._IsDown;
  }
  set IsDown(value) {
    this._IsDown = value;
  }
  get Image() {
    return this._Image;
  }
  set Image(value) {
    this._Image = value;
  }
  get InitialImage() {
    return this._InitialImage;
  }
  set InitialImage(value) {
    this._InitialImage = value;
  }
  get IsDisabled() {
    return this._IsDisabled;
  }
  set IsDisabled(value) {
    this._IsDisabled = value;
  }
}

class Player {
  constructor(name,vP, cardsDown,image, isDisabled) {
    this.VP = vP;
    this.CardsDown = cardsDown;
    this.Image = image;
    this.IsDisabled=isDisabled;
    this.Name=name;
  }
  get Name() {
    return this._Name;
  }

  set Name(value) {
    this._Name = value;
  }
  get VP() {
    return this._VP;
  }

  set VP(value) {
    this._VP = value;
  }
  get CardsDown() {
    return this._CardsDown;
  }
  set CardsDown(value) {
    this._CardsDown = value;
  }
  get Image() {
    return this._Image;
  }
  set Image(value) {
    this._Image = value;
  }
  get IsDisabled() {
    return this._IsDisabled;
  }
  set IsDisabled(value) {
    this._IsDisabled = value;
  }
}
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function Counter() {
  const [bet, setBet] = useState(0);
  const [victoryPoints, setVP] = useState(0);
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playedDeck, setPlayedDeck] = useState([]);
  const [showBets, setShowBets] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [havePassed, setHavePassed] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [gameMode, setGameMode] = useState("beforeBet");
  let fail=false;
  useEffect(() => {
    const initialDeck = [
      new Card(false, false, flower,flower,false),
      new Card(false, false, flower,flower,false),
      new Card(false, false, flower,flower,false),
      new Card(true, false, skull,skull,false)
    ];

    setDeck([...deck, ...initialDeck]);
  }, []);
  useEffect(() => {
    const initplayers = [
      new Player("player1", 0, 0,flower,false),
      new Player("player2", 0, 0,flower,false),
      new Player("player3", 0, 0,flower,false),
      new Player("player4", 0, 0,flower,false),
      new Player("player5", 0, 0,flower,false),
    ];

    setPlayers([...players, ...initplayers]);
  }, []);
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
    const val= (Number(document.getElementById("userInput2").value));
    if (val>bet&&(val<=CardsDown())){
      setBet(val);
      Pass();
    }
    else if(val>CardsDown()){
      alert("Недостаточно карт на столе")
    }
    else{
      alert("Ставка меньше текущей")
    }
  }

  function updateShowBets() {
    const val=Number(document.getElementById("userInput").value)
    
    if (val>0&&(val<=CardsDown())){
      setBet(val);
      setShowBets(!showBets);
      Pass();
    }
    else if(val>CardsDown()){
      alert("Недостаточно карт на столе")
    }
    else{
      alert("Назначьте ставку")
    }
    
  }
  function EndTurn(emit_name) {
    setIsActive(false);
    let downCount=CardsDown();
    socket.emit('EndTurn',{emit_name,downCount,playedDeck,gameMode,bet,isActive,havePassed});
  }
  function Pass() {
    setHavePassed(true);
   EndTurn("Pass");
 
  }
  function updateIsFlipping() {
    setIsFlipping(true);
  }
  const FlipCard = (ind) => () => {
    const newDeck = [...deck];
    const newPlayedDeck = [...playedDeck];
    let prev=false;
    if (!newDeck[ind].IsDown&&isActive&&!isFlipping){
      newDeck[ind].IsDown=true;
      newDeck[ind].Image=back;
      newPlayedDeck.push(newDeck[ind]);
    }
    else if (newDeck[ind].IsDown&&isActive&&isFlipping){
     
      newDeck[ind].IsDown=false;
      prev=true;
      newDeck[ind].Image=newDeck[ind].InitialImage;
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
    }
    setDeck(newDeck);
    setPlayerDeck(newPlayedDeck);
    Pass()
    console.log(deck)
   };
  function DrawCard() {
    if(deck.length>0){
    const newDeck = [...deck];
    const newPlayerDeck = [...playerDeck];

   /* if (newDeck.at(-1).IsSkull) {
      alert("Вы вытянули череп");
    } else {
      alert("Вы вытянули цветок");
    }*/

    newPlayerDeck.push(newDeck.pop());
    setDeck(newDeck);
    setPlayerDeck(newPlayerDeck);
  }
  else{
    alert("Колода пуста");
  }
  }
  if(deck.length>0&&players.length>0){
    if(isActive&&!isFlipping){
      if (!showBets) {
        return (
          <>
          <Header/>

          <div className="PlayingField">
            {players.map(player => (
              <PlayersTablet PlayerName={player.Name}
              VP={player.VP}
              cardsDown={player.CardsDown}
              openCards={["0", "1"]}/>
            ))}
            {/*<PlayersTablet PlayerName={players[0].Name} 
              VP={players[0].VP}
              cardsDown={players[0].CardsDown}
              openCards={["0", "1"]} 
          />*/}

          </div>
          <BottomPanel/>
          </>
        );
      } else {
        return (
          <>
          <div className="TopPanel">

    <div className='Player' >
    <p className="DisplayText">{players[0].Name}</p>
    <p className="DisplayText"> ПО: {players[0].VP}</p>
    <button style={{display:"block"}} hidden={players[0].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[0].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[1].Name}</p>
    <p className="DisplayText"> ПО: {players[1].VP}</p>
    <button style={{display:"block"}} hidden={players[1].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[1].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[2].Name}</p>
    <p className="DisplayText"> ПО: {players[2].VP}</p>
    <button style={{display:"block"}} hidden={players[2].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[2].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[3].Name}</p>
    <p className="DisplayText"> ПО: {players[3].VP}</p>
    <button style={{display:"block"}} hidden={players[3].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[3].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[4].Name}</p>
    <p className="DisplayText"> ПО: {players[4].VP}</p>
    <button style={{display:"block"}} hidden={players[4].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[4].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    </div>
          <div className="BottomPanel">
        <button hidden={deck[0].IsDisabled} className="Card" onClick={FlipCard(0)}>
            <img name = 'img' src = {deck[0].Image} className="OptionImage" />
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
            <button className="OptionButton" onClick={updateBet}>Поднять ставку</button>
            <button className="OptionButton" onClick={updateIsFlipping}>Проверить ставку</button>
            <input type="text" id="userInput2" placeholder="Ставка"></input>
            <button className="OptionButton" onClick={Pass}>Спасовать</button>
            <p className="DisplayText"> Ставка: {bet}</p>
            <p className="DisplayText"> ПО: {victoryPoints}</p>
            </div>
          </>
        );
      }

    }
    else{
      return(
        <>
        <div className="TopPanel">

    <div className='Player' >
    <p className="DisplayText">{players[0].Name}</p>
    <p className="DisplayText"> ПО: {players[0].VP}</p>
    <button style={{display:"block"}} hidden={players[0].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[0].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[1].Name}</p>
    <p className="DisplayText"> ПО: {players[1].VP}</p>
    <button style={{display:"block"}} hidden={players[1].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[1].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[2].Name}</p>
    <p className="DisplayText"> ПО: {players[2].VP}</p>
    <button style={{display:"block"}} hidden={players[2].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[2].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[3].Name}</p>
    <p className="DisplayText"> ПО: {players[3].VP}</p>
    <button style={{display:"block"}} hidden={players[3].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[3].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    <div className='Player' >
    <p className="DisplayText">{players[4].Name}</p>
    <p className="DisplayText"> ПО: {players[4].VP}</p>
    <button style={{display:"block"}} hidden={players[4].IsDisabled} className="Card" >
    <img name = 'img' src = {back} className="OptionImage" />
    <p  className="DisplayText">  {players[4].CardsDown}</p>
    </button>

    <img  name = 'img'style={{display:"block"}} src = {back} className="OptionImage" />
    </div>

    </div>
        <div className="BottomPanel">
          <button hidden={deck[0].IsDisabled} className="Card" onClick={FlipCard(0)}>
            <img name = 'img' src = {deck[0].Image} className="OptionImage" />
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
            <p className="DisplayText"> Ставка: {bet}</p>
            <p className="DisplayText"> ПО: {victoryPoints}</p>
            </div>
        </>
        );
    }
  }
}

export default Counter;