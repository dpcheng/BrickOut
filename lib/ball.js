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
      this.velocity = [0, -2];
    } else if (!this.launched) {
      this.launched = true;
      this.velocity = [0,-2];
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

  draw() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";

    if (this.scrn.paddleCount < 1) {
      this.ctx.fillText("Game Over",500,350);
      this.ctx.font = "24px Arial";
      this.ctx.fillText(`Score: ${this.scrn.points}`,500,380);
      this.ctx.fillText(`Click to start a new game!`,500,450);
    } else if (!this.launched) {
      this.ctx.fillText("Click to launch ball",500,350);
    }
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#003300';
    this.ctx.stroke();
  }

  wallBounce() {
    this.updateBorders();
    if (this.borders[0] < 0 || this.borders[1] > 1000) {
      this.velocity[0] = -this.velocity[0];
    } else if (this.borders[2] < 0 || this.borders[3] > 650) {
      this.velocity[1] = -this.velocity[1];
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
            this.velocity[0] = -((paddleBorder[1] - 75 - this.posX) / 75) * 3;
            this.velocity[1] = -this.velocity[1] - 0.15;
            this.updateBorders();
        }
    }
  }

  checkBrickContact(brickBorder) {
    // [left 0, right 1, top 2, bottom 3]
    // top or bottom between brick's top or bottom
    // if ( ( (this.borders[2] > brickBorder[2] &&
    //   this.borders[2] < brickBorder[3]) ||
    //   (this.borders[3] > brickBorder[2] &&
    //     this.borders[3] < brickBorder[3]) ) &&
    //   ( (this.posX > brickBorder[0] &&
    //   this.posX < brickBorder[1]) ||
    //   (this.posX > brickBorder[0] &&
    //   this.posX < brickBorder[1]) ) ) {
    //
    //     this.velocity[1] = -this.velocity[1];
    //     this.updateBorders();
    //     return true;
    //
    // } else if (( (this.borders[0] > brickBorder[0] &&
    //   this.borders[0] < brickBorder[1]) ||
    //   (this.borders[1] > brickBorder[0] &&
    //     this.borders[1] < brickBorder[1]) ) &&
    //   ( (this.posY > brickBorder[2] &&
    //   this.posY < brickBorder[3]) ||
    //   (this.posY > brickBorder[2] &&
    //   this.posY < brickBorder[3]) ) ) {
    //
    //     this.velocity[0] = -this.velocity[0];
    //     this.updateBorders();
    //     return true;
    //
    // }
    // return false;


    if ( (this.borders[2] > brickBorder[2] &&
      this.borders[2] < brickBorder[3]) ||
      (this.borders[3] > brickBorder[2] &&
      this.borders[3] < brickBorder[3]) )  {


        if ( (this.borders[0] > brickBorder[0] &&
          this.borders[0] < brickBorder[1]) ||
          (this.borders[1] > brickBorder[0] &&
            this.borders[1] < brickBorder[1]) ) {

            if ( ( (this.borders[1] > brickBorder[0] - 2) &&
              (this.borders[1] < brickBorder[0] + 2) ) ||
              ( (this.borders[0] > brickBorder[1] - 2) &&
              (this.borders[0] < brickBorder[1] + 2) ) ) {
                this.velocity[0] = -this.velocity[0];
              } else {
                this.velocity[1] = -this.velocity[1];
              }
            this.updateBorders();
            return true;
        }
    }

    return false;
  }

}

export default Ball;
