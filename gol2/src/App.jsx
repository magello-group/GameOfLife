import { useState } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

const generateEmptyGrid = () => {
  return Array.from(Array(numCols), () => Array(numRows).fill(false));
};

const App = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());

  const toggleCell = (i, j) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === i && colIndex === j ? !cell : cell
        )
      )
    );
  };

  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div
              key={j}
              className="cell"
              style={{ backgroundColor: cell ? "dimgray" : "white" }}
              onClick={() => toggleCell(i, j)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
