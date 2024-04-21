import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
//import './index.css'
//import Diamant from './games/diamant/Diamant'
//import { Board } from './games/diamant/app'
import ListOfGames from './ListOfGames'
import './Components/css/general.css'
import './Components/css/root.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ListOfGames/>,
//    <Diamant/>,
)
