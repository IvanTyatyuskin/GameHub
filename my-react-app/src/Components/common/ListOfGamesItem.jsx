import '../css/image.css'
import './ListOfGamesItem.css'
import testImg from '../../assets/react.svg'
import { Link } from 'react-router-dom';
import { ContentRenderer, GameInfo } from '../../games/DataAboutGames';


/**
 * 
 * @param {GameInfo} gameInfo 
 * @returns 
 */
export default function ListOfGamesItem({gameInfo, setContent, setActive }) {
    return (
        <div className='item'>
            <img className='size128' src={gameInfo.Image} alt="GameImage" />
            <Link to={`/${gameInfo.Name}`}>
                <div className='Name'><h1>{gameInfo.Name}</h1></div>
            </Link>
            <Link to={`/${gameInfo.Path}`}>
                <p>Список лобби</p>
            </Link>
            <div className='Description'>
                {gameInfo.Description}
                <a onClick={() => { setActive(true); 
                    setContent(<>
                    <h1>Правила {gameInfo.Name}</h1> 
                    <ContentRenderer content = {gameInfo.Rule} />
                    </>) }}>
                    Читать правила
                </a>
            </div>
            <div>
                <p>{gameInfo.onlinePlayers}</p>
                <img className='size32' src={testImg} alt="playerCount" />
            </div>
        </div>
    )
}