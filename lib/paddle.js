class Paddle {
  constructor(stage) {
    this.stage = stage;
    this.leftCoord = 0;
    this.draw();
  }

  draw() {
    let shape = new createjs.Shape();
    shape.graphics.beginFill("blue").drawRect(this.leftCoord, 600, 150, 20);
    this.stage.addChild(shape);
  }

  move(direction) {

  }
}

export default Paddle;
