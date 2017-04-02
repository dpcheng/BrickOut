class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftCoord = 0;
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
}

export default Paddle;
