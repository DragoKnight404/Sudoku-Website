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
      <h1 className="Game-title" unselectable="on">Sudoku</h1>
      <div className="Grid-with-options">
        <GameGrid />
        <GameOption />
      </div>
    </div>
  );
}

export default GameScreen;
