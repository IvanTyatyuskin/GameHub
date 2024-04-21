import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diamant from './games/diamant/Diamant.jsx'
import ListOfGames from './ListOfGames'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Diamant" element={<Diamant />} />
        <Route path="/" element={<ListOfGames/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
