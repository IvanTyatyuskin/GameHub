import '../css/image.css'
import './ListOfGamesItem.css'
import testImg from '../../assets/react.svg'
import { Link } from 'react-router-dom';

export default function ListOfGamesItem({ ImageSrc, Name,
    Description, rule, onlineCount = '0',
    JSX = null, setContent, setActive }) {
    return (
        <div className='item'>
            <img className='size128' src={ImageSrc} alt="GameImage" />
            <Link to={`/${Name}`}>
                <div className='Name'><h1>{Name}</h1></div>
            </Link>
            <div className='Description'>
                {Description}
                <a onClick={() => { setActive(true); setContent(<><h1>Правила {Name}</h1> { rule }</>) }}>
                    Читать правила
                </a>
            </div>
            <div>
                <p>{onlineCount}</p>
                <img className='size32' src={testImg} alt="playerCount" />
            </div>
        </div>
    )
}