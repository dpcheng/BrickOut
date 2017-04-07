import Brick from './brick.js';
import Ball from './ball.js';
import Paddle from './paddle.js';

class Screen {
  constructor(ctx) {
    this.ctx = ctx;
    this.render = this.render.bind(this);
    this.paddle = new Paddle(this.ctx);
    this.bricks = [];
    this.createBricks();
    this.ball = new Ball(this.ctx);
  }

  play() {
    this.ball.launch();
    setInterval(this.render, 10);
  }

  createBricks() {
    const dimensions = [0, 125, 250, 375, 500, 625, 750, 875, 1000];
    const heights = [50, 85, 120, 155, 190, 225];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        this.bricks.push(new Brick(dimensions[i], heights[height], this.ctx));
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.paddle.draw();
    this.ball.checkPaddleContact(this.paddle.borders);
    this.bricks.forEach( brick => {
      if (this.ball.checkBrickContact(brick.borders)) {
        brick.borders = [0, 0, 0, 0];
        brick.height = 0;
        brick.leftCoord = 0;
        brick.width = 0;
      } else {
        brick.draw();
      }
    });
    this.ball.move();
    this.ball.draw();
  }
}

export default Screen;
