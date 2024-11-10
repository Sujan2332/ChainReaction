import React, { useState } from 'react';
import Cell from './Cell'; // Assuming you have a Cell component

const Board = ({ rows, cols, players, currentPlayer, nextTurn, setWinner, checkEliminations }) => {
  const [grid, setGrid] = useState(createInitialGrid(rows, cols));

  const handleCellClick = (row, col) => {
    const cell = grid[row][col];
    if (cell.owner !== null && cell.owner !== currentPlayer) return;

    const newGrid = [...grid];
    newGrid[row][col].orbs += 1;
    newGrid[row][col].owner = currentPlayer;

    handleExplosions(newGrid, row, col, currentPlayer);
    setGrid(newGrid);

    // Only check for winner after every valid move
    checkWinner(newGrid);
    nextTurn();
  };

  const handleExplosions = (grid, row, col, player) => {
    const cell = grid[row][col];
    const criticalMass = getCriticalMass(row, col, rows, cols);

    if (cell.orbs >= criticalMass) {
      cell.orbs -= criticalMass;
      cell.owner = player;

      for (const [r, c] of getNeighbors(row, col, rows, cols)) {
        grid[r][c].orbs += 1;
        grid[r][c].owner = player;
        handleExplosions(grid, r, c, player);
      }
    }
  };

  const checkWinner = (grid) => {
    const owners = grid.flat().map((cell) => cell.owner);
    const uniqueOwners = [...new Set(owners.filter((owner) => owner !== null))];

    // Ensure that at least one player has moved (i.e., not just Player 1)
    if (uniqueOwners.length === 1 && owners.includes(null) === false) {
      setWinner(uniqueOwners[0]);  // Set the winner if there's only one player left
    }
  };

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              data={cell}
              color={players[cell.owner]?.color}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const createInitialGrid = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ orbs: 0, owner: null }))
  );
};

const getCriticalMass = (row, col, rows, cols) => {
  if ((row === 0 || row === rows - 1) && (col === 0 || col === cols - 1)) return 2;
  if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) return 3;
  return 4;
};

const getNeighbors = (row, col, rows, cols) => {
  const neighbors = [];
  if (row > 0) neighbors.push([row - 1, col]);
  if (row < rows - 1) neighbors.push([row + 1, col]);
  if (col > 0) neighbors.push([row, col - 1]);
  if (col < cols - 1) neighbors.push([row, col + 1]);
  return neighbors;
};

export default Board;
