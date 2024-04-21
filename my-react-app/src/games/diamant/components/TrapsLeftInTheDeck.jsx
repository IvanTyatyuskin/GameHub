import ImageLib from "./ImageLib";

const TrapsInThisRound = ({ traps }) => {
    return (
        <div className="infoList--c">
            {traps.map((trap) =>
                <div className="dataItem">
                    <ImageLib index={trap.trapId} />
                    <p>x {trap.count}</p>
                </div>
            )}
        </div>
    )
}
export default TrapsInThisRound;