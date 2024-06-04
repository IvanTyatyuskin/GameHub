import React from "react";
import image_unlocked from './public/unlocked_icon.png'
import image_locked from './public/locked_icon1.png'
import image_group2 from './public/playersnumberimg@2x.png'
import styles from './lobbySearchPage.module.css'


const LobbyItem = ({
    roomInfo,
    //onClick = ()=>{},
    connectFunc
}) =>{
    const availability = roomInfo.locked? image_locked : image_unlocked;
    var styleItem = styles.lobbyItem;
    if (connectFunc) styleItem += ' ' + styles.clickable;
    return(
        <button className={styleItem} onClick={()=>
            {
                connectFunc(roomInfo);
            }}>
            <div className={styles.lobbyIcon}>
                <img src={image_group2}/>
            </div>
            <div className={styles.lobbyname}>
                <p>{roomInfo.name}</p>
            </div>
            <div className={styles.playersnumber}>
                <p>{roomInfo.count}/{roomInfo.maxCount}</p>
            </div>
            <div className={styles.lobbyIcon}>
                <img src={availability}/>
            </div>
        </button>
    )
} 

export default LobbyItem;