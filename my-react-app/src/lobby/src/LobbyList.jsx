import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
//Aero
import { useNavigate } from 'react-router-dom';
//
import { socket } from '../../games/ConnectionJSX';
//Aero

//
function LobbyList() {

  const [lobbies, setLobbies] = useState([]);
  const [currentLobby, setCurrentLobby] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [privateLobbies, setPrivateLobbies] = useState([]);
  const navigate = useNavigate();
  function loadChatHistory() {
    const chatHistory = localStorage.getItem('chatHistory');

    if (chatHistory) {
      const messagesDiv = document.getElementById('chat-messages');
      messagesDiv.innerHTML = chatHistory;
    }
  }

  useEffect(() => {
    const nicknameCookie = Cookies.get('nickname');
    const avatarCookie = Cookies.get('avatar');
    const backgroundCookie = Cookies.get('background');
    const currentLobbyCookie = Cookies.get('currentLobby');

    if (currentLobbyCookie) {
      setCurrentLobby(JSON.parse(currentLobbyCookie));
    }

    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv) {
      loadChatHistory();
    }

    if (nicknameCookie && avatarCookie && backgroundCookie) {
      setUserInfo({
        nickname: nicknameCookie,
        avatar: avatarCookie,
        background: backgroundCookie,
      });

      // Request lobby list from the server after user info is set
      socket.emit('get lobby list');
    }

    socket.on('lobby list', (lobbiesData) => {
      setLobbies(lobbiesData.publicLobbies);
      setPrivateLobbies(lobbiesData.privateLobbies);
    });

    socket.on('join lobby', (lobby) => {
      setCurrentLobby(lobby);
      Cookies.set('currentLobby', JSON.stringify(lobby));
    });

    socket.on('leave lobby', () => {
      setCurrentLobby(null);
      Cookies.remove('currentLobby');
    });

    socket.on('chat message', (message) => {
        const messagesDiv = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesDiv.appendChild(messageElement);

        // Сохраняем текущий чат в localStorage
        const chatMessages = document.getElementById('chat-messages');
        localStorage.setItem('chatHistory', chatMessages.innerHTML);
    });
    //Aero
    socket.on('start_game', (data,callback) => {
      navigate('/Diamant');
      callback();
    });
    //
    return () => {
      socket.off('lobby list');
      socket.off('join lobby');
      socket.off('leave lobby');
      socket.off('chat message');
    };
  }, []);

  const createLobby = (event) => {
    event.preventDefault();

    if (currentLobby) {
      leaveLobby();
    }

    const lobbyNameInput = document.getElementById('lobby-name');
    const lobbyName = lobbyNameInput.value;
    const isPrivate = document.getElementById('is-private').checked;
    const password = isPrivate ? document.getElementById('lobby-password').value : null;

    // Проверяем, существует ли лобби с таким же названием
    const existingLobby = lobbies.find((lobby) => lobby.name === lobbyName);
    const existingPrivateLobby = privateLobbies.find((lobby) => lobby.name === lobbyName);

    if (existingLobby || existingPrivateLobby) {
      alert('A lobby with this name already exists.');
      return;
    }

    socket.emit('create lobby', { ...userInfo, lobbyName, isPrivate, password });
  };
  //Aero
  const handleReady = () => {
    // Собираем данные игрока. В вашем случае это может быть информация, сохраненная в состоянии компонента.
    const playerData = {
      nickname: userInfo.nickname,
      avatar: userInfo.avatar,
      background: userInfo.background,
      // Добавьте любые другие данные, которые вы хотите отправить на сервер
    };
  
    // Отправляем событие 'player_ready' на сервер с данными игрока
    socket.emit('player_ready', playerData);
  };
  
//
  const joinLobby = (event) => {
    event.preventDefault();

    if (currentLobby) {
      leaveLobby();
    }

    const lobbyNameInput = document.getElementById('lobby-name');
    const lobbyName = lobbyNameInput.value;
    const isPrivate = document.getElementById('is-private').checked;
    const password = isPrivate ? document.getElementById('lobby-password').value : null;

    socket.emit('join lobby', { ...userInfo, lobbyName, isPrivate, password });
  };

  const leaveLobby = () => {
    if (!currentLobby) return;

    socket.emit('leave lobby', currentLobby.name);
    setCurrentLobby(null);
    Cookies.remove('currentLobby');
    localStorage.removeItem('chatHistory');
  };

  const sendChatMessage = (event) => {
    event.preventDefault();

    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value;

    if (message.trim() !== '') {
      socket.emit('chat message', { lobbyName: currentLobby.name, message, nickname: userInfo.nickname });
      chatInput.value = '';
    }
  };

  return (
    <>
      <div>
        <h1 className="DisplayText">Welcome, {userInfo.nickname}!</h1>
        <p className="DisplayText">Your avatar: {userInfo.avatar}</p>
        <p className="DisplayText">Your background: {userInfo.background}</p>

        <h2 className="DisplayText">Lobbies</h2>
        <div id="lobbies">
            {lobbies && lobbies.map((lobby) => (
                <div key={lobby.name}>
                <h3>{lobby.name}</h3>
                <p>{lobby.players.map((player) => player.nickname).join(', ')}</p>
                </div>
            ))}
            {privateLobbies && privateLobbies.map((lobby) => (
                <div key={lobby.name}>
                <h3>{lobby.name} (Private)</h3>
                <p>{lobby.players.map((player) => player.nickname).join(', ')}</p>
                </div>
            ))}
        </div>

        <h2 className="DisplayText">Create or join lobby</h2>
        <form id="lobby-form">
          <label htmlFor="lobby-name" className="DisplayText">Name</label>
          <input type="text" id="lobby-name" placeholder="Lobby name" />
          <div id="password-field">
            <label htmlFor="lobby-password" className="DisplayText">Password:</label>
            <input type="password" id="lobby-password" />
          </div>
          <label id="is-private" className="DisplayText">Private lobby</label>
          <input type="checkbox" id="is-private" />
          <button type="submit" id="create-lobby" className="DisplayText" onClick={createLobby}>Create lobby</button>
          <button type="submit" id="join-lobby" className="DisplayText" onClick={joinLobby}>Join lobby</button>
          <button type="button" id="leave-lobby" className="DisplayText" onClick={leaveLobby} disabled={!currentLobby}>Leave lobby</button>
        </form>

        {currentLobby && (
          <div id="lobby-chat">
            <h2>Lobby Chat</h2>
            <div id="chat-messages"></div>
            <form id="chat-form" onSubmit={sendChatMessage}>
              <input type="text" id="chat-input" placeholder="Type your message..." />
              <button type="submit">Send</button>
           
      <button onClick={handleReady} >Play</button>

            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default LobbyList;
