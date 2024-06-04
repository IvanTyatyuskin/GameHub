import React, { Children, useContext, useState } from "react";
import { useCallback } from "react";


const LobbySearchPageContext = React.createContext();
export const useLobbySearchPage = () => {
    return useContext(LobbySearchPageContext)
}

export const LobbySearchPageProvider = ({children}) =>{
    const DataAboutGames = useRef({})
    const Rooms = useState([])
    const createLobbyFun = useCallback(()=>{})
    const connectToRoomFun = useCallback(()=>{})
    const canCreateLobbyCheck = useMemo(()=>{

    })
    const canConnectToRoomCheck = useMemo(()=>{

    })
    const values = {
        DataAboutGames,
        Rooms,
        Func:{
            createLobbyFun,
            canCreateLobbyCheck,
            connectToRoomFun,
            canConnectToRoomCheck
        },
    }
    return(
        <LobbySearchPageContext.Provider value={values}>
            {children}
        </LobbySearchPageContext.Provider>
    )
}

