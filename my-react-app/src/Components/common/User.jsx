import './user.css'
import '../css/image.css'

export default function UserComponent({ Nickname = 'Пользователь', ImageSrc }) {
    return (
        <div className='user-def'>
            <img className='size32 round' src={ImageSrc} alt="UserImage" />
            <p>{Nickname}</p>
        </div>
    )
}