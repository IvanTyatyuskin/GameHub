import React, { Component } from "react";
import Button from '../../Components/common/button'
import Tile from './components/Tile'

const squareCount = 5;

class Square extends React.Component {
    render() {
        const style = {
            width: "124px",
            height: "124px",
            border: "1px solid black",
            backgroundColor: this.props.isStarted ? "red" : "white"
        };

        return (
            <button className="square" style={style}>
                {this.props.textButton}
            </button>
        );
    }
}

class Game extends Component {
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
        return (
            <Square
                key={i}
                isStarted={this.state.startedSquares[i]}
                textButton={this.state.squareValues[i]}
            />
        );
    }
    render() {
        let squares = [];
        for (let i = 0; i < squareCount * squareCount; i++) {
            squares.push(this.renderSquare(i));
        }
        let rows = [];
        for (let i = 0; i < squareCount; i++) {
            let rowSquares = squares.slice(
                i * squareCount,
                i * squareCount + squareCount
            );
            if (i % 2 !== 0) {
                rowSquares = rowSquares.reverse();
            }
            rows.push(
                <div key={i}
                    className="board-row"
                    style={{ display: "flex" }}>
                    {rowSquares}
                </div>
            );
        }
        return (
            <div>
                {rows}
                <Button onClick={this.handleStart}>
                    <p>Далее</p>
                </Button>
                <div>
                    {/*<Tile id='0'/>*/}
                    {/*<Tile id='1'/>*/}
                    {/*<Tile id='2'/>*/}
                    {/*<Tile id='3'/>*/}
                    {/*<Tile id='4'/>*/}
                </div>
            </div>
        );
    }
}

export default Game;