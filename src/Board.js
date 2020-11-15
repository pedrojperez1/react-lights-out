import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i=0; i < nrows; i++) {
      let row = [];
      for (let j=0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(r => r.every(c => c));
  }

  function flipCellsAround(coord) {
    console.log(`this is coord! `, coord);
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y, x-1, newBoard);
      flipCell(y, x+1, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return (
      <h1>You won!</h1>
    )
  } else {
    return (
      <table className="Board">
        { board.map((r, rowIdx) => { // loop through all rows
          return (
            <tbody>
              <tr>
                {r.map((c, colIdx) => { // loop through all cells
                  return (
                    <td>
                      <Cell key={`${rowIdx}-${colIdx}`} flipCellsAroundMe={() => flipCellsAround(`${rowIdx}-${colIdx}`)} isLit={c}/>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          )
        })}
      </table>
    )
  }
  

  // make table board

  
}

export default Board;
