import './chip.css'
import back from '../assets/back.png'
import flower from '../assets/flower.png'
import skull from '../assets/skull.png'

const getImg = (type) =>{
    switch (type){
        case '0': return flower;
        case '1': return skull;
        default: return back;
    }
}

export const Chip = ({onClick = null, type, isActive = false}) => {
    
    return(
        <div className={onClick? 'chip clickable':'chip'} onClick={onClick}>
            <img src={getImg(type)} style={{display:"block"}}/>
        </div>
    )
}

export const Chip2 = ({deck, onClick}) => {
    return(
        <div className={onClick? 'chip clickable':'chip'} 
            hidden={deck.IsDisabled}
            onClick={onClick} >
            <img src={deck.Image} className='OptionImage' />
        </div>
    )
}