import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx'
import ListOfGames from './ListOfGames'
import { GameProvider } from './games/diamant/GameContext.jsx';
import Counter from './games/skull/Counter.jsx';
<<<<<<< Updated upstream
import { RegistrationPage } from './registrationPage/RegistrationPage.jsx';
import SearchLobbyPage from './lobbySearchPage/LobbySearchPage.jsx';
import { LobbyPage } from './lobbyPage/LobbyPage.jsx';
//import {SearchLobbyPage} from './RoomSearch.jsx'
=======
import LobbyList from './lobby/src/LobbyList.jsx';
import Login from './lobby/src/Login.jsx'
>>>>>>> Stashed changes

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
        </Routes>
      </BrowserRouter>
    )
  }
  function TestContent1(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchLobbyPage/>} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
<<<<<<< Updated upstream
    <>
      {MainContent()}
    </>
    
=======
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="lobbylist" element={<LobbyList/>} />
        <Route path="Diamant" element={ <GameProvider><Diamant/></GameProvider>} />
        <Route path="Skull" element={<Counter/>} />
        <Route path="/" element={<ListOfGames/>} />
      </Routes>
    </BrowserRouter>
>>>>>>> Stashed changes
  );
}

export default App;
