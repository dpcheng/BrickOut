class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.leftCoord = 425;
    this.width = 150;
    this.height = 600;
    this.borderWidth = 1;
    this.borders = [this.leftCoord, this.leftCoord + this.width, this.height, this.height + 20];
    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.handleHover.bind(this));
    // this.img = new Image;
    // this.img.setAttribute("src", "http://vignette2.wikia.nocookie.net/fallout/images/6/66/Cedar_Baseball_Bat.png/revision/latest?cb=20150619160520");
    // this.img.setAttribute("style", `width: ${this.width}`);
    // this.img.setAttribute("height", 20);

  }
  draw() {
    this.ctx.fillStyle="black";
    this.ctx.fillRect(this.leftCoord, this.height, this.width, 20);
    this.ctx.fillStyle="blue";
    this.ctx.fillRect(this.leftCoord + this.borderWidth, this.height + this.borderWidth, this.width - (this.borderWidth * 3), 20 - (this.borderWidth * 2));

    // this.ctx.drawImage(this.img, 0, 0);
  }

  handleHover(e) {
    this.leftCoord = e.offsetX - (this.width / 2);
    if (this.leftCoord < 0) {
      this.leftCoord = 0;
    } else if (this.leftCoord > (1000 - this.width)) {
      this.leftCoord = (1000 - this.width);
    }
    this.updateBorders();
  }

  updateBorders() {
    this.borders = [this.leftCoord, this.leftCoord + this.width, this.height, this.height + 20];
  }

}

export default Paddle;
