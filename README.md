# Memory Matching Game

A simple and fun memory matching game built using React. The game is fully configurable, extendible, and scalable, providing an engaging way to test and improve your memory. The project is styled using Tailwind CSS and is deployed on Vercel/Netlify.

## Features

- Configurable grid size based on the URL path.
- Fully responsive design using Tailwind CSS.
- Game statistics: track the number of moves and elapsed time.
- Scalable card generation and randomization on the frontend.
- Modular components with clean code structure.
- Deployed on Vercel/Netlify.

## Demo

Check out the live demo of the game: [https://memory-matching.netlify.app/](https://memory-matching.netlify.app/)

### Requirements

-Node.js (>=14.x)
-npm (>=6.x) or Yarn (>=1.x)

## Installation

### `Clone the repository`

```
git clone https://github.com/your-username/memory-matching-game.git
cd memory-matching-game
```
### `Install dependencies`

#### Using npm:
```
npm install
```

#### Using yarn:
```
yarn install
```

## Usage

### `Start the development server:`

#### Using npm:
```
npm start
```

#### Using yarn:
```
yarn start
```

### Play the game:

- Open your browser and navigate to http://localhost:3000.
- Visit /2, /4, /6, /8, or /10 in the URL to play on a 2x2, 4x4, 6x6, 8x8, or 10x10 grid.

## Game Instructions

- The game starts when you click on the first card.
- Flip the cards to reveal the images.
- Match all pairs to win the game.
- Your total moves and the time taken to complete the game will be displayed upon completion.

## Data Model

The game does not require any backend services. However, if you were to integrate a backend, the expected data model might look like this:

```
{
  "cards": [
    {
      "id": "unique-card-id",
      "image": "image-url",
      "isFlipped": false,
      "isMatched": false,
      "isInvisible:" false
    }
  ],
  "gameStatus": {
    "moves": 0,
    "elapsedTime": 0,
    "gridSize": 4
  }
}

```

### Scalable Considerations:

- Card Pool: A larger pool of card images can be maintained for different grid sizes.
- Game State: The game state can be saved to allow players to resume later.


## Contributing:

Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License. For any inquiries or requests, please contact [anshul.kasana98@gmail.com](mailto:anshul.kasana98@gmail.com).