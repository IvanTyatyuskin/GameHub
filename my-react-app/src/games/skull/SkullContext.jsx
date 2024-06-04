import React, { useState, useContext } from "react";
import { useInput } from "../../Components/CustomHooks";

const SkullContext = React.createContext()
export const useSkull = () => {
    return useContext(SkullContext)
}

export const SkullProvider = ({children}) => {
    const betInput = useInput('')
    const Deck = useState([])
    const ThisPlayer = useState([])
    const PlayersView = useState([])
    const values = {
        betInput,
        Deck,
        ThisPlayer,
        PlayersView,
    }
    return (
        <SkullContext.Provider value={values}>
            {children}
        </SkullContext.Provider>
    )
}