import React from "react";
import ImageLib from "./ImageLib";
import '../../../Components/css/dataList.css'


const PlayersLoot = ({ imageIndex, ruby, star, atTheBase }) => {
    return (
        <div className={atTheBase? 'dataItem semi-transparent': 'dataItem' }>
            <ImageLib index={imageIndex} />
            <div className='dataItem'>
                <ImageLib index={4} />
                <p>x</p>
                <p>{ruby}</p>
            </div>
            <div className='dataItem'>
                <ImageLib index={5} />
                <p>x</p>
                <p>{star}</p>
            </div>
        </div>
    )
}

export default PlayersLoot;