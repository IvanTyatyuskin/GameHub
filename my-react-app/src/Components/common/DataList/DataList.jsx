import './css/dataList.css'

function getClass(someInput) {
    switch (someInput) {
        case '1': {
            return 'vertically'
        }
        case '2': {
            return 'horizontally'
        }
        case '3': {
            return 'sublist'
        }
    }
}

const DataList = ({ children, type = '1', heading }) => {
    return (
        <div className={getClass(type)}>
            {heading && <h1>{heading}</h1>}
            {children}
        </div>
    )
}

export default DataList;
