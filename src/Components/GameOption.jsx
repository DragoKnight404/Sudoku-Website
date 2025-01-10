import { useContext, useEffect, useState } from "react";
import "../Styles/GameOption.css";
import eraseIcon from "../assets/erase_icon_32.png";
import notesIcon from "../assets/notes_icon_64.png";
import undoIcon from "../assets/undo_icon_40.png";
import { GameContext } from "../contexts/GameContext";

function GameOption() {
  const {
    notesMode,
    setNotesMode,
    cellSelected,
    setCellSelected,
    sudoku,
    setSudoku,
    notes,
    setNotes,
    history,
    setHistory,
  } = useContext(GameContext);

  function notesClickHandler() {
    setNotesMode((notesMode) => {
      console.log("Notes Mode is ", !notesMode);
      return !notesMode;
    });
    console.log("from options file : ", cellSelected);
    //setCellSelected(cellSelected);
  }

  function eraseClickHandler() {
    const { row, col } = cellSelected;

    const newSudoku = sudoku.map((row) => [...row]);
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
    setHistory([...history, { sudoku: newSudoku, notes: newNotes }]);
  }

  function undoClickHandler() {
    // Check if there are more than one history objects
    if (history.length > 1) {
      // Optionally, update the current sudoku and notes to the latest history state
      const newState = history[history.length - 2]; // Second last state
      setSudoku(newState.sudoku);
      setNotes(newState.notes);
      setCellSelected((prevCell) => {
        if(prevCell)
        return {
          ...prevCell,
          cell_value: newState.sudoku[prevCell.row][prevCell.col],
          notes_value: newState.notes[prevCell.row][prevCell.col],
        };
        else return prevCell;
      });

      // Remove the latest history object
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    } else {
      console.log("Undo is not possible. Only one history state exists.");
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["n", "N"].includes(event.key)) {
        notesClickHandler();
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Acts as a destructor
    };
  }, [notesMode]);

  return (
    <div className="option-bubbles-container">
      <div className="option-bubble" onClick={undoClickHandler}>
        <button className="button-option Undo">
          <img src={undoIcon} alt="Undo" className="button-icon" />
        </button>
        <p className="option-name" unselectable="on">
          Undo
        </p>
      </div>

      <div className="option-bubble" onClick={eraseClickHandler}>
        <button className="button-option Clear">
          <img src={eraseIcon} alt="Clear" className="button-icon" />
        </button>
        <p className="option-name" unselectable="on">
          Erase
        </p>
      </div>

      <div className="option-bubble" onClick={notesClickHandler}>
        <button
          className={`button-option Notes ${notesMode ? "selected" : ""}`}
        >
          <img src={notesIcon} alt="Notes" className="button-icon" />
        </button>
        <p className="option-name" unselectable="on">
          Notes
        </p>
      </div>
    </div>
  );
}

export default GameOption;
