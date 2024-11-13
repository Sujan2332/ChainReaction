import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css';

// Sound Effects
import clickSound from '../assets/click.wav';
import winnerSound from '../assets/winner.mp3';
import acquisitionSound from '../assets/acquire.wav';

const allPlayers = [
  { color: 'red' },
  { color: 'green' },
  { color: 'blue' },
  { color: 'yellow' },
  { color: 'purple' },
  { color: 'cyan' },
  { color: 'brown' },
  { color: 'orange' },
  { color: 'hotpink' },
  { color: 'lime' },
  { color: 'grey' }
];

function App() {
  const [numPlayers, setNumPlayers] = useState(2); // Default to 2 players
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isDarkMode, setIsDrkMode] = useState(true);
  const [previousBoard, setPreviousBoard] = useState([]); // Track previous state of the board

  const handleStartGame = () => {
    setGameStarted(true);
    setPreviousBoard([]); // Clear the previous board when starting the game
  };

  const handlePlayerChange = (e) => {
    const newNumPlayers = Number(e.target.value);
    setNumPlayers(newNumPlayers);
  };

  const nextTurn = () => {
    // Skip eliminated players and find the next valid player
    let nextPlayer = (currentPlayer + 1) % numPlayers;
    while (eliminatedPlayers.includes(nextPlayer)) {
      nextPlayer = (nextPlayer + 1) % numPlayers;
    }

    // If there's only one player left, declare the winner
    if (eliminatedPlayers.length === numPlayers - 1) {
      const winnerIndex = [...Array(numPlayers).keys()].find(i => !eliminatedPlayers.includes(i));
      setWinner(winnerIndex);
    } else {
      setCurrentPlayer(nextPlayer);
    }
  };

  // This function checks if a player has completely acquired another player's color
  const checkEliminations = (board) => {
    // Ensure previousBoard is not empty
    if (previousBoard.length === 0) {
      setPreviousBoard(board);
      return;
    }

    const occupiedCells = board.flat(); // Flatten the 2D board into 1D array to easily track occupied cells

    // Compare the current board with the previous one to check for acquisitions
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const currentCell = board[row][col];
        const previousCell = previousBoard[row] ? previousBoard[row][col] : null;

        // Check if the ownership of the cell has changed (i.e., the cell is acquired by a different player)
        if (currentCell !== null && currentCell !== previousCell) {
          // Log the cell change
          console.log(`Cell at [${row}, ${col}] changed from ${previousCell} to ${currentCell}`);
          // Play the acquisition sound ONLY if the current cell is not the same as the previous cell
          const acquisitionAudio = new Audio(acquisitionSound);
          acquisitionAudio.play();
        }
      }
    }

    // Update the previous board state to the current one for the next check
    setPreviousBoard(board);
  };

  const toggleTheme = () => {
    setIsDrkMode(!isDarkMode);
  };

  const darkTheme = {
    backgroundColor: "black",
    color: "white",
    transition: "all 0.3s ease",
    button: {
      boxShadow: "2px 2px 2px black",
      backgroundColor: "white"
    }
  };

  const lightTheme = {
    backgroundColor: "white",
    color: "black",
    transition: "all 0.3s ease",
    button: {
      boxShadow: "2px 2px 2px white",
      backgroundColor: "black"
    }
  };

  useEffect(() => {
    // Play the winner sound only when a winner is declared
    if (winner !== null) {
      const winnerAudio = new Audio(winnerSound);
      winnerAudio.play();
    }
  }, [winner]);  // Dependency array: triggers when winner state changes

  useEffect(() => {
    // Play the click sound only when the turn changes
    const clickAudio = new Audio(clickSound);
    clickAudio.play();
  }, [currentPlayer]);  // Dependency array: triggers when currentPlayer state changes

  return (
    <div className="App" style={isDarkMode ? darkTheme : lightTheme}>
      <button onClick={toggleTheme} style={isDarkMode ? darkTheme : lightTheme}>
        {isDarkMode ? "🌑" : "🌕"}
      </button>
      <h1>Chain Reaction Game</h1>
      {!gameStarted ? (
        <div>
          <label style={{ fontSize: "20px" }}>
            <div>Select Number of Players:</div>
            <select value={numPlayers} onChange={handlePlayerChange} style={isDarkMode ? darkTheme : lightTheme}>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 2}>
                  {i + 2} Players
                </option>
              ))}
            </select>
          </label>
          <div>
            <button onClick={handleStartGame} style={isDarkMode ? darkTheme : lightTheme}>Start Game</button>
          </div>
        </div>
      ) : (
        <>
          {winner !== null ? (
            <div className="winner-celebration">
              <h6
                style={{
                  fontSize: '1.8rem',
                  color: allPlayers[winner].color,
                  animation: 'winnerAnimation 3s ease-in-out' // Added animation
                }}
              >
                🎉🎉🎉 <br /> 🌟Player {winner + 1}🌟<br />💎💎({allPlayers[winner].color.toUpperCase()})💎💎<br/>💥💥💥Wins !!!💥💥💥 <br />🎉🎉🎉
              </h6>
              <p style={{ fontSize: '1.5rem' }}>Congratulations! You've conquered all your opponents!</p>
            </div>
          ) : (
            <Board
              rows={8}
              cols={6}
              players={allPlayers.slice(0, numPlayers)}
              currentPlayer={currentPlayer}
              nextTurn={nextTurn}
              eliminatedPlayers={eliminatedPlayers}
              checkEliminations={checkEliminations}
              setWinner={setWinner}  // Passed correctly here
            />
          )}
          <div>
            <button onClick={() => window.location.reload()} style={isDarkMode ? darkTheme : lightTheme}>
              Restart Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
