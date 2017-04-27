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
    let dimensions = [0, 125, 250, 375, 500, 625, 750, 875, 1000];
    // let heights = [90, 125, 160, 195, 230, 265];
    let heights = [90, 160, 230];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        this.bricks.push(new Brick(dimensions[i], heights[height], this.ctx));
      }
    }

    dimensions = [-75, 50, 175, 300, 425, 550, 675, 800, 925, 1050];
    heights = [125, 195, 265];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        this.bricks.push(new Brick(dimensions[i], heights[height], this.ctx));
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.ctx.fillStyle="grey";
    this.ctx.fillRect(0, 0, 1000, 40);
    this.ctx.font = "30px Helvetica";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`High Score: ${this.highScore}`, 30, 30);

    this.ctx.textAlign = "center";
    this.ctx.fillText(`Score: ${this.points}`, 500, 30);
    this.ctx.fillText(`Paddles Left: ${this.paddleCount}`, 860, 30);

    this.paddle.draw();
    this.ball.checkPaddleContact(this.paddle.borders);
    this.bricks.forEach( brick => {
      if (this.ball.checkBrickContact(brick.borders)) {
        brick.borders = [0, 0, 0, 0];
        brick.width = 0;
        this.points += 100;
        if (this.points > this.highScore) this.highScore = this.points;
        if (this.points % 5100 === 0) {
          this.paddle.leftCoord = 425;
          this.ball.launched = false;
          this.ball.velocity = [0, 0];
          this.ball.posY = 592;
          this.ball.posX = this.paddle.leftCoord + 75;
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
