import React, { useState, useEffect, useContext } from 'react';
//import React, { Component, useContext} from "react";
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
import { SocketContext } from '../../SocketContext'


let totalPlayersCount=0
const squareCount = 6;
let roundNum=1;
let currentMove=0;
export let Deck=[]; 
let RelicDeck=[];
let allRubyOnMap=0;
class Player {
    constructor(socketID,id, roundPoints, allPoints, relics, nickName,exit) {
        this.socketID=socketID;
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
let Player0=null;
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
            if(relic)
                {
                    relicPoints+=relic.points
                }
        })
        points+=relicPoints
        if (points >= maxPoints) {
            maxPoints = points;
            winner = player;
        }
    });

    return winner;
}
function stringWinnerAlirt(){
    let winner = determiningWinner();
    let relicPoints=0
    if(!winner) return;
    winner.getRelic().forEach(relic=>{
        relicPoints+=relic.points
    })

    const Winner = {
        Nick: winner.getNickName(),
        count: winner.getallPoints(),
        relic: winner.getRelic().length,
        relicPoints: relicPoints
    }

    return Winner;
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
    let pointsPerPlayer = Math.floor(points / 2 / (Players.length));
    let remainingPoints = points;
    if (pointsPerPlayer === 0) {
        allRubyOnMap+=points;
        return remainingPoints
    }

    Players.filter(player => player.exit === false).forEach((player) => player.addRoundPoints(pointsPerPlayer));
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


function Game() {
    const socket = useContext(SocketContext);
    
    const game = useContext(GameContext);

    const [startedSquares, setStartedSquares] = useState([]);
    const [squareValues, setSquareValues] = useState([]);
    const [squareCardType, setSquareCardType] = useState([]);
    const [squaresTileId, setSquaresTileId] = useState([]);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
   
    useEffect(() => {
        if (!socket) {
            console.error("Socket not available");
            return;
        }
        socket.emit("Diamant_begin");
        socket.on('start_Diamant', (data) => {
            roundNum=1;
            roundData = { round: roundNum };
            allRubyOnMap=0;
            Deck=(data.Deck.map(card => new Card(card.cardType, card.points)));
            Players = data.Players.map(player => new Player(player.socketID,player.id, player.roundPoints, player.allPoints, player.relics, player.nickName, player.exit));
            Player0 = Players.find(player => player.id === data.User.id);
            updatePlayerInfo();
            totalPlayersCount=playersDataJS.length
            game.setRoundData(roundData)
            game.setPlayersData(playersDataJS);
            return () => {
                socket.off('start_Diamant');
            };
        });
    }, []);
    const winWindow = () => {
        game.setModalActive(true);
        game.setModalContent(stringWinnerAlirt());
    };
    
    const handleReadyLeave = () => {
        if (isButtonPressed) {
            return;
          }

        const move = "Leave";
        socket.emit('player_ready_Diamant', {Move:move,ExitPlayers:Players.filter(player => player.exit === true)});
        setIsButtonPressed(true);
    };

    
    const handleReadyMoveOn = () => {
        if (isButtonPressed) {
            return;
          }
        const move = "MoveOn";
        socket.emit('player_ready_Diamant', {Move:move,ExitPlayers:Players.filter(player => player.exit === true)});
        setIsButtonPressed(true);
    };
    const handleContinue = () => {
        if (startedSquares.length < squareCount * squareCount) {
            const newTileId = defineTileId(currentMove + 1);
            const newCardType = Deck[currentMove].getСardType();
            const points = Deck[currentMove].getPoints();

            let calculatedPoints = null;
            if (!newCardType.includes("Trap")) {
                calculatedPoints = PointCount(points);
            }

            setSquaresTileId(prevSquaresTileId => [...prevSquaresTileId, newTileId]);
            setSquareCardType(prevSquareCardType => [...prevSquareCardType, newCardType]);
            setStartedSquares(prevStartedSquares => [...prevStartedSquares, true]);
            setSquareValues(prevSquareValues => {
                const newSquareValues = [...prevSquareValues];
                newSquareValues[startedSquares.length] = calculatedPoints;
                return newSquareValues;
            });

            if (calculatedPoints !== null) {
                updatePlayerInfo();
            }

            currentMove++;
            trapsInThisRound = GetTrapsInThisRound();

            if (checkTrapDuplicates()) {
                console.log("Все вышли")
           
                Players.find(player => player.id === Player0.id).setExit(false);
                
                
                console.log('Раунд.'+roundNum);
                currentMove=0;
                socket.emit('shuffle_Diamant',roundNum);
                    socket.on("Diamant_shuffled",(data)=>{
                        Deck=(data.Deck.map(card => new Card(card.cardType, card.points)));
                    })
                    Players.find(player => player.id === Player0.id).setRoundPointsToZero();
                    Players.find(player => player.id === Player0.id).setExit(false)
                updatePlayerInfo();
                setStartedSquares([]);
                
                setSquareCardType([]);
                setSquaresTileId([]);
                setIsButtonPressed(false);
                socket.emit("Update_Players_Data_Diamant",{currentPlayer: Players.find(player => player.id === Player0.id)})
                if(roundNum<=5) {
                    roundNum++;
                    roundData = { round: roundNum };
                } 
                return;
                
             
            }

            game.setRoundData(roundData);
            game.setPlayersData(playersDataJS);
            game.setTrapsInThisRound(trapsInThisRound);
            if(!Players.find(player => player.id === Player0.id).getExit())
                {
                    setIsButtonPressed(false);
                }
            
        }
    };
    
    
    const handleExit = (LeaveCount) => {
        let countPlayerExited=LeaveCount;
        let pointsPerPlayer = Math.floor(allRubyOnMap / countPlayerExited);
        let remainingPoints = allRubyOnMap;
        Players.find(player => player.id === Player0.id).addRoundPoints(pointsPerPlayer);
       
        remainingPoints -= pointsPerPlayer * countPlayerExited;
        for (let i = 0; i < currentMove; i++) {
            if (Deck[i].getСardType().includes("relic") && countPlayerExited==1) Players.find(player => player.id === Player0.id).addRelic(Deck[i]);
        }
        //console.log("Реликвии: "+Players.find(player => player.id === Player0.id).getRelic());
        allRubyOnMap = 0;
        allRubyOnMap += remainingPoints;
        Players.find(player => player.id === Player0.id).addAllPoints(Players.find(player => player.id === Player0.id).getRoundPoints());
        Players.find(player => player.id === Player0.id).setRoundPointsToZero();
        allRubyOnMap=0;
        updatePlayerInfo();
        for (let i = 0; i < currentMove; i++) {
            if (Deck[i].getСardType().includes("relic")) {
                Deck.splice(i, 1);
                i--;
            }
        }
        if(LeaveCount==(totalPlayersCount-Players.filter(player => player.exit === true).length)) { 
            console.log("Все вышли")
           
            Players.find(player => player.id === Player0.id).setExit(false);
            
            
            console.log('Раунд.'+roundNum);
            currentMove=0;
            socket.emit('shuffle_Diamant',roundNum);
                socket.on("Diamant_shuffled",(data)=>{
                    Deck=(data.Deck.map(card => new Card(card.cardType, card.points)));
                })
           
            updatePlayerInfo();
            setStartedSquares([]);
            
            setSquareCardType([]);
            setSquaresTileId([]);
            setIsButtonPressed(false);
            socket.emit("Update_Players_Data_Diamant",{currentPlayer: Players.find(player => player.id === Player0.id)})
            if(roundNum<=5) {
                roundNum++;
                roundData = { round: roundNum };
            } 
            return;
        }
        Players.find(player => player.id === Player0.id).setExit(true)
        ///
        socket.emit("Update_Players_Data_Diamant",{currentPlayer: Players.find(player => player.id === Player0.id)})
        //Players=[]
        ///
    }
    
    useEffect(() => {
        const handleAllPlayersReady = (data) => {
            if (Array.isArray(data.action)) {
                const leaveActions = data.action.filter(action => action === "Leave"||action === "Exit");
                const otherActions = data.action.filter(action => action !== "Leave"&&action != "Exit");
              
                leaveActions.forEach(action => {
                  if (action === "Leave") {
                    console.log(roundNum+" Уходим");
                    handleExit(data.leaveCount);
                  }
                  if(action ==="Exit"){
                    if(data.leaveCount==(totalPlayersCount-Players.filter(player => player.exit === true).length)) { 
                        console.log(roundNum+" Все вышли")
                       
                        Players.find(player => player.id === Player0.id).setExit(false);
                        
                      
                        console.log('Раунд.'+roundNum);
                        currentMove=0;
                        socket.emit('shuffle_Diamant',roundNum);
                            socket.on("Diamant_shuffled",(data)=>{
                                Deck=(data.Deck.map(card => new Card(card.cardType, card.points)));
                            })
                        Players.find(player => player.id === Player0.id).setExit(false)
                        updatePlayerInfo();
                        setStartedSquares([]);
                        
                        setSquareCardType([]);
                        setSquaresTileId([]);
                        setIsButtonPressed(false);
                        socket.emit("Update_Players_Data_Diamant",{currentPlayer: Players.find(player => player.id === Player0.id)})
                        if(roundNum<=5) {
                            roundNum++;
                            roundData = { round: roundNum };
                        } 
                    }
                  }
                });
                setTimeout(() => {
                    otherActions.forEach(action => {
                        if (action === "MoveOn") {
                          console.log(roundNum+" Продолжаем");
                          handleContinue();
                        }
                    
                      });
                    console.log("Выполнение кода после задержки в 3 секунды");
                }, 500);
              
              }
              else{
                if(action ==="Exit"){
                    if(LeaveCount==(totalPlayersCount-Players.filter(player => player.exit === true).length)) { 
                        console.log(roundNum+" Exit")
                       
                        Players.find(player => player.id === Player0.id).setExit(false);
                        
                       
                        console.log('Раунд.'+roundNum);
                        currentMove=0;
                        socket.emit('shuffle_Diamant',roundNum);
                            socket.on("Diamant_shuffled",(data)=>{
                                Deck=(data.Deck.map(card => new Card(card.cardType, card.points)));
                            })
                       
                        updatePlayerInfo();
                        setStartedSquares([]);
                        
                        setSquareCardType([]);
                        setSquaresTileId([]);
                        setIsButtonPressed(false);
                        socket.emit("Update_Players_Data_Diamant",{currentPlayer: Players.find(player => player.id === Player0.id)})
                        if(roundNum<=5) {
                            roundNum++;
                            roundData = { round: roundNum };
                        } 
                    }
                  }
                if (data.action === "MoveOn") {
                  console.log(roundNum+" Продолжаем");
                  handleContinue();
                }
                if (data.action === "Leave") {
                  console.log(roundNum+" Уходим");
                  
                  handleExit(data.leaveCount);
                }
                
             
          }
        };
      
        socket.on("PlayersDataDiamantUpdated", (data) => {

          const playerIndex = Players.findIndex(player => player.socketID === data.uniquePlayer.socketID);

    if (playerIndex !== -1) {
        // Update the existing player's data
        Players[playerIndex].id = data.uniquePlayer.id;
        Players[playerIndex].roundPoints = data.uniquePlayer.roundPoints;
        Players[playerIndex].allPoints = data.uniquePlayer.allPoints;
        Players[playerIndex].relics = data.uniquePlayer.relics;
        Players[playerIndex].nickName = data.uniquePlayer.nickName;
        Players[playerIndex].exit = data.uniquePlayer.exit;
    }
          if(roundNum>5) {
            winWindow();
            //alert(stringWinnerAlirt());
        }
         
        
          allRubyOnMap=0;
         updatePlayerInfo();
         game.setRoundData(roundData);
         game.setPlayersData(playersDataJS);
         setSquareValues([]);
        });
      
        socket.on('all_players_ready_Diamant', handleAllPlayersReady);
      
        return () => {
          socket.off('all_players_ready_Diamant', handleAllPlayersReady);
          socket.off("PlayersDataDiamantUpdated");
        };
      }, [handleContinue, handleExit]);
const renderSquare = (i) => {
        return (
            <Square
                key={i}
                isStarted={startedSquares[i]}
                textButton={squareValues[i]}
                cardType={squareCardType[i]}
                tileId={squaresTileId[i]}
            />
        );
    };

    
    const buttonMoveOnContColor = !isButtonPressed ? "rgb(90, 195, 176)" : 'grey' ;
    const buttonLeaveContColor = !isButtonPressed ? "rgb(178, 34, 34)" : 'grey' ;
    let squares = [];
    for (let i = 0; i < squareCount * squareCount; i++) {
        
        squares.push(renderSquare(i));
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
                    <Button background={buttonMoveOnContColor}  disabled={isButtonPressed} padding="10px" onClick={handleReadyMoveOn}>
                        Продолжить
                    </Button>
                    <Button padding="10px" background={buttonLeaveContColor} disabled={isButtonPressed} onClick={handleReadyLeave}>
                        Выйти {allRubyOnMap}
                    </Button>
                </div>
            </div>
            <div>
                <Button>
                    START
                </Button>
            </div>
        </div>
    );
}

export default Game;