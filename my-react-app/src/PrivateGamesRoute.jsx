import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { NavigationContext } from './NavigationContext';

const PrivateGamesRoute = ({ element,redirectTo }) => {
  const { hasNavigatedThroughLobby } = useContext(NavigationContext);

  return hasNavigatedThroughLobby ? element : <Navigate to={redirectTo} />;
};

export default PrivateGamesRoute;
