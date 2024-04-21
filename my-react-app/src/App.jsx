import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx'
import ListOfGames from './ListOfGames'
import { GameProvider } from './games/diamant/GameContext.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Diamant" element={ <GameProvider><Diamant/></GameProvider>} />
        <Route path="/" element={<ListOfGames/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
