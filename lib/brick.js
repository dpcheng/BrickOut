class Brick {
  constructor(leftCoord, height, ctx) {
    this.leftCoord = leftCoord;
    this.height = height;
    this.ctx = ctx;
    this.borders = [this.leftCoord, this.leftCoord + 120, this.height, this.height + 30];
  }

  draw() {
    this.ctx.fillStyle="#FF0000";
    this.ctx.fillRect(this.leftCoord, this.height, 120, 30);
  }
}

export default Brick;
