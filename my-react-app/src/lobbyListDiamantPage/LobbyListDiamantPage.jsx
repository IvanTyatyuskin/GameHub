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
import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import { CreateLobbyModal, CreateLobbyModal1, ConnectToRoomModal } from '../lobbySearchPage/ModalWindows'
import { useCreateLobbyInput } from '../hooks'
import { LobbyInfoView, testRoomsData } from '../lobbySearchPage/LobbyInfoClass'
import { LobbyItem } from '../lobbySearchPage/LobbyItem'
import SearchLobbyPage from '../lobbySearchPage/LobbySearchPage'


export function convertToLobbyInfoView(lobbies){
  //console.log(lobbies);
  const newLobbies = lobbies.map((lobby, index)=>{
    return new LobbyInfoView(
      index, 
      lobby.roomName, 
      lobby.isLocked, 
      lobby.Password || '', 
      lobby.currentCount,
      lobby.maxCount)    
  })
  //console.log(newLobbies);
  return newLobbies;
}

const LobbyListDiamantPage = ({
  GameIndex = "0"
}) => {
  const socket = useContext(SocketContext);
  const DataAboutGame = Games[GameIndex];
  const navigate = useNavigate();
  const [lobbies, setLobbies] = useState(testRoomsData);
  const isLobbiesLoaded = useRef(false);
  const navigateAddress = `/lobbyPage/Diamant`

  /**
   * 
   * @param {LobbyInfoView} lobbyInfo
   */
  const createLobby = (lobbyInfo) => {
      const roomName = lobbyInfo.name;
      const isLocked = lobbyInfo.locked;
      const maxCount = lobbyInfo.maxCount;
      const password = lobbyInfo.password;
    if (socket) {
      socket.emit('create_lobby', { roomName, isLocked, maxCount });
      navigate(navigateAddress);
    } else {
      console.error('Socket is not connected');
    }
  };
  /**
   * 
   * @param {LobbyInfoView} lobbyInfo
   */
  const canCreateLobby = (lobbyInfo) =>{
    if (lobbyInfo.name.trim() === '') return [false, "Мне не нравятся твои поля"];
    return [true, ''];
  };

  /**
   * 
   * @param {LobbyInfoView} lobbyInfo 
   */
  function joinLobby(lobbyInfo) {
    const Name = lobbyInfo.name
    //логика подключения если комната публичная пароль игнорируем
    socket.emit('join_lobby', {Name});
    navigate(navigateAddress);
  }
  /**
   * 
   * @param {LobbyInfoView} lobbyInfo 
   * @param {*} password 
   */
  const canJoinLobby = (lobbyInfo, password) =>{
    return [true, "Мне не нравятся твои поля"];
  }

  setTimeout(() => {
    if(socket){
      socket.emit('get_lobbies_list');
      socket.on('lobbies_list', (lobbiesList) => {
        const convertedLobbies = convertToLobbyInfoView(lobbiesList);
        setLobbies(convertedLobbies);
      })
    }
  }, 1000);

  //useEffect(() => {
  //  if (socket) {
  //    socket.emit('get_lobbies_list');
  //    socket.on('lobbies_list', (lobbiesList) => {
  //      const convertedLobbies = convertToLobbyInfoView(lobbiesList);
  //      setLobbies(convertedLobbies);
  //    });
  //
  //    // Очистка события сокета при размонтировании компонента
  //    return () => {
  //      socket.off('lobbies_list');
  //    };
  //  }
  //}, [socket]);

  return(
    <SearchLobbyPage
      DataAboutGame = {DataAboutGame}
      Rooms = {lobbies}
      createLobbyFun = {createLobby}
      connectToRoomFun = {joinLobby}
      canCreateLobbyCheck = {canCreateLobby}
      canConnectToRoomCheck = {canJoinLobby}
      />
  )
}

export default LobbyListDiamantPage;
