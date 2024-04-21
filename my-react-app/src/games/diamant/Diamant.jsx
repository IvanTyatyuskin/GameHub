import React, { useState,useEffect } from 'react'
import '../../Components/css/general.css'
import Button from '../../Components/common/button'
import '../../Components/css/game.css'
import DataList from '../../Components/common/DataList/DataList'
import PlayersScore from './components/PlayersScore'
import PlayersLootList from './components/PlayersLootList'
import { textData } from '../../textData.js'
import TrapsInThisRound from './components/TrapsInThisRound'
import Game from './Game'
import { useGameContext } from './GameContext';

export default function Diamant() {
    const textContent = textData[0]
    const { playersData, setPlayersData, roundD, setRoundData, traps, setTrapsInThisRound} = useGameContext();
    
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <header>
                <div className="header-box">
                    <div className="header-item-l">
                        <Button>
                            <p>{textContent.exit}</p>
                        </Button>
                        <Button>
                            <p>{textContent.rules}</p>
                        </Button>
                    </div>
                    <div className="header-item-c">
                        <h1>{textContent.round} {roundD.round}</h1>
                    </div>
                    <div className="header-item-r">
                        <p>{textContent.time}: {now.toLocaleTimeString()}</p>
                    </div>

                </div>
            </header>
            <div className="base">
                <DataList heading={textContent.informationAboutTheRound}>
                    <DataList heading={textContent.loot} type='3'>
                        <PlayersLootList playersData={playersData} />
                    </DataList>
                    <DataList heading={textContent.traps}>
                        <DataList heading={textContent.inThisRound} type='3'>
                            <TrapsInThisRound traps={traps} />
                        </DataList>
                       
                    </DataList>
                </DataList>
                <div className="theAreaWithTheGame">
                    <Game />
                   
                </div>
                <DataList heading={textContent.score}>
                    <PlayersScore playerData={playersData} />
                </DataList>
            </div>
        </>
    )
}
