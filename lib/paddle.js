class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftCoord = 0;
    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.handleHover.bind(this));
    key("right", this.handleRight.bind(this));
    key("left", this.handleLeft.bind(this));
  }

  draw() {
    this.ctx.fillStyle="blue";
    this.ctx.fillRect(this.leftCoord, 700, 150, 20);
  }

  move(direction) {

  }

  handleHover(e) {
    this.leftCoord = e.screenX - 75;
  }

  handleRight(e) {
    this.leftCoord += 10;
  }

  handleLeft(e) {
    this.leftCoord -= 10;
  }
}

export default Paddle;
