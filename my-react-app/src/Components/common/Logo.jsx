import './logo.css'

function GetStyle(num) {
    switch (num) {
        case '1': {
            return 'logo1'
        }
        case '2': {
            return 'logo2'
        }
        case '3': {
            return 'logo3'
        }
    }
}

export default function LogoComponent({ type = '1' }) {
    const classStr = 'logo ' + GetStyle(type)
    return (
        <div className={classStr}>
            Game
            <div>
                Hub
            </div>
        </div>
    )
}

export function LogoComponent2(){
    const logoStyle = {

    }

    return(
    <div class="logo_v2">
        <button class="logo1_v2">
            <div class="game-wrapper_v2">
                <b class="game_v2">Game</b>
            </div>
            <div class="hub-wrapper_v2">
                <b class="hub_v2">hub</b>
            </div>
        </button>
    </div>
    )
}

{/*
from registrationPage
<div class="logo">
    <button class="logo1">
        <div class="game-wrapper">
        <b class="game">Game</b>
        </div>
        <div class="hub-wrapper">
        <b class="hub">hub</b>
        </div>
    </button>
</div>*/}