import React from 'react';
//import '../css/general.css' (Assuming not needed for this component)
import './css/header.css'
import testImage from '../assets/UserImage1.png'
import UserComponent from './common/User';
import LogoComponent, { LogoComponent2 } from './common/Logo';

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default function Header() {
  const nickname = getCookie("nickname"); // Get nickname from cookie

  return (
    <header className='header-def'>
      <div className='header-content'>
        <LogoComponent type='2'/>
        <UserComponent Nickname={nickname} ImageSrc={testImage} />
      </div>
    </header>
  )
}

export const HeaderForGame = ({}) => {
  const nickname = getCookie("nickname"); // Get nickname from cookie

  return (
    <header className='header-def'>
      <div className='header-content'>
        <LogoComponent type='2'/>
        <UserComponent Nickname={nickname} ImageSrc={testImage} />
      </div>
    </header>
  )
}


{/*
<div class="div">
    <button class="button">
        <div class="logo">
            <div class="game-wrapper">
                <b class="game">Game</b>
            </div>
            <div class="hub-wrapper">
                <b class="hub">hub</b>
            </div>
        </div>
    </button>
    <div class="div1">
        <img class="image-icon" alt="" src={image_face} />
        <div class="div2">Пользователь</div>
    </div>
</div>
    */}