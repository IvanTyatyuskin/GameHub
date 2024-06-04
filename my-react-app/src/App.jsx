import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx';
import ListOfGames from './ListOfGames';
import Counter from './games/skull/Counter.jsx';
import { RegistrationPage } from './registrationPage/RegistrationPage.jsx';
import { LobbyPage } from './lobbyPage/LobbyPage.jsx';
import SearchLobbyPage from './lobbySearchPage/LobbySearchPage.jsx';
//import LobbyListSkullPage from './lobbyListSkullPage/LobbyListSkullPage.jsx';
//import LobbyListDiamantPage from './lobbyListDiamantPage/LobbyListDiamantPage.jsx';
//import LobbyListTicTacToePage from './lobbyListTicTacToePage/LobbyListTicTacToePage.jsx';
import TicTacToe from './games/tictactoe/TicTacToe.jsx';
import PrivateRoute from './PrivateRoute';  
import { NavigationProvider, NavigationContext } from './NavigationContext';
import PrivateGamesRoute from './PrivateGamesRoute.jsx';
import { useContext } from 'react';

function App() {
  return (
    <NavigationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="ListOfGames" element={<PrivateRoute element={<ListOfGames />} />} />
          <Route path="Diamant" element={<PrivateGamesRoute element={<Diamant />} redirectTo="/lobbyListDiamant" />} />
          <Route path="Skull" element={<PrivateGamesRoute element={<Counter />} redirectTo="/lobbyListSkull" />} />
          <Route path="TicTacToe" element={<PrivateGamesRoute element={<TicTacToe />} redirectTo="/lobbyListTicTacToe" />} />
          <Route path="LobbyPage" element={<PrivateRoute element={<LobbyPage />} />} />
          {/*<Route path="lobbylist" element={<PrivateRoute element={<SearchLobbyPage />} />} />*/}
          <Route path="lobbyListSkull" element={<PrivateRoute element={<LobbyListSkullPageWrapper  />} />} />
          <Route path="lobbyListDiamant" element={<PrivateRoute element={<LobbyListDiamantPageWrapper />} />} />
          <Route path="lobbyListTicTacToe" element={<PrivateRoute element={<LobbyListTicTacToePageWrapper  />} />} />
        </Routes>
      </BrowserRouter>
    </NavigationProvider>
  );
}
const LobbyListSkullPageWrapper = () => {
  const { setHasNavigatedThroughLobby } = useContext(NavigationContext);
  setHasNavigatedThroughLobby(true);
  //return <LobbyListSkullPage />;
  return <SearchLobbyPage GameIndex='1' Game='Skull' navigateAddress='/LobbyPage'/>
};

const LobbyListDiamantPageWrapper = () => {
  const { setHasNavigatedThroughLobby } = useContext(NavigationContext);
  setHasNavigatedThroughLobby(true);
  //return <LobbyListDiamantPage />;
  return <SearchLobbyPage GameIndex='0' Game='Diamant' navigateAddress='/LobbyPage'/>
};

const LobbyListTicTacToePageWrapper = () => {
  const { setHasNavigatedThroughLobby } = useContext(NavigationContext);
  setHasNavigatedThroughLobby(true);
  //return <LobbyListTicTacToePage />;
  return <SearchLobbyPage GameIndex='2' Game='TicTacToe' navigateAddress='/LobbyPage'/>
};
export default App;

