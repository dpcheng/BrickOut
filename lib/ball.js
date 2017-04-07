class Ball {
  constructor(ctx) {
    this.ctx = ctx;
    this.posX = 500;
    this.posY = 715;
    this.radius = 7.5;
    this.borders = [ this.posX - this.radius, this.posX + this.radius, this.posY - this.radius, this.posY + this.radius ];
    this.velocity = [0,0];
  }

  move() {
    this.wallBounce();
    this.posX += this.velocity[0];
    this.posY += this.velocity[1];
  }

  launch() {
    this.velocity = [4,-4];
  }

  draw() {
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
    } else if (this.borders[2] < 0 || this.borders[3] > 750) {
      this.velocity[1] = -this.velocity[1];
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
            this.velocity[1] = -this.velocity[1];
            this.updateBorders();
        }
    }
  }

  checkBrickContact(brickBorder) {
    // [left 0, right 1, top 2, bottom 3]
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
