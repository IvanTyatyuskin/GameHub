//import './global1.css'
import './registrationPage.css'
import img from '../assets/UserImage2.png'
import LogoComponent from '../Components/common/Logo'
import { InputText } from '../Components/common/Input'
//import '../Components/css/section.css'
import styles_onlyWindow from './onlyWindow.module.css'
import styles_registrationPage from './registrationPage.module.css'
import { LanguageButton } from '../Components/common/button'
import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'

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

  const socket = useContext(SocketContext);

  console.log(socket);

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
          id="inputName" // Добавляем ID для удобного обращения
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

  const handleAccept = () => {
    const nickname = document.getElementById('inputName').value; // Получаем значение никнейма
    const avatar = 0;
    const background = 0;
    document.cookie = `nickname=${nickname}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie
    document.cookie = `avatar=${avatar}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie
    document.cookie = `background=${background}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie

    if (socket) {
      socket.emit('setNickname', { nickname });
    } else {
      console.error('Socket is not connected');
    }

    window.location.href = '/ListOfGames'; 
  };

  const handleCancel = () => {
    document.getElementById('inputName').value = ''; // Очищаем поле для текста
  };

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
          <div className={styles_registrationPage.panelbuttons}>
            <button id="cancel_button" onClick={handleCancel}>
              <img
                alt=""
                src={img}
              />
              <p>Отмена</p>
            </button>
            <button id="accept_button" onClick={handleAccept}>
              <img alt="" src={img}/>
              <p>Принять</p>
            </button>
          </div>
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