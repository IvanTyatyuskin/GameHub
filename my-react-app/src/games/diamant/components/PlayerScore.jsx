import React from "react";
import ImageLib from "./ImageLib";
import '../../../Components/css/dataList.css'


const PlayerScore = ({ imageIndex, nickName, score }) => {
    return (
        <div className='dataItem'>
            <ImageLib index={imageIndex} />
            <p>{nickName}</p>
            <p>{score}</p>
            <p></p>
        </div>
    )
}

export default PlayerScore;