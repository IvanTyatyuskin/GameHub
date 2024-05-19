import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { socket } from "../ConnectionJSX.jsx";

function LoginTEST() {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nicknameCookie = Cookies.get('nickname');
    const avatarCookie = Cookies.get('avatar');
    const backgroundCookie = Cookies.get('background');

    if (nicknameCookie && avatarCookie && backgroundCookie) {
      setNickname(nicknameCookie);
      setAvatar(avatarCookie);
      setBackground(backgroundCookie);

      // Emit event to the server with user data
      socket.emit('set-user-info', { nickname: nicknameCookie, avatar: avatarCookie, background: backgroundCookie });

      // Redirect to the desired page after successful submission
      navigate('/lobbylist');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save data to cookies
    Cookies.set('nickname', nickname);
    Cookies.set('avatar', avatar);
    Cookies.set('background', background);

    // Emit event to the server with user data
    socket.emit('set-user-info', { nickname, avatar, background });

    // Redirect to the desired page after successful submission
    navigate('/lobbylist');
  };

  return (
    <>
      <div>
        <h1>Enter your nickname:</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <br />
          <label htmlFor="avatar">Avatar (0-9):</label>
          <input
            type="number"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            min="0"
            max="9"
            required
          />
          <br />
          <label htmlFor="background">Background (0-9):</label>
          <input
            type="number"
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            min="0"
            max="9"
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default LoginTEST;
