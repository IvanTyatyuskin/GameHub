
import OptionButton from "./OptionButton";
import Counter from "./Counter";
import { useState } from 'react';
import io from 'socket.io-client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() 
{
  const [username, setUsername] = useState(''); 
  const [room, setRoom] = useState(''); 

  return (
    <>
 
  
 <Counter ></Counter>
 
 
  </>
  

  );
}

export default App
