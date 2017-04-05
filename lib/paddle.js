class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftCoord = 0;
    this.borders = [this.leftCoord, this.leftCoord + 150, 700, 720];
    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.handleHover.bind(this));
  }

  draw() {
    this.ctx.fillStyle="blue";
    this.ctx.fillRect(this.leftCoord, 700, 150, 20);
  }

  handleHover(e) {
    this.leftCoord = e.screenX - 75;
  }

  updateBorders() {
    this.borders = [this.leftCoord, this.leftCoord + 150, 700, 720];
  }

}

export default Paddle;
