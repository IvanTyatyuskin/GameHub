import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx'
import ListOfGames from './ListOfGames'
import { GameProvider } from './games/diamant/GameContext.jsx';
import Counter from './games/skull/Counter.jsx';
import { RegistrationPage } from './registrationPage/RegistrationPage.jsx';
import { LobbyPage } from './lobbyPage/LobbyPage.jsx';
//import {SearchLobbyPage} from './RoomSearch.jsx'
import SearchLobbyPage from './lobbySearchPage/LobbySearchPage.jsx';
import LobbyListSkullPage from './lobbyListSkullPage/LobbyListSkullPage.jsx';
import LobbyListDiamantPage from './lobbyListDiamantPage/LobbyListDiamantPage.jsx';
import LobbyListTicTacToePage from './lobbyListTicTacToePage/LobbyListTicTacToePage.jsx';
import TicTacToe from './games/tictactoe/TicTacToe.jsx'
//import LobbyList from './lobby/src/LobbyList.jsx'
import Login from './lobby/src/Login.jsx'

function App() {
  function MainContent(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="Diamant" element={ <GameProvider><Diamant/></GameProvider>} />
          <Route path="Skull" element={<Counter/>} />
          <Route path="TicTacToe" element={<TicTacToe/>} />
          <Route path="ListOfGames" element={<ListOfGames/>} />
          <Route path="/" element={<RegistrationPage/>} />
          <Route path="LobbyPage" element={<LobbyPage/>} />
          <Route path="login" element={<Login/>} />
          <Route path="lobbylist" element={<SearchLobbyPage/>} />
          <Route path="lobbyListSkull" element={<LobbyListSkullPage/>} />
          <Route path="lobbyListDiamant" element={<LobbyListDiamantPage/>} />
          <Route path="lobbyListTicTacToe" element={<LobbyListTicTacToePage/>} />
        </Routes>
      </BrowserRouter>
    )
  }
  
  return (
    <>
      {MainContent()}
    </>
  );
}

export default App;
