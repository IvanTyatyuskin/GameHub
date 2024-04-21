import ImageLib from "./ImageLib"
import './transform.css'

const TileType = [
    {
        turn: '',
        index: '10'
    },
    {
        turn: 'turn90',
        index: '9'
    },
    {
        turn: 'turn180',
        index: '9'
    },
    {
        turn: '',
        index: '9'
    },
    {
        turn: 'turn270',
        index: '9'
    }
]

const Tile = ({ id = '1', children }) => {
    const tile = TileType[id]
    return (
        <div className='box-overlay'>
            <div className={tile.turn}>
                <ImageLib index={tile.index} />
            </div>
            <div className='top'>
                <div className='tile-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Tile;