import PlayersLoot from "./PlayersLoot";
import '../../../Components/css/dataList.css'

const PlayersLootList = ({ playersData }) => {
    return (
        <div className='infoList--c'>
            {playersData.map((player, index) =>
                <PlayersLoot
                    key={index}
                    imageIndex={player.imageId}
                    ruby={player.ruby}
                    star={player.star}
                    atTheBase={player.atTheBase}
                />
            )}
        </div>
    )
}
export default PlayersLootList;