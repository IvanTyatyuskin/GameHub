import { LobbyInfoView } from "./LobbyInfoClass";
import image_unlocked from './public/unlocked_icon.png'
import image_locked from './public/locked_icon1.png'
import image_group2 from './public/playersnumberimg@2x.png'
import styles from './lobbySearchPage.module.css'

/**
 * 
 * @param {LobbyInfoView} roomInfo 
 * @returns 
 */
export const LobbyItem = ({
    id = 0,
    name = "Test Room",
    locked = false,
    password = '',
    count = '0',
    maxCount = '6',
    roomInfo = new LobbyInfoView(id, name, locked, password, count, maxCount),
    onClick = ()=>{}
}) =>{
    const availability = roomInfo.locked? image_locked : image_unlocked;
    var styleItem = styles.lobbyItem;
    if (onClick) styleItem += ' ' + styles.clickable;
    return(
        <button className={styleItem} onClick={()=>{onClick(roomInfo)}}>
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
