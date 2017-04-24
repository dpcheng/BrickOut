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
    this.ball = new Ball(this.ctx, this);
    this.paddleCount = 3;
    this.highScore = 0;
    this.points = 0;
  }

  play() {
    setInterval(this.render, 1);
  }

  createBricks() {
    this.bricks = [];
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

    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`Score: ${this.points}`, 30, 30);

    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Paddles Left: ${this.paddleCount}`, 850, 30);

    this.paddle.draw();
    this.ball.checkPaddleContact(this.paddle.borders);
    this.bricks.forEach( brick => {
      if (this.ball.checkBrickContact(brick.borders)) {
        brick.borders = [0, 0, 0, 0];
        brick.width = 0;
        this.points += 100;
        if (this.points % 4800 === 0) {
          this.ball = new Ball(this.ctx);
          this.paddle.leftCoord = 425;
          this.bricks = [];
          this.createBricks();
        }
      } else {
        brick.draw();
      }
    });
    this.ball.move();
    this.ball.draw();
  }
}

export default Screen;
