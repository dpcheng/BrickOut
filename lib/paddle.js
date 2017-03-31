class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftCoord = 0;
    document.addEventListener("click", this.handleRight.bind(this));
    document.addEventListener("keyleft", this.handleLeft.bind(this));
  }

  draw() {
    this.ctx.fillStyle="blue";
    this.ctx.fillRect(this.leftCoord, 700, 150, 20);
  }

  move(direction) {

  }

  handleRight(e) {
    this.leftCoord += 10;
  }

  handleLeft(e) {
    this.leftCoord -= 10;
  }
}

export default Paddle;
