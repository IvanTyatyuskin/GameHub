import React, { createContext, useState } from 'react';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [hasNavigatedThroughLobby, setHasNavigatedThroughLobby] = useState(false);

  return (
    <NavigationContext.Provider value={{ hasNavigatedThroughLobby, setHasNavigatedThroughLobby }}>
      {children}
    </NavigationContext.Provider>
  );
};
