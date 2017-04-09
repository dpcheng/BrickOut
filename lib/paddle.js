class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftCoord = 0;
    this.width = 150;
    this.borders = [this.leftCoord, this.leftCoord + this.width, 700, 720];
    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.handleHover.bind(this));
  }

  draw() {
    this.ctx.fillStyle="blue";
    this.ctx.fillRect(this.leftCoord, 700, this.width, 20);
  }

  handleHover(e) {
    this.leftCoord = e.screenX - (this.width / 2);
    if (this.leftCoord < 0) {
      this.leftCoord = 0;
    } else if (this.leftCoord > (1000 - this.width)) {
      this.leftCoord = (1000 - this.width);
    }
    this.updateBorders();
  }

  updateBorders() {
    this.borders = [this.leftCoord, this.leftCoord + this.width, 700, 720];
  }

}

export default Paddle;
