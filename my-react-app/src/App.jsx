import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx';
import ListOfGames from './ListOfGames';
import { GameProvider } from './games/diamant/GameContext.jsx';
import Counter from './games/skull/Counter.jsx';
import { RegistrationPage } from './registrationPage/RegistrationPage.jsx';
import { LobbyPage } from './lobbyPage/LobbyPage.jsx';
import SearchLobbyPage from './lobbySearchPage/LobbySearchPage.jsx';
import LobbyListSkullPage from './lobbyListSkullPage/LobbyListSkullPage.jsx';
import LobbyListDiamantPage from './lobbyListDiamantPage/LobbyListDiamantPage.jsx';
import LobbyListTicTacToePage from './lobbyListTicTacToePage/LobbyListTicTacToePage.jsx';
import TicTacToe from './games/tictactoe/TicTacToe.jsx';
import Login from './lobby/src/Login.jsx';
import PrivateRoute from './PrivateRoute';  // Импортируем созданный компонент

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="login" element={<Login />} />
        <Route path="ListOfGames" element={<PrivateRoute element={<ListOfGames />} />} />
        <Route path="Diamant" element={<PrivateRoute element={<GameProvider><Diamant /></GameProvider>} />} />
        <Route path="Skull" element={<PrivateRoute element={<Counter />} />} />
        <Route path="TicTacToe" element={<PrivateRoute element={<TicTacToe />} />} />
        <Route path="LobbyPage" element={<PrivateRoute element={<LobbyPage />} />} />
        <Route path="lobbylist" element={<PrivateRoute element={<SearchLobbyPage />} />} />
        <Route path="lobbyListSkull" element={<PrivateRoute element={<LobbyListSkullPage />} />} />
        <Route path="lobbyListDiamant" element={<PrivateRoute element={<LobbyListDiamantPage />} />} />
        <Route path="lobbyListTicTacToe" element={<PrivateRoute element={<LobbyListTicTacToePage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

