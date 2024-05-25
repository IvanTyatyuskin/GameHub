import Header from '../Components/Header'
import styles from './lobbyPage.module.css'
import '../Components/css/section.css'
import img_playButton from './public/playbuttonimage@2x.png'
import img_makeHost from './public/makehostimage@2x.png'
import img_kickPlayer from './public/kickplayerimage@2x.png'
import { TextDataLobby } from './TextViewData.js'




export const LobbyPageView = ({
    LobbyName = "Нет имени",
    isCreator = false,
    GameName = "Нет имени",
    roomId = '---',
    usersData = [],
    inputValue="не активно", setInputValue,
    chatHistory=[],
    handleSendClick = null,
    handleInviteAPlayer = null,

    handleExit = null,
    handleSettings=null,
    handleHowToPlay=null,
    handleStart=null,

    TextContext = TextDataLobby[0]
}) => {

    const PlayerItem = ({
        Img={img_playButton}, 
        Name='player', 
        forHost = false, 
        host = false
    }) =>{
        var Options = ""
        if (forHost){
            Options =<>
                <button className={styles.SimpleButton + ' '+ styles.Icon}>
                    <img src={img_makeHost}/>
                </button>
                <button className={styles.SimpleButton + ' '+ styles.Icon}>
                    <img src={img_kickPlayer}/>
                </button>
            </> 
        }
        if (host){
            Options = <p>Хост</p>
        }
        return(
            <div className={styles.Player}>
                <div>
                    <img src={Img}/>
                    <p>{Name}</p>
                </div>
                <div>
                    {Options}
                </div>
            </div>
        )
    }
    function RoomData(){
        return(
            <div className={styles.RoomData}>
                <h1>{TextContext.LobbyName}: {LobbyName}</h1>
                <p>{TextContext.GameName}: {GameName}</p>
                <p>{roomId}</p>
            </div>
        )
    }
    const UsersList = () => {
        return(
            <>
                {usersData.map(player => (
                    <PlayerItem Img={player.img} Name={player.Name} host={player.host}/>
                ))}
            </>
        )
    }
    const ChatList = () => {
        return(
            <>
                {
                    chatHistory.map((message, index) => (
                            <p key={index}>
                                {message.sender}: {message.text}
                            </p>
                        )
                    )
                }
            </>
        )
    }
    return (
        <>
            <Header/>
            <div className='content-box height-fullscreen fix-height'>
                <div className='content-single' style={{paddingBottom: '30px'}}>
                    {RoomData()}
                    <div className={styles.MainPanel}>
                        <div className={styles.UserListPanel}>
                            <div className={styles.UserList}>
                                <UsersList/>
                                <button className={styles.ButtonAddPlayer} onClick={handleInviteAPlayer}>
                                    <p>{TextContext.InviteAPlayer}</p>
                                </button>
                            </div>
                        </div>
                        <div className={styles.chatFrame}>
                            <div className={styles.chatLog}>
                                <ChatList/>
                            </div>
                            <div id="input" className={styles.InputWithButton}>
                                <input type='text'
                                    value={inputValue} 
                                    onChange={(e) => setInputValue(e.target.value)}/>
                                <SimpleButtonLobby 
                                    handleClick={handleSendClick(inputValue)}
                                    text={TextContext.ToSend}
                                    />
                            </div>
                        </div>
                    </div>
                    <ButtonPanel
                        handleExit = {handleExit}
                        handleSettings = {handleSettings}
                        handleHowToPlay = {handleHowToPlay}
                        handleStart = {handleStart}
                        TextContext = {TextContext}
                        />
                </div>
            </div>
        </>
    )
}

export const ButtonPanel = ({
    handleExit, 
    handleSettings, 
    handleHowToPlay, 
    handleStart, 
    TextContext
}) => {
    return(
        <div className={styles.ButtonPanel}>
            <SimpleButtonLobby handleClick={handleExit} 
                text={TextContext.Exit}/>
            <SimpleButtonLobby handleClick={handleSettings} 
                text={TextContext.Settings}/>
            <LargeButtonLobby handleClick={handleHowToPlay} 
                text={TextContext.HowToPlay}/>
            <LargeButtonLobby
                    handleClick={handleStart} 
                    text={TextContext.Play}
                    img={img_playButton}
                    />
        </div>
    )
}

export const SimpleButtonLobby = ({handleClick, text = ''}) => {
    if (handleClick)
    return(
        <button className={styles.SimpleButton} onClick={handleClick}>
            {text}
        </button> 
    )
}
export const LargeButtonLobby = ({handleClick, text = '', img=null}) => {
    var style = styles.SimpleButton + " " + styles.Large;
    if (img) style += ' ' + styles.WithIcon;
    if (handleClick)
    return(
        <button className={style} onClick={handleClick}>
            {img? <img src={img_playButton} alt="" />:null}
            {text}
        </button>
    )
}


export default LobbyPageView;