import { useContext, useEffect, useState } from "react";
import "../Styles/GameOption.css";
import eraseIcon from "../assets/erase_icon_32.png";
import notesIcon from "../assets/notes_icon_64.png";
import undoIcon from "../assets/undo_icon_40.png";
import { GameContext } from "../contexts/GameContext";

function GameOption() {

  const { notesMode, setNotesMode, cellSelected, setCellSelected, sudoku, setSudoku } = useContext(GameContext);

  function notesClickHandler() {
    setNotesMode((notesMode) => {
      console.log('Notes Mode is ',!notesMode);
      return !notesMode;
    });
    console.log("from options file : ",cellSelected)
    //setCellSelected(cellSelected);
  }

  useEffect(()=>{
    const handleKeyDown = (event) => {
      if (["n", "N"].includes(event.key)) {
        notesClickHandler();
        return;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Acts as a destructor
    };
  },[notesMode]);

  return (
    <div className="option-bubbles-container">
      <div className="option-bubble">
        <button className="button-option Undo">
          <img src={undoIcon} alt="Undo" className="button-icon" />
        </button>
        <p className="option-name" unselectable="on">
          Undo
        </p>
      </div>

      <div className="option-bubble">
        <button className="button-option Clear">
          <img src={eraseIcon} alt="Clear" className="button-icon" />
        </button>
        <p className="option-name" unselectable="on">
          Erase
        </p>
      </div>

      <div className="option-bubble">
        <button className={`button-option Notes ${notesMode ? 'selected' : ''}`}>
          <img
            src={notesIcon}
            alt="Notes"
            className="button-icon"
            onClick={notesClickHandler}
          />
        </button>
        <p className="option-name" unselectable="on">
          Notes
        </p>
      </div>
    </div>
  );
}

export default GameOption;
