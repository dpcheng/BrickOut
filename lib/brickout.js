import Screen from './screen.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const screen = new Screen(ctx);
  screen.play();
});
