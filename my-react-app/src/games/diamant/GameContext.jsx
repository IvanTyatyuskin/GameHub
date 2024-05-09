import React, { createContext, useState, useContext } from 'react';
import {playersDataJS,roundData,trapsInThisRound,Deck} from './Game.jsx'


export const GameContext = createContext();


export function GameProvider({ children }) {
    const [playersData, setPlayersData] = useState(playersDataJS);
    const [roundD, setRoundData] = useState(roundData);
    const [deck, setDeck] = useState(Deck);
    const [traps, setTrapsInThisRound] = useState(trapsInThisRound);
    const [modalContent, setModalContent] = useState(<h1>Text</h1>);
    const [modalActive, setModalActive] = useState(false);

    return (
        <GameContext.Provider value={{ playersData, setPlayersData, 
        roundD, setRoundData,
        deck, setDeck,
        traps, setTrapsInThisRound,
        modalActive, setModalActive, 
        modalContent, setModalContent
        }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGameContext() {
    return useContext(GameContext);
}
