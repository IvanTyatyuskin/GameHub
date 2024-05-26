import { LobbyInfoView } from "./LobbyInfoClass"

/**
 * 
 * @param {LobbyInfoView} roomInfo 
 * @returns 
 */
export const LobbyItem = ({
    roomInfo,
    onClick = ()=>{},
    connectFunc
}) =>{
    const availability = roomInfo.locked? image_locked : image_unlocked;
    var styleItem = styles.lobbyItem;
    if (onClick) styleItem += ' ' + styles.clickable;
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
export const LobbyItem1 = ({
    roomName = "Test Room",
    locked = false,
    count = '0',
    maxcount = '6',
    navigate,
    socket,
    onClick = () => joinLobby(roomName, navigate, socket),
}) => {
    var availability = image_unlocked;
    if (locked) availability = image_locked;
    var styleItem = styles.lobbyItem;
    if (onClick) styleItem += ' ' + styles.clickable;
    return (
    <button className={styleItem} onClick={() => onClick(roomName, navigate, socket)}>
        <div className={styles.lobbyIcon}>
        <img src={image_group2}/>
        </div>
        <div className={styles.lobbyname}>
        <p>{roomName}</p>
        </div>
        <div className={styles.playersnumber}>
        <p>{count}/{maxcount}</p>
        </div>
        <div class={styles.lobbyIcon}>
        <img src={availability}/>
        </div>
    </button>
    )
}

