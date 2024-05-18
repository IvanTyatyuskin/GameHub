import Header from '../Components/Header'
import '../Components/css/section.css'
import styles from './lobbyPage.module.css'
import { InputText } from '../Components/common/Input'
import Button from '../Components/common/button'
import img_playButton from './public/playbuttonimage@2x.png'
import img_makeHost from './public/makehostimage@2x.png'
import img_kickPlayer from './public/kickplayerimage@2x.png'
import { TestData, TestChatLog } from './TestData.js'
import { TextDataLobby } from './TextViewData.js'


export const PlayerItem = ({Img={img_playButton}, Name='player', forHost = false, host = false}) =>{
  const DataContext = TextDataLobby[0]; 
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
        Options = <p>{DataContext.Host}</p>
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


export const LobbyPage = ({
    roomName = "Название комнаты",
    GameName = "Название игры",
    roomId = "#1234",
    PlayersData = TestData,
    chatlog = TestChatLog,
    indexDictionary = 0
}) =>{
  const TextContext = TextDataLobby[indexDictionary]
    const RoomData = () => {
        return(
            <div className={styles.RoomData}>
                <h1>{roomName}</h1>
                <p>{GameName}</p>
                <p>{roomId}</p>
            </div>
        )
    }

    const UsersPanel = () => {
        return(
            <div className={styles.UserListPanel}>
                <div className={styles.UserList}>
                    {PlayersData.map(player => (
                        <PlayerItem Img={player.img} Name={player.Name} host={player.host}/>
                    ))}
                    <button className={styles.ButtonAddPlayer}>
                        <p>{TextContext.InviteAPlayer}</p>
                    </button>
                </div>
            </div>
        )
    }

    const ButtonPanel = () => {
        return(
            <div className={styles.ButtonPanel}>
                <button className={styles.SimpleButton}>
                  {TextContext.Exit}
                </button>
                <button className={styles.SimpleButton}>
                  {TextContext.Settings}
                </button>
                <button className={styles.SimpleButton}>
                  {TextContext.HowToPlay}
                </button>
                <button className={styles.SimpleButton + " " + styles.Large + ' ' + styles.WithIcon}>
                  <img src={img_playButton} alt="" />
                  {TextContext.Play}
                </button>
            </div>
        )
    }
    return (
        <>
        <Header/>
        <div className='content-box height-fullscreen fix-height'>
            <div className='content-single' style={{paddingBottom: '30px'}}>
                <RoomData/>
                <div className={styles.MainPanel}>
                    <UsersPanel/>
                    <div className={styles.chatFrame}>
                        <div className={styles.chatLog}>
                          <div>
                            {
                              chatlog.map(message => {
                                return(
                                <p>{message.User}: {message.Message}</p>
                              )})
                            }
                          </div>
                        </div>
                        <div id="input" className={styles.InputWithButton}>
                            <input type='text'/>
                            <button>
                                {TextContext.ToSend}
                            </button>
                        </div>
                    </div>
                </div>
                <ButtonPanel/>
            </div>
        </div>
        </>
    )
}
{
/*
      <div class="body">
        <div class="workingarea">
          <div class="mainarea">
            <div class="roomname">
              <div class="roomnametext">Название комнаты</div>
            </div>
            <div class="gamename">
              <div class="gamenametext">Название игры</div>
            </div>
            <div class="lobbynumber">
              <div class="roomnametext">#1234</div>
            </div>
            <div class="mainpanel">
              <div class="userlistpanel">
                <div class="userslist">


                  <div class="host">
                    <div class="hostinfo">
                      <img
                        class="hostimage-icon"
                        alt=""
                        src="./public/hostimage@2x.png"
                      />

                      <div class="hostname">
                        <div class="gamenametext">Игрок</div>
                      </div>
                    </div>
                    <div class="hostname">
                      <div class="gamenametext">Хост</div>
                    </div>
                  </div>




                    <div class="player">
                    <img
                      class="hostimage-icon"
                      alt=""
                      src="./public/playerimage@2x.png"
                    />

                    <div class="hostname">
                      <div class="gamenametext">Игрок</div>
                    </div>
                    <div class="hostactionstoplayer">
                      <button class="makehostbutton">
                        <img
                          class="makehostimage-icon"
                          alt=""
                          src="./public/makehostimage@2x.png"
                        />
                      </button>
                      <button class="makehostbutton">
                        <img
                          class="makehostimage-icon"
                          alt=""
                          src="./public/kickplayerimage@2x.png"
                        />
                      </button>
                    </div>
                  </div>
                  <div class="player">
                    <img
                      class="hostimage-icon"
                      alt=""
                      src="./public/playerimage@2x.png"
                    />

                    <div class="hostname">
                      <div class="gamenametext">Игрок</div>
                    </div>
                    <div class="hostactionstoplayer">
                      <button class="makehostbutton">
                        <img
                          class="makehostimage-icon"
                          alt=""
                          src="./public/makehostimage@2x.png"
                        />
                      </button>
                      <button class="makehostbutton">
                        <img
                          class="makehostimage-icon"
                          alt=""
                          src="./public/kickplayerimage@2x.png"
                        />
                      </button>
                    </div>
                  </div>
                  <div class="player">
                    <img
                      class="hostimage-icon"
                      alt=""
                      src="./public/playerimage@2x.png"
                    />

                    <div class="hostname">
                      <div class="gamenametext">Игрок</div>
                    </div>
                    <div class="hostactionstoplayer">
                      <button class="makehostbutton">
                        <img
                          class="makehostimage-icon"
                          alt=""
                          src="./public/makehostimage@2x.png"
                        />
                      </button>
                      <button class="makehostbutton">
                        <img
                          class="makehostimage-icon"
                          alt=""
                          src="./public/kickplayerimage@2x.png"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chatframe">
                <div class="chatlog">
                  <div class="message">
                    <div class="messagetext">
                      Игрок 1: Паста паста паста паста паста паста паста паста
                    </div>
                    <div class="messagetext">
                      Игрок 1: Паста паста паста паста паста паста паста паста
                    </div>
                  
                  </div>
                </div>
                <div class="inputmessagepanel">
                  <input
                    class="inputmessage"
                    placeholder="Отправьте сообщение"
                    type="text"
                  />

                  <button class="sendmessagebutton">
                    <div class="hostname">
                      <div class="invitetext">Отправить</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <button class="invitebutton">
              <div class="invitetext">Пригласить игрока</div>
            </button>
            <div class="actionpanel">
              <button class="exitbutton">
                <div class="exitbuttontext">Выйти</div>
              </button>
              <button class="exitbutton" id="settings-button">
                <div class="exitbuttontext">Настройки</div>
              </button>
              <button class="exitbutton" id="how-to-play-button">
                <div class="exitbuttontext">Как играть?</div>
              </button>
              <button class="playbutton">
                <img
                  class="makehostimage-icon"
                  alt=""
                  src="./public/playbuttonimage@2x.png"
                />

                <div class="hostname">
                  <div class="invitetext">Играть</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    
*/}

{/*

<div id="settings-modal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Настройки лобби</h2>
    <form>
      <label for="game-select">Выберите игру:</label>
      <select id="game-select">
        <option value="skull-and-bones">Skull and bones</option>
        <option value="diamant">Diamant</option>
      </select>

      <label for="lobby-name">Название лобби:</label>
      <input type="text" id="lobby-name" placeholder="Название комнаты"/>

      <label for="player-count">Количество игроков:</label>
      <select id="player-count">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>

      <label for="lobby-status">Статус лобби:</label>
      <select id="lobby-status">
        <option value="public">Публичное</option>
        <option value="private">Приватное</option>
      </select>

      <div class="password-block" style="display: none;">
        <label for="lobby-password">Пароль:</label>
        <input type="password" id="lobby-password" placeholder="текущий пароль"/>
      </div>

      <button type="submit">Сохранить изменения</button>
    </form>
  </div>
</div>





<div class="modal" id="how-to-play-modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Правила игр</h2>
    <ul class="tabs">
      <li><a href="#skull-and-bones">Skull and bones</a></li>
      <li><a href="#diamant">Diamant</a></li>
    </ul>
    <div class="tab-content" id="skull-and-bones">
      <p>Правила игры Skull and bones...</p>
    </div>
    <div class="tab-content" id="diamant">
      <p>Правила игры Diamant...</p>
    </div>
  </div>
</div>

*/}