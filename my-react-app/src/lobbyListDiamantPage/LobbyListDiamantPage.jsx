import image_group2 from './public/playersnumberimg@2x.png'
import image_unlocked from './public/unlocked_icon.png'
import image_locked from './public/locked_icon1.png'
import Header from '../Components/Header'

import styles from './lobbySearchPage.module.css'
import '../Components/css/image.css'
import '../Components/css/section.css'

import { Games } from '../games/DataAboutGames'
import { Input3, InputText2 } from '../Components/common/Input'
import Button from '../Components/common/button'
import { Modal } from '../Components/common/Modal'
import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const createLobby = (roomName, isLocked, maxCount, nickname, navigate) => {
  socket.emit('create_lobby', { roomName, isLocked, maxCount, nickname });
  navigate('/LobbyPage');
};

const joinLobby = (roomName, nickname, navigate) => {
  socket.emit('join_lobby', { roomName, nickname });
  navigate('/LobbyPage');
};

export const LobbyItem = ({
  roomName = "Test Room",
  locked = false,
  count = '0',
  maxcount = '6',
  navigate,
  onClick = () => joinLobby(roomName, Cookies.get('nickname'), navigate),
}) => {
  var availability = image_unlocked;
  if (locked) availability = image_locked;
  var styleItem = styles.lobbyItem;
  if (onClick) styleItem += ' ' + styles.clickable;
  return (
    <button className={styleItem} onClick={() => onClick(roomName, Cookies.get('nickname'), navigate)}>
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

export const CreateLobbyModal = ({ maxPlayers = '5', minPlayers = '3', navigate }) => {
  const playersOptions = Array.from({ length: maxPlayers - minPlayers + 1 },
    (_, i) => i + parseInt(minPlayers));

  const handleCreateClick = () => {
    const roomName = document.querySelector('input[name="roomName"]').value;
    const isLocked = document.querySelector('input[name="isLocked"]').checked;
    const maxCount = document.querySelector('select[name="maxCount"]').value;
    createLobby(roomName, isLocked, maxCount, Cookies.get('nickname'), navigate);
  };

  return (
    <>
      <div className={styles.createLobbyModal}>
        <InputText2 labelText='Название лобби' name='roomName'/>
        <InputText2 labelText='Пароль' name='password'/>
        <div className={styles.checkBox}>
          <img src={image_unlocked} className='size32'/>
          <input type='checkbox' id="switch" name='isLocked'/>
          <label htmlFor='switch'/>
          <img src={image_locked} className='size32'/>
        </div>
        <div className={styles.enternumber}>
          <img src={image_group2} className='size32'/>
          <select class="enternumber" name='maxCount'>
            {playersOptions.map(option => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        <Button onClick={handleCreateClick}>
          <p>Создать</p>
        </Button>
      </div>
    </>
  )
}

const LobbyListDiamantPage = ({
  GameIndex = "0"
}) => {
  const DataAboutGame = Games[GameIndex];
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const [lobbies, setLobbies] = useState([]);
  const isLobbiesLoaded = useRef(false);

  useEffect(() => {
    if (!isLobbiesLoaded.current) {
      socket.emit('get_lobbies_list');
      isLobbiesLoaded.current = true;
    }

    socket.on('lobbies_list', (lobbiesList) => {
      setLobbies(lobbiesList);
    });

    return () => {
      socket.off('lobbies_list');
    };
  }, []);

  return (
    <>
      <Header/>
      <div className='content-box height-fullscreen fix-height'>
        <div className='content-single horizontal'>
          <div className={styles.box_info}>
            <h1>{DataAboutGame.Name}</h1>
            <img src={DataAboutGame.Image}/>
            <p>{DataAboutGame.Description}</p>
          </div>
          <div className={styles.box_lobbyList}>
            <h1>Список доступных лобби</h1>
            <div className={styles.search_block}>
              <InputText2 labelText="Название комнаты"/>
              <Button>
                <p>Случайная игра</p>
              </Button>
              <Button onClick={() => { setModalActive(true); }}>
                <p>Создать лобби</p>
              </Button>
            </div>

            <div className={styles.lobbyList}>
              {lobbies.map((lobby, index) => (
                <LobbyItem
                  key={index}
                  roomName={lobby.roomName}
                  locked={lobby.isLocked}
                  count={lobby.currentCount}
                  maxcount={lobby.maxCount}
                  navigate={navigate}
                  onClick={() => joinLobby(lobby.roomName, Cookies.get('nickname'), navigate)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <CreateLobbyModal maxPlayers={DataAboutGame.MaxPlayers} minPlayers={DataAboutGame.MinPlayers} navigate={navigate} />
      </Modal>
    </>
  )
}

export default LobbyListDiamantPage;
