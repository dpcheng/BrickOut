import Screen from './screen.js';

document.addEventListener("DOMContentLoaded", () => {
    const stage = new createjs.Stage("game-canvas");
    const screen = new Screen(stage);
    screen.play();
  });
