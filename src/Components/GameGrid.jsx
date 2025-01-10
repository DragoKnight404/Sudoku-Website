import { useState, useEffect, useContext } from "react";
import "../Styles/GameGrid.css";

import SudokuCell from "./SudokuCell";
import { GameContext } from "../contexts/GameContext";

function GameGrid() {
  const {
    cellSelected,
    setCellSelected,
    sudoku,
    setSudoku,
    prefilled,
    notesMode,
    notes,
    setNotes,
  } = useContext(GameContext); // consumes the context

  useEffect(() => {
    const handleKeyDown = (event) => {
      //console.log(event.key)
      if (!cellSelected) {
        return;
      }

      const { row, col, cell_value, notes_value } = cellSelected;
      //console.log(notes_value);

      //console.log("row = " + row + " col = " + col+" value = "+value);

      // Handle navigation with arrow keys
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        let newRow = row;
        let newCol = col;

        if (event.key === "ArrowUp" && row >= 0) {
          newRow = row - 1;
          if (newRow === -1) newRow = 8;
        } else if (event.key === "ArrowDown" && row <= 8) {
          newRow = row + 1;
          if (newRow === 9) newRow = 0;
        } else if (event.key === "ArrowLeft" && col >= 0) {
          newCol = col - 1;
          if (newCol === -1) newCol = 8;
        } else if (event.key === "ArrowRight" && col <= 8) {
          newCol = col + 1;
          if (newCol === 9) newCol = 0;
        }
        setCellSelected({
          row: newRow,
          col: newCol,
          cell_value: sudoku[newRow][newCol],
          notes_value: notes[newRow][newCol],
        });
        console.log("with key", cellSelected);
        return;
      }

      // Prevent modifying prefilled cells
      if (prefilled[row][col] !== 0) {
        return;
      }

      // Handle numeric input
      if (!isNaN(event.key) && event.key >= 1 && event.key <= 9) {
        const key_pressed = parseInt(event.key, 10);
        const r = Math.floor((key_pressed - 1) / 3); // r,c for index of notes for coresponding key_pressed
        const c = (key_pressed - 1) % 3;
        const subBoxRow = Math.floor(row/3);
        const subBoxCol = Math.floor(col/3);
        // const newNotes = [...notes]; messes up as it is just a shallow copy
        // Create a deep copy of notes
        const newNotes = notes.map((rowNotes) =>
          rowNotes.map((cellNotes) => cellNotes.map((subRow) => [...subRow]))
        );
        
        if (notesMode && sudoku[row][col] === 0) {
          newNotes[row][col][r][c] = key_pressed;

          if (key_pressed === notes_value[r][c]) {
            //console.log(key_pressed + " : " + notes_value);
            newNotes[row][col][r][c] = 0;
          }
          //console.log("Notes Mode active " + newNotes[row][col]);
          setNotes(newNotes);
          setCellSelected({ ...cellSelected, notes_value: newNotes[row][col] });
        } 
        else if (!notesMode) {
          const newSudoku = sudoku.map(row => [...row]);

          newSudoku[row][col] = key_pressed;
          
          newNotes[row][col] = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ];
          //console.log("sudoku = "+value+" newSudoku = "+newSudoku[row][col])
          if (newSudoku[row][col] === cell_value) {
            // On pressing same key it erases the cell value
            newSudoku[row][col] = 0;
          }
          else{
            for(let i=0; i<9; i++){
              for(let j=0; j<9; j++){
                if(i===row || j===col || (subBoxRow===Math.floor(i/3) && subBoxCol===Math.floor(j/3))){
                  newNotes[i][j][r][c] = 0;
                }
              }
            }
          }
          setSudoku(newSudoku);
          setNotes(newNotes);
          setCellSelected({
            ...cellSelected,
            cell_value: newSudoku[row][col],
            notes_value: newNotes[row][col],
          });
        }

        //console.log("real notes =", notes[row][col]);
        return;
      }

      // Handle clearing the cell
      if (event.key === "Backspace" || event.key === "Delete") {
        const newSudoku = sudoku.map(row => [...row]);
        const newNotes = notes.map((rowNotes) =>
          rowNotes.map((cellNotes) => cellNotes.map((subRow) => [...subRow]))
        );
        newSudoku[row][col] = 0;
        newNotes[row][col] = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ];
        setSudoku(newSudoku);
        setNotes(newNotes);
        setCellSelected({
          ...cellSelected,
          cell_value: newSudoku[row][col],
          notes_value: newNotes[row][col],
        });
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Acts as a destructor
    };
  }, [cellSelected, sudoku, notesMode, notes]);

  function cellClickHandler(row, col) {
    // console.log(
    //   "row = " + row + " col = " + col + " cell_value = " + sudoku[row][col]
    // );

    if (cellSelected?.row === row && cellSelected?.col === col) {
      setCellSelected(null);
      return;
    }
    setCellSelected({
      row,
      col,
      cell_value: sudoku[row][col],
      notes_value: notes[row][col],
    });
    console.log(cellSelected);
  }

  function fillCellValue(row, col) {
    return sudoku[row][col] !== 0 ? sudoku[row][col] : "";
  }

  const renderRow = (rowIndex) => {
    return (
      <div key={rowIndex}>
        <div className="sudoku-row">
          {Array.from({ length: 9 }, (_, colIndex) => {
            const isPrefilled = prefilled[rowIndex][colIndex] !== 0;
            const isSelectedRow = cellSelected?.row === rowIndex;
            const isSelectedCol = cellSelected?.col === colIndex;
            const isSelectedCell = isSelectedRow && isSelectedCol;
            const isSelectedBox =
              Math.floor(cellSelected?.row / 3) === Math.floor(rowIndex / 3) &&
              Math.floor(cellSelected?.col / 3) === Math.floor(colIndex / 3);
            const isSameValue =
              cellSelected?.cell_value &&
              cellSelected.cell_value === sudoku[rowIndex][colIndex];

            let cellClass = "sudoku-cell";
            
            if(isSelectedCell){
              cellClass += " highlighted biggest"
            } else if (isSameValue) {
              cellClass += " highlighted big";
            } else if (isSelectedRow || isSelectedCol || isSelectedBox) {
              cellClass += " highlighted small";
            }
            
            if (isPrefilled) {
              cellClass += " prefilled"; // Add class for prefilled cells
            } else {
              cellClass += " non-prefilled"; // Add class for non-prefilled cells
            }

            return (
              <div className="sudoku-cellDiv" key={colIndex}>
                <SudokuCell
                  cellClass={cellClass}
                  cellClickHandler={cellClickHandler}
                  fillCellValue={fillCellValue}
                  row={rowIndex}
                  col={colIndex}
                />
                {colIndex % 3 === 2 && colIndex !== 8 ? (
                  <div className="GridGap-column"></div>
                ) : colIndex !== 8 ? (
                  <div className="GridGap-smallColumn"></div>
                ) : null}
              </div>
            );
          })}
        </div>
        {rowIndex % 3 === 2 && rowIndex !== 8 ? (
          <div className="GridGap-row"></div>
        ) : rowIndex !== 8 ? (
          <div className="GridGap-smallRow"></div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="GameBox">
      {Array.from({ length: 9 }, (_, rowIndex) => renderRow(rowIndex))}
    </div>
  );
}

export default GameGrid;
