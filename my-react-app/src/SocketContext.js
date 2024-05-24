// SocketContext.js
import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const storedSocketID = Cookies.get('socketID');

  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
        query: {
            socketID: storedSocketID,
        },
    });

    newSocket.on('connect', () => {
      console.log('Connected to server with socketid:', newSocket.id);
      if (!storedSocketID) {
        Cookies.set('socketID', newSocket.id, { expires: 7 });
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setSocket(null);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [storedSocketID]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
