import './css/dataItem.css'

const DataItem = ({ children, translucent = false }) => {
    return (
        <div className={translucent ? 'dataItem semi-transparent':'dataItem'}>
            {children}
        </div>
    )
}

export default DataItem;