import React, { createContext, useState, useContext } from 'react';
import {playersDataJS,roundData,trapsInThisRound} from './Game'


export const GameContext = createContext();


export function GameProvider({ children }) {
    const [playersData, setPlayersData] = useState(playersDataJS);
    const [roundD, setRoundData] = useState(roundData);
    const [traps, setTrapsInThisRound] = useState(trapsInThisRound);

    return (
        <GameContext.Provider value={{ playersData, setPlayersData, roundD, setRoundData,traps, setTrapsInThisRound}}>
            {children}
        </GameContext.Provider>
    );
}

export function useGameContext() {
    return useContext(GameContext);
}
