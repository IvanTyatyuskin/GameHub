const ReactDOM = require("react-dom/client");
const React = require("react");

const squareCount = 5;


class StartButton extends React.Component {
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
    }
    press() {
        this.props.onStart();

    }
    render() {
        return <button onClick={this.press}>START</button>;
    }
}

class Square extends React.Component {
    render() {
        const style = {
            width: '100px',
            height: '100px',
            border: '1px solid black',
            backgroundColor: this.props.isStarted ? 'red' : 'white',

        };

        return (
            <button className="square" style={style}>
                {this.props.textButton}
                {this.props.value}
            </button>
        );
    }
}
export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startedSquares: [],
            squareValues: Array(squareCount * squareCount).fill(null)
        };
        this.handleStart = this.handleStart.bind(this);
    }

    handleStart() {
        this.setState(prevState => {
            const startedSquares = [...prevState.startedSquares];
            const squareValues = [...prevState.squareValues];
            if (startedSquares.length < squareCount * squareCount) {
                const randomNumber = Math.floor(Math.random() * 11);
                startedSquares.push(true);
                squareValues[startedSquares.length - 1] = randomNumber;
            }
            return { startedSquares, squareValues };
        });
    }
    renderSquare(i) {
        return <Square
            key={i}
            isStarted={this.state.startedSquares[i]}
            textButton={this.state.squareValues[i]} />;
    }
    render() {
        let squares = [];
        for (let i = 0; i < squareCount * squareCount; i++) {
            squares.push(this.renderSquare(i));
        }
        let rows = [];
        for (let i = 0; i < squareCount; i++) {
            let rowSquares = squares.slice(i * squareCount, i * squareCount + squareCount);
            if (i % 2 !== 0) {
                rowSquares = rowSquares.reverse();
            }
            rows.push(<div key={i} className="board-row" style={{ display: 'flex' }}>{rowSquares}</div>);
        }
        return (
            <div>
                <StartButton onStart={this.handleStart} />
                {rows}
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Board />);

