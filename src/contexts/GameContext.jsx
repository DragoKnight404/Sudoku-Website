import { use } from "react";
import { createContext, useState } from "react";

//Create the context here
export const GameContext = createContext(null);

//This is GlobalState that recieves component as children and provides states to be consumed by them
function GameContextProvider({ children }) {
  const [cellSelected, setCellSelected] = useState(null);

  const prefilled = [
    [0, 2, 0, 0, 0, 4, 3, 9, 6],
    [9, 0, 0, 0, 2, 0, 0, 0, 8],
    [0, 0, 0, 6, 0, 9, 0, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 7, 2, 5, 0, 3, 6, 8, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 2, 0, 5, 0, 0, 0],
    [1, 0, 0, 0, 9, 0, 0, 0, 3],
    [0, 0, 9, 8, 0, 0, 0, 6, 0],
  ];
  const [sudoku, setSudoku] = useState(prefilled);

  // Initialize notes with zeros
  const initializeNotes = () => {
    return Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () =>
        Array.from({ length: 3 }, () => Array(3).fill(0))
      )
    );
  };

  const [notes, setNotes] = useState(initializeNotes);

  const [notesMode, setNotesMode] = useState(false);

  return (
    <GameContext.Provider
      value={{
        cellSelected,
        setCellSelected,
        sudoku,
        setSudoku,
        prefilled,
        notes,
        setNotes,
        notesMode,
        setNotesMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
