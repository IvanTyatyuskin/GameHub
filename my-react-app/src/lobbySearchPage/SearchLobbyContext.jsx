import React, { useCallback, useContext, useState, useRef, useEffect } from "react";
import { Games } from "../games/DataAboutGames";
import { testRoomsData } from "./testData";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import { Room } from '../lobbySearchPage/testData'
import { useLogger } from "../hooks";

const SearchLobbyContext = React.createContext()

export const useSearchLobby = () =>{
    return useContext(SearchLobbyContext)
}

export const SearchLobbyProvider = ({children, 
    GameIndex = '0',
    socket = useContext(SocketContext),
    navigate = useNavigate(),
    navigateAddress = '/LobbyPage',
    Game = 'Diamant'
}) =>{
    const DataAboutGame = Games[GameIndex]
    const [Rooms, setRooms] = useState([])
    const createLobbyFunc = useCallback(()=>{
        if (canCreateLobbyCheck()){
            createLobby()
        }
    })
    const connectToRoomFunc = ()=>{
        if (canConnectToRoomCheck()){
            if (lobbyInfo.locked) 
            return joinPrivateLobby()
            return joinLobby()
        }
    }
    const canCreateLobbyCheck = () =>{
        if (roomSettings.name === '') 
            return [false, "Мне не нравятся твои поля"];
        return [true, ''];
    }
    const canConnectToRoomCheck = () =>{
        return [true, '']
    }
    const [roomSettings, setRoomSettings] = useState()
    const [lobbyInfo, setLobbyInfo] = useState()
    const [password, setPassword] = useState('');

    useLogger(roomSettings)
    useLogger(lobbyInfo)

    const createLobby = ()=>{
        socket.emit('create_lobby', 
        { 
            roomName:roomSettings.name, 
            isLocked:roomSettings.locked, 
            password:roomSettings.password,
            maxCount:roomSettings.maxCount, 
            game: Game
        });
        navigate(navigateAddress);
    }
    const joinLobby = () => {
        if (lobbyInfo.count < lobbyInfo.maxCount) {
          socket.emit('join_lobby', { roomName: lobbyInfo.name });
          navigate(navigateAddress);
        }
    };
    const joinPrivateLobby = () =>{
        if(lobbyInfo.count < lobbyInfo.maxCount){
            socket.emit('join_private_lobby', { roomName: lobbyInfo.name, password: password.toString() });
            socket.on('password_checked', () =>{
                navigate(navigateAddress);
            })
            socket.on('wrong_password', () =>{
                alert('Пароль не подошел')
            })
        }
    }

    //useEffect

    setTimeout(() => {
        if(socket){
          socket.emit('get_lobbies_list', Game);
          socket.on('lobbies_list', (lobbiesList) => {
            setRooms(convertToLobbyInfoView(lobbiesList));
          })
        }
    }, 1000);

    const values = {
        DataAboutGame,
        Rooms, setRooms,
        createLobbyFunc,
        connectToRoomFunc,
        roomSettings, setRoomSettings,
        lobbyInfo, setLobbyInfo,
        password, setPassword,
    }
    return(
        <SearchLobbyContext.Provider value={values}>
            {children}
        </SearchLobbyContext.Provider>
    )
}


export function convertToLobbyInfoView(lobbies){
    //console.log(lobbies);
    const newLobbies = lobbies.map((lobby, index)=>{
      return new Room(
        index, 
        lobby.roomName, 
        !lobby.isLocked, 
        lobby.Password || '', 
        lobby.currentCount,
        lobby.maxCount) 
    })
    //console.log(newLobbies);
    return newLobbies;
  }