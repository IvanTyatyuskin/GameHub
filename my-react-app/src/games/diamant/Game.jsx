import React, { Component} from "react";
import Button from '../../Components/common/button'
import '../../Components/css/game.css'
import Ruby from './Images/ruby.png'
import Stone from './Images/ball.png'
import Relic from './Images/star.png'
import Spider from './Images/spider.png'
import Snake from './Images/snake.png'
import Magma from './Images/magma.png'
import Wood from './Images/wood.png'
import Tile from "./components/Tile.jsx"
import { GameContext } from './GameContext.jsx';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { socket } from "../ConnectionJSX.jsx";
  

const squareCount = 6;
let roundNum=1;
let currentMove=0;
export let Deck=[]; 
let RelicDeck=[];
let allRubyOnMap=0;
class Player {
    constructor(id, roundPoints, allPoints, relics, nickName,exit) {
        this.id = id;
        this.roundPoints = roundPoints;
        this.allPoints = allPoints;
        this.relics = relics;
        this.nickName = nickName;
        this.exit=exit
    }
    getExit() {
        return this.exit;
    }
    setExit(exitValue) {
        this.exit=exitValue;
    }
    getNickName() {
        return this.nickName;
    }
    addRelic(newRelic){
        this.relics.push(newRelic);
    }
    getRelic(){
        return this.relics;
    }
    getPlayerId() {
        return this.id;
    }
    getRoundPoints() {
        return this.roundPoints;
    }
    getallPoints() {
        return this.allPoints;
    }
    addAllPoints(plusPoints)
    {
        this.allPoints+=plusPoints;
    }
    addRoundPoints(plusPoints)
    {
        this.roundPoints+=plusPoints;
    }
    setRoundPointsToZero()
    {
        this.roundPoints=0;
    }
}
let Players = [];
//let Player0=null;
export let playersDataJS = Players.map(player => {
        return {
            imageId: player.getPlayerId(),
            nickName: player.getNickName(),
            score: player.getallPoints(),
            ruby: player.getRoundPoints(),
            relics: player.getRelic(),
            atTheBase: player.getExit(),
        };
    });
export let roundData = {
        round: roundNum
    }
export let trapsInThisRound = []
export const trapsInDeck = [
        {
            trapId: '6',
            count: 2
        },
        {
            trapId: '7',
            count: 2
        },
        {
            trapId: '8',
            count: 2
        }
    ]



function updatePlayerInfo(){
    playersDataJS = Players.map(player => {
        return {
            imageId: player.getPlayerId(),
            nickName: player.getNickName(),
            score: player.getallPoints(),
            ruby: player.getRoundPoints(),
            relics: player.getRelic(),
            atTheBase: player.getExit(),
        };
    });

}

function determiningWinner() {
    let maxPoints = 0;
    let winner = null;

    Players.forEach((player) => {
        let points = player.getallPoints();
        let relicPoints=0
        player.getRelic().forEach(relic=>{
            relicPoints+=relic.getPoints()
        })
        points+=relicPoints
        if (points > maxPoints) {
            maxPoints = points;
            winner = player;
        }
    });

    return winner;
}
function stringWinnerAlirt(){
    let winner = determiningWinner();
    let relicPoints=0
    winner.getRelic().forEach(relic=>{
        relicPoints+=relic.getPoints()
    })

    const Winner = {
        Nick: winner.getNickName(),
        count: winner.getallPoints(),
        relic: winner.getRelic().length,
        relicPoints: relicPoints
    }

    return Winner;
}
function shuffle(array) {
    array.push(RelicDeck[roundNum-1])
    //console.log(RelicDeck[roundNum-1].points)
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function defineTileId(index) {
    let tileId = 0;
    if(index>25) index-=24
    else if(index>13) index-=12;
    
    if (index % 13 == 0) {
        tileId = '4';
    } else if (index % 12 == 0) {
        tileId = '3';
    } else if (index % 7 == 0) {
        tileId = '2';
    } else if (index % 6 == 0) {
        tileId = '1';
    }
    return tileId;
}


function PointCount(points) {
    if(Deck[currentMove].getСardType().includes("relic"))
    {
        return null
    }
    let pointsPerPlayer = Math.floor(points / 2 / Players.length);
    let remainingPoints = points;

    if (pointsPerPlayer === 0) {
        allRubyOnMap+=points;
        return remainingPoints
    }

    Players.forEach((player)=>player.addRoundPoints(pointsPerPlayer))
    remainingPoints -= pointsPerPlayer * Players.length;
    allRubyOnMap+=remainingPoints;
    return remainingPoints;
   
}
function GetTrapsInThisRound(){
    let trapTypes = ['Trap Spider', 'Trap Snake', 'Trap Stone', 'Trap Wood', 'Trap Magma'];
    let traps= [];
    for (let i = 0; i <currentMove; i++) {
        if (trapTypes.includes(Deck[i].getСardType())) {
            if(Deck[i].getСardType()=='Trap Stone' )traps.push(6);
            if(Deck[i].getСardType()=='Trap Snake' )traps.push(7);
            if(Deck[i].getСardType()=='Trap Spider' )traps.push(8);
            if(Deck[i].getСardType()=='Trap Wood' )traps.push(11);
            if(Deck[i].getСardType()=='Trap Magma' )traps.push(12);
        }
    }
    return traps
}
function checkTrapDuplicates() {
    let trapTypes = ['Trap Spider', 'Trap Snake', 'Trap Stone', 'Trap Wood', 'Trap Magma'];
    let trapCounts = {};
    trapTypes.forEach((trap) => {
        trapCounts[trap] = 0;
    });
    for (let i = 0; i <currentMove; i++) {
        if (trapTypes.includes(Deck[i].getСardType())) {
            trapCounts[Deck[i].getСardType()]++;
        }
    }

    for (let trap in trapCounts) {
        if (trapCounts[trap] >= 2) {
            console.log(`Две ловушки типа ${trap} были найдены.`);
            return true;
        }
    }

    console.log('Две ловушки одного типа не были найдены.');
    return false;
}
function checkPlayersExited(){
    let allExited = true;
    Players.forEach((player) => {
        if (!player.getExit()) {
            allExited = false;
        }
    });
    return allExited;
}



class Card {
    constructor(cardType, points) {
        this.cardType = cardType;
        this.points = points;
    }

    getСardType() {
        return this.cardType;
    }

    getPoints() {
        return this.points;
    }
    
}




class Square extends React.Component {
    
    render() {
        const style = {
            width: "120px",
            height: "120px",
            border: "1px solid black",
            backgroundSize: 'cover',
            color: 'red'
        };
       
        
        let imageSrc;
        if (this.props.isStarted) {
            switch (this.props.cardType) {
                case 'Treasure':
                    imageSrc = Ruby;
                    break;
                case 'relic':
                    imageSrc = Relic;
                    break;
                case 'Trap Spider':
                    imageSrc = Spider;
                    break;
                case 'Trap Snake':
                    imageSrc = Snake;
                    break;
                case 'Trap Stone':
                    imageSrc = Stone;
                    break;
                case 'Trap Wood':
                    imageSrc = Wood;
                    break;
                case 'Trap Magma':
                    imageSrc = Magma;
                    break;
                default:
                    imageSrc = null;
            }
        }
        
        

        return (
            <button className="square" style={style}>
            {imageSrc ? (
                <Tile id={this.props.tileId}>
                    <img className='size24' src={imageSrc} />
                    <div>{this.props.textButton}</div>
                </Tile>
            ) : ""}
            
        </button>
        );
    }
}
Square.propTypes = {
    isStarted: PropTypes.bool.isRequired,
    cardType: PropTypes.string.isRequired,
    tileId: PropTypes.number.isRequired,
    textButton: PropTypes.string.isRequired,
};
class Game extends Component {
    
    static contextType = GameContext;
    constructor(props) {

        super(props);
        this.state = {
            startedSquares: [],
            squareValues: Array(squareCount * squareCount).fill(null),
            squareCardType:[],
            squaresTileId:[],
            isButtonPressed: false,
        };
        this.handleContinue = this.handleContinue.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleReady=this.handleReady.bind(this);
        
    }
    componentDidMount(){     
        console.log("hey");
            socket.on('start_Diamant', (data) => {
         
            console.log(`Колода карт: ${JSON.stringify(data)}`);
            Deck=(data.Deck.map(card => new Card(card.cardType, card.points)));
            Players = data.Players.map(player => new Player(player.id, player.roundPoints, player.allPoints, player.relics, player.nickName, player.exit));
            updatePlayerInfo();
            console.log(playersDataJS);
            this.context.setPlayersData(playersDataJS);
           
           /* socket.on('all_players_ready', (data) => {
                this.handleContinue();
            });*/
        });
        //socket.disconnect(); 
    }
    
    winWindow() {
        this.setState(()=>{
            this.context.setModalActive(true);
            this.context.setModalContent(stringWinnerAlirt());
        })
        //this.context.setModalActive(true);
        //this.context.setModalContent(stringWinnerAlirt());
        //alert(stringWinnerAlirt());
    }
    handleReadyLeave(){
        const move = "Leave";
        socket.emit('player_ready_Diamant', move);
        this.setState({ isButtonPressed: true });
  
    }
    handleReadyMoveOn(){
        const move = "MoveOn";
        socket.emit('player_ready_Diamant', move);
        this.setState({ isButtonPressed: true });
    }
    handleContinue() {
        this.setState(prevState => {
            const startedSquares = [...prevState.startedSquares];
            const squareValues = [...prevState.squareValues];
            const squareCardType = [...prevState.squareCardType];
            const squaresTileId=[...prevState.squaresTileId];
            if (startedSquares.length < squareCount * squareCount) {
                squaresTileId.push(defineTileId(currentMove+1))
                let cardType=Deck[currentMove].getСardType();
                squareCardType.push(cardType);
                startedSquares.push(true);
                if(!Deck[currentMove].getСardType().includes("Trap"))
                {
                let points = Deck[currentMove].getPoints();
                squareValues[startedSquares.length - 1] = PointCount(points);
                updatePlayerInfo()
                }
                
            }
            currentMove++;
            console.log(currentMove)
            trapsInThisRound=GetTrapsInThisRound()
            if(checkTrapDuplicates())
        {
             if(roundNum<5)
             { 
                roundNum++;
             roundData = { round: roundNum };
            console.log('Раунд.'+roundNum);
             }
             else{
                this.winWindow();
            }
            currentMove=0;
            shuffle(Deck);
            allRubyOnMap=0;
             ///Временно
             let player = Players[0];
             ////
             player.setRoundPointsToZero();
            updatePlayerInfo();
            return {
                startedSquares: [],
                squareValues: Array(squareCount * squareCount).fill(null),
                squareCardType: [],
                squaresTileId:[],
            };
        }
            return { startedSquares, squareValues,squareCardType,squaresTileId};
        }, () => {
            socket.emit('playerUpdate', /*PlayerDATA */);

            this.context.setRoundData(roundData);
            this.context.setPlayersData(playersDataJS);
            this.context.setTrapsInThisRound(trapsInThisRound);
        });
    }
    handleExit() {
        this.setState(() => {
            const squareValues = Array(squareCount * squareCount).fill(null);
            ///Временно
            let player = Players[0];
            player.setExit(true)
            ///
            let countPlayerExited=0
            Players.forEach((player) => {
                if (player.getExit()) {
                    countPlayerExited++
                }
            });
            
            let pointsPerPlayer = Math.floor(allRubyOnMap / countPlayerExited);
            let remainingPoints = allRubyOnMap;
              
            Players.forEach((player)=>{if(player.getExit())player.addRoundPoints(pointsPerPlayer)})
            remainingPoints -= pointsPerPlayer * countPlayerExited;

            for (let i = 0; i < currentMove; i++) {
                if (Deck[i].getСardType().includes("relic")&&countPlayerExited==1) player.addRelic(Deck[i]);
            }
            console.log("Реликвии: "+player.getRelic())
            allRubyOnMap = 0;
            allRubyOnMap+=remainingPoints;
            player.addAllPoints(player.getRoundPoints());
            player.setExit(true);
            updatePlayerInfo()
            if(checkPlayersExited())
            { 
                for (let i = 0; i < currentMove; i++) {
                    if (Deck[i].getСardType().includes("relic")){
                        Deck.splice(i, 1);
                        i--;
                    }
                }
                player.setExit(false)
                if(roundNum<5)
                {
               roundNum++;
            roundData = { round: roundNum };
                }
                else{
                    this.winWindow();
                    //alert(stringWinnerAlirt());
                }
           console.log('Раунд.'+roundNum);
           currentMove=0;
           shuffle(Deck);
           allRubyOnMap=0;
           
            player.setRoundPointsToZero();
           updatePlayerInfo();
           return {
              
               squareValues: Array(squareCount * squareCount).fill(null)
          
           };
            }
            return {squareValues };
        }, () => {
            socket.emit('playerUpdate', /*PlayerDATA */);
            this.context.setRoundData(roundData);
            this.context.setPlayersData(playersDataJS);
        });
    }
    renderSquare(i) {
        return (
            <Square
                key={i}
                isStarted={this.state.startedSquares[i]}
                textButton={this.state.squareValues[i]}
                cardType={this.state.squareCardType[i]}
                tileId={this.state.squaresTileId[i]}
            />
        );
    }
    render() {
        let buttonContColor = !this.state.isButtonPressed ? "rgb(90, 195, 176)" : 'grey' ;
        let squares = [];
        for (let i = 0; i < squareCount * squareCount; i++) {
            squares.push(this.renderSquare(i));
        }
        let rows = [];
        for (let i = 0; i < squareCount; i++) {
            let rowSquares = squares.slice(
                i * squareCount,
                i * squareCount + squareCount
            );
            if (i % 2 !== 0) {
                rowSquares = rowSquares.reverse();
            }
            rows.push(
                <div key={i}
                    className="board-row"
                    style={{ display: "flex" }}>
                    {rowSquares}
                </div>
            );
        }
        return (
            <div className="theAreaWithTheGame">
                <div className="scroll">
                    {rows}
                </div>
                <div className="hand">
                        <div className="theButtonPanel">
                            <Button background={buttonContColor} disabled={this.state.isButtonPressed}  padding="10px" onClick={this.handleReadyMoveOn}>
                                Продолжить
                            </Button>
                            <Button padding="10px" background={buttonContColor} onClick={this.handleReadyLeave}>
                                Выйти {allRubyOnMap}
                            </Button>
                        </div>
                </div>
                <div>
                    <Button onClick={this.handleStart}>
                        START
                    </Button>
                </div>
            </div>
        );
    }
}

export default Game;


