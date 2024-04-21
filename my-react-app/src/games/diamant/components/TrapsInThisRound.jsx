import ImageLib from "./ImageLib";

const TrapsInThisRound = ({ traps }) => {
    return (
        <div className="infoList--r">
            {traps.map((index) =>
                <ImageLib index={index} />
            )}
        </div>
    )
}
export default TrapsInThisRound;