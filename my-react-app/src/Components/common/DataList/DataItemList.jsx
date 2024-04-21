import "../../css/dataList.css"

function getType(num) {
    switch (num) {
        case '1': {
            return 'infoList--c'
        }
        case '2': {
            return 'infoList--r'
        }
    }
}

const DataItemList = ({ children, type='1' }) => {
    return (
        <div className={getType(type)}>
            {children}
        </div>
    )
}

export default DataItemList;