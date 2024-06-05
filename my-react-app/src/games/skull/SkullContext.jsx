import React, { useState, createContext, useContext } from 'react';

const SkullContext = createContext();

export const SkullProvider = ({ children }) => {
  const [thisPlayer, setThisPlayer] = useState([]);
  const [playersView, setPlayersView] = useState([]);

  return (
    <SkullContext.Provider value={{ 
        thisPlayer, setThisPlayer, 
        playersView, setPlayersView
    }}>
      {children}
    </SkullContext.Provider>
  );
};

export const useSkull = () => useContext(SkullContext);
