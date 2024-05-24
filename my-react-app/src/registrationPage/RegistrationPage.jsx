//import './global1.css'
import './registrationPage.css'
import img from '../assets/UserImage2.png'
import LogoComponent from '../Components/common/Logo'
import { InputText } from '../Components/common/Input'
//import '../Components/css/section.css'
import styles_onlyWindow from './onlyWindow.module.css'
import styles_registrationPage from './registrationPage.module.css'
import { LanguageButton } from '../Components/common/button'
import React, { useContext, useState } from 'react'
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

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});

  const _nickname = cookies.nickname || ''; //получить из cookie
  const _avatar = cookies.avatar ||  0;
  const _background = cookies.background || 0;

  //нужно добавть в cookie значение библиотеки языка (Rus||Eng)

  const [getInput, setInput] = useState(_nickname);
  const [getAvatar, setAvatar] = useState(_avatar);
  const [getBackground, setBackground] = useState(_background);
  const [getLanguage, setLanguage] = useState(_language);

  const handleLanguageChange = (language) => {
    setLanguage(language);
    document.cookie = `language=${language}; max-age=3600; path=/`
  }

  function LanguageSelection({ onLanguageChange }) {
    return(
      <div className={styles_registrationPage.languageselection}>
        <LanguageButton text='Rus' onclick={() => onLanguageChange("Rus")} />
        <LanguageButton text='Eng' onclick={() => onLanguageChange("Eng")} />
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
          value={getInput}
          setValue={setInput}
        />
      </div>
    )
  }

  const handleAccept = () => {
    const nickname = getInput;

    if (nickname != '') {
      document.cookie = `nickname=${nickname}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie
      document.cookie = `avatar=${getAvatar}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie
      document.cookie = `background=${getBackground}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie
  
      if (socket) {
        socket.emit('setNickname', { nickname });
      } else {
        console.error('Socket is not connected');
      }
  
      window.location.href = '/ListOfGames'; 
    }
  };

  const handleCancel = () => {
    //document.getElementById('inputName').value = ''; // Очищаем поле для текста
    setInput(_nickname)
  };

  return(<>
    <OnlyWindow>
      <div className={styles_onlyWindow.header}>
        <LogoComponent/>
        <LanguageSelection onLanguageChange={handleLanguageChange} />
        <p></p>
      </div>
      <div className={styles_onlyWindow.body}>
        <div className={styles_registrationPage.box}>
          <div className="userphoto-container">
            <img id="userPhoto" className="userphoto-icon" /*loading="eager"*/ alt="" src={img} />
          </div>
          {TextInputArea()}
          <div className={styles_registrationPage.panelbuttons}>
            {_nickname? 
              <button id="cancel_button" onClick={handleCancel}>
                <img alt="" src={img}/>
                <p>Отмена</p>
              </button>: null
            }
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