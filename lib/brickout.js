import Screen from './screen.js';

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const stage = new createjs.Stage("game-canvas");
    const screen = new Screen(ctx, stage);
    screen.play();
  });
