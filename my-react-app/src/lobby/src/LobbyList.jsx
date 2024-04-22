import { useState } from 'react'
import io from 'socket.io-client';
import './index.css'
const socket = io.connect('http://localhost:3000');

function LobbyList(props) {

    let nickname=props.nickname;
    let avatar=props.avatar;
    let background=props.background;

    const PrivateChange = () => () => { 
        const isPrivateCheckbox = document.getElementById('is-private');
        const passwordField = document.getElementById('password-field');
        if (isPrivateCheckbox.checked) {
          passwordField.style.display = 'block';
        } else {
          passwordField.style.display = 'none';
        } 
    }

    const CreateLobby = () => () => { 
        const lobbyNameInput = document.getElementById('lobby-name');
        const isPrivateCheckbox = document.getElementById('is-private');
        const lobbyName = lobbyNameInput.value;
        const isPrivate = isPrivateCheckbox.checked;
        const password = isPrivate ? document.getElementById('lobby-password').value : null;
        
        socket.emit('create lobby', { nickname, avatar, background, lobbyName, isPrivate, password });
      
    }
    const JoinLobby = () => () => { 
        const lobbyNameInput = document.getElementById('lobby-name');
        const lobbyName = lobbyNameInput.value;
        
        
      socket.emit('join lobby', { nickname, avatar, background, lobbyName });
  
    }
    /*const socket = io();
    const lobbyForm = document.getElementById('lobby-form');
    const lobbyNameInput = document.getElementById('lobby-name');
    const isPrivateCheckbox = document.getElementById('is-private');
    const createLobbyButton = document.getElementById('create-lobby');
    const joinLobbyButton = document.getElementById('join-lobby');
    const leaveLobbyButton = document.getElementById('leave-lobby');
    const lobbiesDiv = document.getElementById('lobbies');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    let currentLobby = null;

    isPrivateCheckbox.addEventListener('change', () => {
      const passwordField = document.getElementById('password-field');
      if (isPrivateCheckbox.checked) {
        passwordField.style.display = 'block';
      } else {
        passwordField.style.display = 'none';
      }
    });

    createLobbyButton.addEventListener('click', (event) => {
      event.preventDefault();
      const lobbyName = lobbyNameInput.value;
      const isPrivate = isPrivateCheckbox.checked;
      const password = isPrivate ? document.getElementById('lobby-password').value : null;
      socket.emit('create lobby', { nickname: '<%= nickname %>', avatar: '<%= avatar %>', background: '<%= background %>', lobbyName, isPrivate, password });
    });

    joinLobbyButton.addEventListener('click', (event) => {
      event.preventDefault();
      const lobbyName = lobbyNameInput.value;
      socket.emit('join lobby', { nickname: '<%= nickname %>', avatar: '<%= avatar %>', background: '<%= background %>', lobbyName });
    });

    leaveLobbyButton.addEventListener('click', () => {
      socket.emit('leave lobby');
    });

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = chatInput.value;
        if (message.trim() !== '') {
            socket.emit('chat message', { lobbyName: currentLobby, message, nickname: '<%= nickname %>' });
            chatInput.value = '';
        }
    });


    socket.on('lobby list', (lobbies) => {
      lobbiesDiv.innerHTML = '';
      for (const lobby of lobbies) {
        const lobbyDiv = document.createElement('div');
        lobbyDiv.textContent = lobby.name;
        const playersDiv = document.createElement('div');
        playersDiv.textContent = lobby.players.map(player => player.nickname).join(', ');
        lobbyDiv.appendChild(playersDiv);
        lobbiesDiv.appendChild(lobbyDiv);
      }
    });

    socket.on('join lobby', (data) => {
        currentLobby = data.lobbyName;
        const lobbyChat = document.getElementById('lobby-chat');
        lobbyChat.style.display = 'block';
    });

    socket.on('leave lobby', () => {
        currentLobby = null;
        const lobbyChat = document.getElementById('lobby-chat');
        lobbyChat.style.display = 'none';
        chatMessages.innerHTML = '';
    });

    socket.on('chat message', (data) => {
      const messageElement = document.createElement('div');
      messageElement.textContent = `${data.nickname}: ${data.message}`;
      chatMessages.appendChild(messageElement);
    });*/

    return(
        <>
       <div>
        <h1 className="DisplayText">Welcome, {props.nickname}!</h1>
        <p className="DisplayText">Your avatar: {props.avatar}</p>
        <p className="DisplayText">Your background:  {props.background}</p>
      
        <h2 className="DisplayText">Lobbies</h2>
        <div id="lobbies"></div>
      
        <h2 className="DisplayText">Create or join lobby</h2>
        <form id="lobby-form">
          <label htmlFor="lobby-name" className="DisplayText">Name</label>
          <input type="text" id="lobby-name"  placeholder="Lobby name"/>
          <div id="password-field" >
            <label htmlFor="lobby-password"className="DisplayText">Password:</label>
            <input type="password" id="lobby-password"/>
          </div>
          <label id="is-private" onChange={PrivateChange() } className="DisplayText">Private lobby</label>
          <input type="checkbox" id="is-private"/>
          <button type="submit" id="create-lobby" className="DisplayText" onClick={CreateLobby()}>Create lobby</button>
          <button type="submit" id="join-lobby" className="DisplayText" onClick={JoinLobby()}>Join lobby</button>
          <button type="button" id="leave-lobby" className="DisplayText">Leave lobby</button>
        </form>
      
        <div id="lobby-chat" >
          <h2>Lobby Chat</h2>
          <div id="chat-messages"></div>
          <form id="chat-form">
            <input type="text" id="chat-input" placeholder="Type your message..."/>
            <button type="submit">Send</button>
          </form>
          </div>
          </div>
          </>
    );
  } 
  
  export default LobbyList