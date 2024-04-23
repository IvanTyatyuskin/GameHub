import React from 'react';
//import '../css/general.css'
import './css/header.css'
import testImage from '../assets/react.svg'
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