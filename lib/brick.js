class Brick {
  constructor(leftCoord, height, ctx) {
    this.leftCoord = leftCoord + 2.5;
    this.height = height;
    this.ctx = ctx;
    this.width = 30;
    this.borders = [this.leftCoord, this.leftCoord + 120, this.height, this.height + this.width];
  }

  draw() {
    this.ctx.fillStyle="darkgray";
    this.ctx.fillRect(this.leftCoord, this.height, 120, this.width);
    this.ctx.fillStyle="darkred";
    this.ctx.fillRect(this.leftCoord + 5, this.height + 5, 110, this.width - 10);
  }
}

export default Brick;
