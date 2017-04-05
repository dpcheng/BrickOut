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
    this.posX += this.velocity[0];
    this.posY += this.velocity[1];
    this.wallBounce();
  }

  launch() {
    this.velocity = [2,-2];
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

  checkContact(paddleBorder) {
    if ((this.borders[0] > paddleBorder[0] && this.borders[1] < paddleBorder[1]) &&
      ((this.borders[2] > 700 && this.borders[2] < 720) ||
        (this.borders[3] > 700 && this.borders[3] < 720 ))) {
      this.velocity[1] = -this.velocity[1];
    }
  }

}

export default Ball;
