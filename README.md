# Chain Reaction Game

## Description
The Chain Reaction Game is a multiplayer strategy game where players take turns to occupy cells on a grid, trying to eliminate other players. The game supports multiple players, themes (dark and light mode), and includes sound effects for interactions and winning. The objective is to be the last player remaining after eliminating all others.

# Preview
https://sujan2332.github.io/ChainReaction/

## Features
- **Multiplayer Support**: Choose the number of players (from 2 to 10 players).
- **Real-Time Turn System**: Players take turns, and eliminated players are skipped.
- **Sound Effects**: Enjoy sound effects for turn changes, acquisitions, and a celebration when a player wins.
- **Dark/Light Mode Toggle**: Switch between dark and light themes.
- **Winner Celebration**: The winner is celebrated with a special message and sound.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
   git clone https://github.com/sujan2332/ChainReaction.git
   
2. **Navigate into the project directory:**

   ```bash
   cd ChainReaction
   
3. **Install dependencies:**

   ```bash
   npm install 

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
   git clone https://github.com/sujan2332/ChainReaction.git
   
2. **Navigate into the project directory:**

   ```bash
   cd ChainReaction
   
3. **Install dependencies:**


4. **Run the application:**

   ```bash
   npm start
   
This will start the development server and open the app in your default browser.

## Usage

### Adding a Player
- Select the number of players from 2 to 10 using the dropdown menu.
- Click **"Start Game"** to begin.

### Changing Turns
- Players take turns automatically. The current player's turn is highlighted, and the next valid player is chosen based on eliminations.

### Eliminations
- A player is eliminated when all their cells are acquired by other players. The game will check and notify when a player's color is acquired.

### Winner
- The game automatically declares a winner when only one player is left.

### Themes
- Toggle between light and dark themes using the **moon/sun** button at the top.

### Sound Effects
- Each turn change, cell acquisition, and the winner's celebration has its own sound effects.

## Components

### `App.js`
The main entry point that manages the game state (e.g., number of players, current player, winner) and themes. It also renders the `Board` component and manages game-related events.

### `Board.js`
The game board component responsible for rendering the grid and handling player actions on the board.

### `App.css`
The CSS file that includes styles for both light and dark themes, animations for the winner's celebration, and other UI components.

##File Structure

chain-reaction-game/
├── public/
│   ├── index.html
├── src/
│   ├── assets/
│   │   ├── click.wav
│   │   ├── winner.mp3
│   │   ├── acquire.wav
│   ├── components/
│   │   ├── App.js
│   │   ├── Board.js
|   |   |── Cell.js
│   ├── App.css
├── package.json
├── README.md
└── .gitignore

## License

###This project is licensed under the MIT License - see the LICENSE file for details.

