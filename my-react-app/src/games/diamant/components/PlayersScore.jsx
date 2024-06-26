import React, { useState, useEffect } from "react";
import PlayerScore from "./PlayerScore";

const PlayersScore = ({ playerData }) => {
    //const [data, setData] = useState(playerData);

    //useEffect(() => {
    //    setData(playerData);
    //}), [playerData]

    //return (
    //    <>
    //        {data.map((player, index) => (
    //            <PlayerScore
    //                key={index}
    //                imageIndex={player.imageId}
    //                nickName={player.nickName}
    //                score={player.score}/>
    //        ))}
    //    </>
    //)

    return (
        <div className='infoList--c'>
            {playerData.map((player, index) =>
                <PlayerScore
                NickName={player.nickName}
                key={index}
                imageIndex={player.imageId}
                ruby={player.score}
                star={player.relics.length}
                   
                />
            )}
        </div>
    )
}
export default PlayersScore;