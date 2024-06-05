import React from "react";
import ImageLib from "./ImageLib";
import '../../../Components/css/dataList.css'


const PlayersLoot = ({ imageIndex, ruby, atTheBase,NickName }) => {
    return (
        <div className={atTheBase? 'dataItem semi-transparent': 'dataItem' }>        
            <ImageLib index={imageIndex} />
            <p>{NickName}</p>
            <div className='dataItem'>
                <ImageLib index={4} />
                <p>x</p>
                <p>{ruby}</p>
            </div>
            
        </div>
    )
}

export default PlayersLoot;