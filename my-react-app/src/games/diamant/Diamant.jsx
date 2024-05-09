import React, { useState,useEffect } from 'react'
import '../../Components/css/general.css'
import Button from '../../Components/common/button'
import '../../Components/css/game.css'
import DataList from '../../Components/common/DataList/DataList'
import PlayersScore from './components/PlayersScore'
import PlayersLootList from './components/PlayersLootList'
import { textDataToView } from './textDataToView.js'
import TrapsInThisRound from './components/TrapsInThisRound'
import Game from './Game'
import { useGameContext } from './GameContext';
import { Modal } from '../../Components/common/Modal.jsx'

import { GameProvider } from './GameContext.jsx';
export default function Diamant() {
    const textContent = textDataToView[0]

    const { playersData, setPlayersData, 
        roundD, setRoundData, 
        deck, setDeck,
        traps, setTrapsInThisRound,
        modalContent, setModalContent,
        modalActive, setModalActive
    } = useGameContext();
    
    const [now, setNow] = useState(new Date())

    useEffect(() => {
       
        
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
    
        return () => {
            clearInterval(timer);
            socket.disconnect(); // disconnect the socket
        };
    }, []);

    const WinPlayer = ({modalContent}) => {
        if (!modalContent) return(<h1>Тут искать нечего</h1>)
        return(
            <>        
                <h1>{textContent.winWindow_win} {modalContent.Nick}!</h1>
                <p>{textContent.winWindow_count}: {modalContent.count}</p>
                <p>{textContent.winWindow_relic}: {modalContent.relic}</p>
                <p>{textContent.winWindow_relicPoints}: {modalContent.relicPoints}</p>
            </>
        )
    }
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
                
                <GameProvider >{ <Game />}</GameProvider>
                <DataList heading={textContent.score}>
                    <PlayersScore playerData={playersData} />
                </DataList>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <WinPlayer modalContent={modalContent}/>
            </Modal>
        </>
    )
}
