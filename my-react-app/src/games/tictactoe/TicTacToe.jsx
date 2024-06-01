import "./TicTacToe.css"
import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from 'C:/Users/tyaty/Documents/GitHub/GameHub/my-react-app/src/SocketContext.js'


const TicTacToe = () => {
    const [turn, setTurn] = useState("X");
    const [cells, setCells] = useState(Array(9).fill(""));
    const [winner, setWinner] = useState();
    const [isDraw, setIsDraw] = useState(false);
    const [mySymbol, setMySymbol] = useState("");
    const socket = useContext(SocketContext);

    useEffect(() => {
      socket.on('update_game', ({ Cells, Winner, IsDraw, CurrentTurn }) => {
        setCells(Cells);
        setWinner(Winner);
        setIsDraw(IsDraw);
        setTurn(CurrentTurn);
      });

      socket.on('reset_game', () => {
        setCells(Array(9).fill(""));
        setWinner();
        setTurn('X');
        setIsDraw(false);
      });

      return () => {
        socket.off('current_turn');
        socket.off('update_game');
        socket.off('reset_game');
      };
    }, [socket]);

    socket.emit('start_TicTacToe_game');

    socket.on('set_symbol', (symbol) => {
      setMySymbol(symbol);
    });

    const handleClick = (num) => {
      if (mySymbol === turn)
        {
          if (winner || cells[num] !== "") return;

          socket.emit('make_move', { num });
        }
    };
  
    const Cell = ({ num }) => {
      const cellValue = cells[num];
      const cellClassName = cellValue ? `cell cell-${cellValue}` : "cell";
  
      return (
        <td className={cellClassName} onClick={() => handleClick(num)}>
          {cellValue}
        </td>
      );
    };
  
    const handleReset = () => {
      socket.emit('reset_game');
    };
  
    return (
      <div className="container">
        <h1>Tic Tac Toe</h1>
        <div className={`winner ${winner || isDraw ? "show" : ""}`}>
          {winner ? `Winner is: ${winner}` : isDraw ? "Its a draw" : ""}
        </div>
        <table>
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    );
  };

export default TicTacToe;
