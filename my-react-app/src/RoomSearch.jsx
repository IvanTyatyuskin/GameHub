import Header from "./Components/Header"
import './Components/css/section.css'
import './SearchLobbyPage.css'

export const SearchLobbyPage = () => {
    return(
        <>
            <Header/>
            <div className='content-box height-fullscreen'>
                <div className='content-single horizontal'>
                    <div id="Discription">
                        <h1>Название Игры</h1>
                        <img style={{width:'300px', height: '200px'}}/>
                        <p>Описание игры</p>
                    </div>
                    <div id="Rooms">
                        <p>123</p>
                    </div>
                    <div id="Buttons">
                        <p>123</p>
                    </div>
                </div>
            </div>
        </>
    )
}