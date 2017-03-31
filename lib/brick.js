class Brick {
  constructor(leftCoord, height, ctx) {
    this.leftCoord = leftCoord;
    this.height = height;
    this.ctx = ctx;
    this.draw();
  }

  draw() {
    this.ctx.fillStyle="#FF0000";
    this.ctx.fillRect(this.leftCoord * 10, this.height, 120, 30);
  }
}

export default Brick;
