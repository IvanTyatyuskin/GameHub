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
<<<<<<< Updated upstream
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
=======
  const socket = useContext(SocketContext);

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});

  console.log(socket);

  const _nickname = cookies.nickname || ''; //получить из cookie
  const _avatar = cookies.avatar ||  0;
  const _background = cookies.background || 0;

  //нужно добавть в cookie значение библиотеки языка (Rus||Eng)


  const [getInput, setInput] = useState(_nickname);
  const [getAvatar, setAvatar] = useState(_avatar);
  const [getBackground, setBackground] = useState(_background);

  function LanguageSelection() {
    return(
      <div className={styles_registrationPage.languageselection}>
        <LanguageButton text='Rus' onclick={()=>{
          //код
        }}/>
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
          value={getInput}
          setValue={setInput}
        />
      </div>
    )
  }

  const handleAccept = () => {
    const nickname = getInput;
    //document.getElementById('inputName').value; // Получаем значение никнейма
    //const avatar = 0;
    //const background = 0;
    document.cookie = `nickname=${nickname}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie
    document.cookie = `avatar=${getAvatar}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie
    document.cookie = `background=${getBackground}; max-age=3600; path=/`; // Сохраняем никнейм в Cookie

    if (socket) {
      socket.emit('setNickname', { nickname });
    } else {
      console.error('Socket is not connected');
    }

    window.location.href = '/ListOfGames'; 
  };

  const handleCancel = () => {
    //document.getElementById('inputName').value = ''; // Очищаем поле для текста
    //setInput('');
    window.location.href = '/ListOfGames'; 
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
            {cookies.nickname? 
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
>>>>>>> Stashed changes
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