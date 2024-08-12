export const playInstruction = [
  "Choose a grid size to start the game.",
  "Once the game begins, flip the cards to reveal the images.",
  "Match pairs of identical images to clear them from the grid.",
  "The game ends when all pairs are matched. Try to complete the game with the fewest moves and in the shortest time!",
];

export const gridList = [2, 4, 6, 8, 10];

export const gameInstructions = [
  "Timer will start when you start the game.",
  "Flip the cards to reveal the images.",
  "Match all pairs to win the game!",
];

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};
