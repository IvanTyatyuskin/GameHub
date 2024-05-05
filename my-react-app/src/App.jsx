import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx'
import ListOfGames from './ListOfGames'
import { GameProvider } from './games/diamant/GameContext.jsx';
import Counter from './games/skull/Counter.jsx';
import { RegistrationPage } from './registrationPage/RegistrationPage.jsx';
import SearchLobbyPage from './lobbySearchPage/LobbySearchPage.jsx';
import { LobbyPage } from './lobbyPage/LobbyPage.jsx';
//import {SearchLobbyPage} from './RoomSearch.jsx'
import LobbyList from './lobby/src/LobbyList.jsx';
import Login from './lobby/src/Login.jsx'

function App() {
  function MainContent(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="Diamant" element={ <GameProvider><Diamant/></GameProvider>} />
          <Route path="Skull" element={<Counter/>} />
          <Route path="/" element={<ListOfGames/>} />
          <Route path="RegistrationPage" element={<RegistrationPage/>} />
          <Route path="SearchLobbyPage" element={<SearchLobbyPage/>} />
          <Route path="LobbyPage" element={<LobbyPage/>} />
          <Route path="login" element={<Login/>} />
          <Route path="lobbylist" element={<LobbyList/>} />
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
