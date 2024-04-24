import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx'
import ListOfGames from './ListOfGames'
import { GameProvider } from './games/diamant/GameContext.jsx';
import Counter from './games/skull/Counter.jsx';
import LobbyList from './lobby/src/LobbyList.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Diamant" element={ <GameProvider><Diamant/></GameProvider>} />
        <Route path="Skull" element={<Counter/>} />
        <Route path="/" element={<ListOfGames/>} />
        <Route path="LobbyList" element={ <LobbyList nickname="User" avatar={3} background={2} />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
