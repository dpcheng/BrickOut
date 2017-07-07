class Ball {
  constructor(ctx, scrn, launched = false) {
    this.ctx = ctx;
    this.posX = 500;
    this.posY = 592;
    this.radius = 7.5;
    this.launched = false;
    this.borders = [ this.posX - this.radius, this.posX + this.radius, this.posY - this.radius, this.posY + this.radius ];
    this.velocity = [0,0];
    this.scrn = scrn;
    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.handleHover.bind(this));
    this.canvas.addEventListener("click", this.launch.bind(this));
  }

  move() {
    this.wallBounce();
    this.posX += this.velocity[0];
    this.posY += this.velocity[1];
  }

  launch() {
    if (this.scrn.paddleCount < 1) {
      this.scrn.paddleCount = 3;
      if (this.scrn.points > this.scrn.highScore) this.scrn.highScore = this.scrn.points;
      this.scrn.points = 0;
      this.scrn.createBricks();
      this.launched = true;
      this.velocity = [0, -1.5];
    } else if (!this.launched) {
      this.launched = true;
      this.velocity = [0,-1.5];
    }
  }

  handleHover(e) {
    if (!this.launched) {
      this.posX = e.offsetX;
      if (this.posX < 0) {
        this.posX = 0;
      } else if (this.posX > 1000) {
        this.posX = 1000;
      }
      this.updateBorders();
    }
  }

  drawText(text, x, y) {
    this.ctx.strokeStyle = 'black';

    this.ctx.miterLimit = 2;
    this.ctx.lineJoin = 'circle';

    this.ctx.lineWidth = 6;
    this.ctx.strokeText(text, x, y);
    this.ctx.lineWidth = 1;
    this.ctx.fillText(text, x, y);
  }

  draw() {
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    if (this.scrn.paddleCount < 1) {
      this.ctx.fillStyle = "red";
      this.drawText("Game Over",500,350);
      this.ctx.font = "24px Arial";
      if (this.scrn.points === this.scrn.highScore) {
        this.ctx.fillStyle = "green";
        this.drawText('New Highscore!', 500, 420);
        this.ctx.fillStyle = "red";
      }
      this.drawText(`Score: ${this.scrn.points}`, 500, 380);
      this.drawText(`Click to start a new game!`, 500, 460);
    } else if (!this.launched) {
      this.ctx.fillStyle = "white";
      if (this.scrn.paddleCount == 3) {
        this.drawText("Clear as many Bricks as you can!", 500, 350);
        this.drawText("Use your mouse to move the bat and keep the baseball from falling", 500, 400);
        this.drawText("Click to start!", 500, 450);
      } else {
        this.drawText("Click to throw baseball!", 500, 400);
      }
    }

    this.drawBall();
  }

  drawBall() {
    // drawing the baseball
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    // drawing the baseball's stitches
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'red';
    this.ctx.moveTo(this.posX - (this.radius / 1.5), this.posY - (this.radius / 1.5));
    this.ctx.bezierCurveTo(this.posX - 1, this.posY, this.posX - 1, this.posY, this.posX - (this.radius / 1.5), this.posY + (this.radius / 1.5));

    this.ctx.moveTo(this.posX + (this.radius / 1.5), this.posY - (this.radius / 1.5));
    this.ctx.bezierCurveTo(this.posX + 1, this.posY, this.posX + 1, this.posY, this.posX + (this.radius / 1.5), this.posY + (this.radius / 1.5));
    this.ctx.stroke();
  }

  wallBounce() {
    this.updateBorders();
    if (this.borders[0] < 0 || this.borders[1] > 1000) {
      this.velocity[0] = -this.velocity[0];
    } else if (this.borders[2] < 40 || this.borders[3] > 650) {
      this.velocity[1] = -this.velocity[1];
      if (this.borders[2] < 40) this.posY = 40 + this.radius;
    } else if (this.borders[3] > 640) {
      this.velocity = [0,0];
      this.posY = 592;
      this.posX = this.scrn.paddle.leftCoord + 75;
      this.launched = false;
      this.scrn.paddleCount -= 1;
    }
  }

  updateBorders() {
    this.borders = [ this.posX - this.radius, this.posX + this.radius, this.posY - this.radius, this.posY + this.radius ];
  }

  checkPaddleContact(paddleBorder) {
    if ( (this.borders[2] > paddleBorder[2] &&
      this.borders[2] < paddleBorder[3]) ||
      (this.borders[3] > paddleBorder[2] &&
      this.borders[3] < paddleBorder[3]) )  {

        if ( (this.borders[0] > paddleBorder[0] &&
          this.borders[0] < paddleBorder[1]) ||
          (this.borders[1] > paddleBorder[0] &&
            this.borders[1] < paddleBorder[1]) ) {
            this.posY = paddleBorder[2] - this.radius;
            this.velocity[0] = -((paddleBorder[1] - 75 - this.posX) / 75) * 2;
            this.velocity[1] = -this.velocity[1] - 0.10;
            this.updateBorders();
        }
    }
  }

  checkBrickContact(brickBorders) {
    if (
      (this.borders[2] > brickBorders[2] && this.borders[2] < brickBorders[3]) ||
      (this.borders[3] > brickBorders[2] && this.borders[3] < brickBorders[3]) ) {

      if (
        (this.borders[0] > brickBorders[0] && this.borders[0] < brickBorders[1]) ||
        (this.borders[1] > brickBorders[0] && this.borders[1] < brickBorders[1])
        ) {

        if (
          ( (this.borders[1] > brickBorders[0] - 2) && (this.borders[1] < brickBorders[0] + 2) ) ||
          ( (this.borders[0] > brickBorders[1] - 2) && (this.borders[0] < brickBorders[1] + 2) )
          ) {

          this.velocity[0] = -this.velocity[0];

          if (Math.abs(brickBorders[0] - this.posX) >
          Math.abs(brickBorders[1] - this.posX)) {
            this.posX = brickBorders[1] + this.radius;
          } else {
            this.posX = brickBorders[0] - this.radius;
          }

        } else {
          this.velocity[1] = -this.velocity[1];

          if (Math.abs(brickBorders[2] - this.posY) >
          Math.abs(brickBorders[3] - this.posY)) {
            this.posY = brickBorders[3] + this.radius;
          } else {
            this.posY = brickBorders[2] - this.radius;
          }

        }

      this.updateBorders();
      return true;
      }
    }

    return false;
  }

}

export default Ball;
