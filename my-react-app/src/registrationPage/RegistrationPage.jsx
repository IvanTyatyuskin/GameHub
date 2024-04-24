import React from 'react'
//import './global1.css'
import './registrationPage.css'
import img from '../assets/UserImage2.png'
import LogoComponent, { LogoComponent2 } from '../Components/common/Logo'
import { Input3, InputText } from '../Components/common/Input'
//import '../Components/css/section.css'
import styles_onlyWindow from './onlyWindow.module.css'
import styles_registrationPage from './registrationPage.module.css'
import { LanguageButton, SimpleButton } from '../Components/common/button'

export const OnlyWindow = ({children}) =>
{
    return (
        <div className={styles_onlyWindow.registerpage}>
            <div className={styles_onlyWindow.workingArea}>
                {children}
            </div>
        </div>  
    )
}

export const RegistrationPage = ({}) =>{
    function LanguageSelection() {
        return(
            <div className={styles_registrationPage.languageselection}>
                <LanguageButton text='Rus'/>
                <LanguageButton text='Eng'/>
            </div>
        )
    }
    function TextInputArea() {
        return(      
        <div className={styles_registrationPage.textinputarea}>
            <InputText
                labelText = "Имя пользователя"
                name = 'inputname'
                maxlength="20"
                placeholder="Сгенерированное имя"
                />
        </div>
        )
    }
    function PanelButtons(){
        return(
        <div className={styles_registrationPage.panelbuttons}>
            <button id="cancel_button">
                <img
                    alt=""
                    src={img}
                />
                <p>Отмена</p>
            </button>
            <button id="accept_button">
                <img alt="" src={img}/>
                <p>Принять</p>
            </button>
        </div>
        )
    }
    function AvatarModal(){
        return(<>
            {/*создание модального окна*/}
            <div id="avatarModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">×</span>
                    <h2>Выберите аватар и фон</h2>
                    <div className="avatar-options">
                        {/*<!-- Аватары будут добавлены сюда JavaScript -->*/} 
                    </div>
                    <div className="background-options">
                        {/*<!-- Фоны будут добавлены сюда JavaScript -->*/}
                    </div>
                    <button id="save-avatar-button">Сохранить</button>
                </div>
            </div>
        </>)
    }
    return(<>
    <OnlyWindow>
        <div className={styles_onlyWindow.header}>
            <LogoComponent/>
            {LanguageSelection()}
            <p></p>
        </div>
        <div className={styles_onlyWindow.body}>
            <div className={styles_registrationPage.box}>
                <div className="userphoto-container">
                    <img id="userPhoto" className="userphoto-icon" /*loading="eager"*/ alt="" src={img} />
                </div>
                {TextInputArea()}
                {PanelButtons()}
            </div>
            <div className={styles_registrationPage.box}>
                <div className={styles_registrationPage.info}>
                    <p>
                        Здесь будет располагаться описание...
                    </p>          
                </div>
                <div>
                    <button/>

                </div>
            </div>
        </div>
    </OnlyWindow>
    {/*AvatarModal()*/}
    </>)
}


const _discription = [
    {
        slide:{
            title: "Инфа 1",
            info: "Здесь будет располагаться описание..."
        }
    },
    {
        slide:{
            title: "Инфа 2",
            info: "Здесь будет располагаться описание..."
        }
    },
    {
        slide:{
            title: "Инфа 3",
            info: "Здесь будет располагаться описание..."
        }
    }
]