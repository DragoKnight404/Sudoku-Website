import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

function SudokuCell({ cellClass, cellClickHandler, fillCellValue, row, col }) {
  // r,c are indexes within the cell for notes
  const {cellSelected, setCellSelected, sudoku, setSudoku, prefilled, notes, setNotes} = useContext(GameContext);

  function fillNotesCell(r, c) {
    //console.log(row+" "+col+" : "+r+" "+c);
    return notes[row][col][r][c]===0 ? "" : notes[row][col][r][c];
  }

  const renderNotesRow = (r) => {
    return (
      <div className="notes-row" key={r}>
        {Array.from({ length: 3 }, (_, c) => {
          return (
            <div className="notes-cell" key={c}>
              {fillNotesCell(r, c)}
            </div>
          );
        })}
      </div>
    );
  };
  const value = fillCellValue(row, col);
  return (
    <button className={cellClass} onClick={() => cellClickHandler(row, col)}>
      {value === ""
        ? Array.from({ length: 3 }, (_, r) => {
          return renderNotesRow(r);
          })
        : value}
    </button>
  );
}

export default SudokuCell;
