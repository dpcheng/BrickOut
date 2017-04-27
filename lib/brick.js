class Brick {
  constructor(leftCoord, height, ctx) {
    this.leftCoord = leftCoord + 2.5;
    this.height = height;
    this.ctx = ctx;
    this.width = 30;
    this.borderWidth = 3;
    this.borders = [this.leftCoord, this.leftCoord + 120, this.height, this.height + this.width];
  }

  draw() {
    if (this.width) {
      this.ctx.fillStyle ="lightgrey";
      this.ctx.fillRect(this.leftCoord, this.height, 120, this.width);
      this.ctx.fillStyle ="#E61938";
      this.ctx.fillRect(this.leftCoord + this.borderWidth, this.height + this.borderWidth, 120 - (this.borderWidth * 2), this.width - (this.borderWidth * 2));
    }
  }
}

export default Brick;
