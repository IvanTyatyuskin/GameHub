import PlayersLoot from "./PlayersLoot";
import '../../../Components/css/dataList.css'

const PlayersLootList = ({ playersData }) => {
    return (
        <div className='infoList--c'>
            {playersData.map((player, index) =>
                <PlayersLoot
                    
                    key={index}
                    NickName={player.nickName}
                    imageIndex={player.imageId}
                    ruby={player.ruby}
                    atTheBase={player.atTheBase}
                />
            )}
        </div>
    )
}
export default PlayersLootList;