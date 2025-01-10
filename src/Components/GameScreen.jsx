// import '../Styles/GameScreen.css';
// import GameGrid from './GameGrid';

// function GameScreen() {
//   return (
//     <div>
//       <h1>Sudoku</h1>
//       <div className='Grid-with-options'>
//         <GameGrid/>
//         <button className='button-option'>Undo</button>
//         <button className='button-option'>Erase</button>
//         <button className='button-option'>Notes</button>
//       </div>
//     </div>
//   );
// }

// export default GameScreen;

import "../Styles/GameScreen.css";
import GameGrid from "./GameGrid";
import GameOption from "./GameOption";

function GameScreen() {
  return (
    <div>
      <h1>Sudoku</h1>
      <div className="Grid-with-options">
        <GameGrid />
        <GameOption />
        {/* <button
          className="sudoku-cell"
        >
          <div className="notes-row">
            <div id="nc1" className="notes-cell">0</div>
            <div id="nc2" className="notes-cell">0</div>
            <div id="nc3" className="notes-cell">0</div>
          </div>
          <div className="notes-row">
            <div id="nc4" className="notes-cell">0</div>
            <div id="nc5" className="notes-cell">0</div>
            <div id="nc6" className="notes-cell">0</div>
          </div>
          <div className="notes-row">
            <div id="nc7" className="notes-cell">0</div>
            <div id="nc8" className="notes-cell">0</div>
            <div id="nc9" className="notes-cell">0</div>
          </div>
        </button> */}
      </div>
    </div>
  );
}

export default GameScreen;
