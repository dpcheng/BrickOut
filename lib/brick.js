class Brick {
  constructor(leftCoord, height, ctx) {
    this.leftCoord = leftCoord + 2.5;
    this.height = height;
    this.ctx = ctx;
    this.width = 30;
    this.borders = [this.leftCoord, this.leftCoord + 120, this.height, this.height + this.width];
  }

  draw() {
    this.ctx.fillStyle="#FF0000";
    this.ctx.fillRect(this.leftCoord, this.height, 120, this.width);
  }
}

export default Brick;
