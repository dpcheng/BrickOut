class Ball {
  constructor(ctx) {
    this.ctx = ctx;
    this.posX = 500;
    this.posY = 715;
    this.velocity = [0,0];
  }

  move() {
    this.posX += this.velocity[0];
    this.posY += this.velocity[1];
  }

  launch() {
    this.velocity = [1,-1];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, 10, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#003300';
    this.ctx.stroke();
  }
}

export default Ball;
