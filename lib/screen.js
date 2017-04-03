import Brick from './brick.js';
import Ball from './ball.js';
import Paddle from './paddle.js';

class Screen {
  constructor(ctx) {
    this.ctx = ctx;
    this.render = this.render.bind(this);
    this.paddle = new Paddle(this.ctx);
    this.bricks = [];
  }

  play() {
    setInterval(this.render, 1);
  }

  render() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    const dimensions = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
    const heights = [50, 85, 120, 155, 190, 225];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        this.bricks.push(new Brick(dimensions[i], heights[height], this.ctx));
      }
    }
    this.paddle.draw();
  }
}

export default Screen;
