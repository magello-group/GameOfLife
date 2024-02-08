import { useState } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

const generateEmptyGrid = () => {
  return Array.from(Array(numCols) , () => Array(numRows).fill(false));
};

const App = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());

  return (
      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={j}
                className="cell"
                style={{ backgroundColor: cell ? "dimgray" : "white" }}
              ></div>
            ))}
          </div>
        ))}
      </div>
  );
};

export default App;
