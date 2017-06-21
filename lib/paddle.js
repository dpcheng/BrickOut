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
    this.img = new Image;
    this.img.setAttribute("src", "https://res.cloudinary.com/dh6zremqy/image/upload/c_scale,h_50,w_200/v1498026742/Cedar_Baseball_Bat_c1jjsa.png");
  }
  draw() {
    this.ctx.drawImage(this.img, this.leftCoord - 5, this.height - 20, this.width + 10, 61);
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
