import Brick from './brick.js';
import Ball from './ball.js';
import Paddle from './paddle.js';

class Screen {
  constructor(ctx, stage) {
    this.ctx = ctx;
    this.stage = stage;
  }

  play() {
    const dimensions = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
    for (let i = 0; i < dimensions.length - 1; i++) {
      new Brick(dimensions[i], dimensions[i + 1], this.stage);
    }
  }
}

export default Screen;
