import { useEffect, useState } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

const generateEmptyGrid = () => {
  return Array.from(Array(numCols), () => Array(numRows).fill(false));
};

const generateRandomGrid = () => {
  return Array.from(Array(numCols), () =>
    Array.from(Array(numRows), () => Math.random() > 0.7)
  );
};

const App = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const countNeighbors = (i, j, currentGrid) => {
      let count = 0;
      neighbors.forEach(([y, x]) => {
        const ni = i + y;
        const nj = j + x;
        if (ni >= 0 && ni < numCols && nj >= 0 && nj < numRows) {
          count += currentGrid[ni][nj] ? 1 : 0;
        }
      });
      return count;
    };

    const simulate = () => {
      setGrid((prevGrid) =>
        grid.map((row, i) =>
          row.map((cell, j) => {
            const nrOfNeighbors = countNeighbors(i, j, prevGrid);
            if (cell && nrOfNeighbors < 2) {
              return false; // Cell dör
            } else if (cell && nrOfNeighbors > 3) {
              return false; // Cell dör
            } else if (!cell && nrOfNeighbors === 3) {
              return true; // Cell återuppstår
            } else {
              return cell; // Cell förblir 
            }
          })
        )
      );
    };

    if (running) {
      const intervalId = setInterval(simulate, 50);
      return () => clearInterval(intervalId);
    }
  }, [running, grid]);

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
    <div>
      <button onClick={() => setRunning(!running)}>
        {running ? "Stoppa" : "Starta"}
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
          setRunning(false);
        }}
      >
        Nollställ
      </button>
      <button onClick={() => setGrid(generateRandomGrid())}>Slumpa</button>

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
    </div>
  );
};

export default App;
