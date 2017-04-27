class Brick {
  constructor(leftCoord, height, ctx) {
    this.leftCoord = leftCoord;
    this.height = height;
    this.ctx = ctx;
    this.width = 35;
    this.borderWidth = 2;
    this.length = 125;
    this.borders = [this.leftCoord, this.leftCoord + this.length, this.height, this.height + this.width];
  }

  draw() {
    if (this.width) {
      this.ctx.fillStyle ="lightgrey";
      this.ctx.fillRect(this.leftCoord, this.height, this.length + 2, this.width + 2);
      this.ctx.fillStyle ="#E61938";
      this.ctx.fillRect(this.leftCoord + this.borderWidth + 1, this.height + this.borderWidth + 1, this.length - (this.borderWidth * 2), this.width - (this.borderWidth * 2));
    }
  }
}

export default Brick;
