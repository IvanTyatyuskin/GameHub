import React, { useState } from 'react'
import '../../Components/css/general.css'
import Button from '../../Components/common/button'
import '../../Components/css/game.css'
import DataList from '../../Components/common/DataList/DataList'
import PlayersScore from './components/PlayersScore'
import PlayersLootList from './components/PlayersLootList'
import { textData } from '../../textData.js'
import TrapsInThisRound from './components/TrapsInThisRound'
import TrapsInThisDeck from './components/TrapsLeftInTheDeck'
import { playersDataJS, playersDataJS2, roundData, trapsInThisRound, trapsInDeck } from './GameData'
import Game from './Game'
import '../../Components/css/header.css'
import {Modal} from '../../Components/common/Modal'

export default function Diamant() {
    const textContent = textData[0]
    const [playersData, setPlayersData] = useState(playersDataJS);
    const togglePlayersData = () => {
        if (playersData == playersDataJS) { setPlayersData(playersDataJS2) }
        else { setPlayersData(playersDataJS) }
    }
    const Win = () => {
        setModalContent(WinWindow(playersData));
        setModalActive(true);
    }

    const [now, setNow] = useState(new Date())

    setInterval(() => setNow(new Date()), 1000)

    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState(<h1>Заголовок</h1>);

    return (
        <>
            <header>
                <div className="header-box">
                    <div className="header-item-l">
                        <Button>
                            <p>{textContent.exit}</p>
                        </Button>
                        <Button onClick={togglePlayersData}>
                            <p>{textContent.rules}</p>
                        </Button>
                        <Button onClick={Win}>
                            <p>Победа</p>
                        </Button>
                    </div>
                    <div className="header-item-c">
                        <h1>{textContent.round} {roundData.round}</h1>
                    </div>
                    <div className="header-item-r">
                        <p>{textContent.time}: {now.toLocaleTimeString()} {roundData.time}</p>
                    </div>

                </div>
            </header>
            <div className="base">
                <Modal active={modalActive} setActive={setModalActive}>
                    {modalContent}
                </Modal>

                <DataList heading={textContent.informationAboutTheRound}>
                    <DataList heading={textContent.loot} type='3'>
                        <PlayersLootList playersData={playersData} />
                    </DataList>
                    <DataList heading={textContent.traps}>
                        <DataList heading={textContent.inThisRound} type='3'>
                            <TrapsInThisRound traps={trapsInThisRound} />
                        </DataList>
                        <DataList heading={textContent.leftInTheDeck} type='3'>
                            <TrapsInThisDeck traps={trapsInDeck} />
                        </DataList>
                    </DataList>
                </DataList>
                <div className="theAreaWithTheGame">
                    <Game />
                    <div className="hand">
                        <div className="theButtonPanel">
                            <Button background="rgb(90, 195, 176)" padding="10px">
                                <p>{textContent.continue}</p>
                            </Button>
                            <Button padding="10px" background="rgb(234, 68, 90)">
                                <p>{textContent.toReturn}</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <DataList heading={textContent.score}>
                    <PlayersScore playerData={playersData} />
                </DataList>
            </div>
        </>
    )
}

function WinWindow(playersData) {
    const winner = playersData[0].nickName
    const content = <>
        <h1>Победа игрока {winner}</h1>
        <ol>
            {playersData.Map(player => <li>
                {player.nickName}
                {player.score}
            </li>)}
        </ol>
    </>
    return content;
}
