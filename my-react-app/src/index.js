import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Components/css/general.css'
import './Components/css/root.css'
import { SocketProvider } from './SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <SocketProvider>
        <App />
      </SocketProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

