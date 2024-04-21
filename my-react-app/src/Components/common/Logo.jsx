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