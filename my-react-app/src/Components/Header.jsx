import React from 'react';
//import '../css/general.css'
import './css/header.css'
import testImage from '../assets/image@2x.png'
import UserComponent from './common/User';
import LogoComponent, { LogoComponent2 } from './common/Logo';

export default function Header() {
    return (
        <header className='header-def'>
            <div className='header-content'>
                <LogoComponent type='2'/>
                <UserComponent Nickname='Nickname' ImageSrc={testImage} />
            </div>
        </header>
    )
}

export const HeaderForGame = ({}) => {
    <header className='header-def'>
        <div className='header-content'>
            <LogoComponent type='2'/>
            <UserComponent Nickname='Nickname' ImageSrc={testImage} />
        </div>
    </header>
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