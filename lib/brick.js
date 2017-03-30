class Brick {
  constructor(leftCoord, height, stage) {
    this.leftCoord = leftCoord;
    this.height = height;
    this.stage = stage;
    this.draw();
  }

  draw() {
    let shape = new createjs.Shape();
    shape.graphics.beginFill("#ff0000").drawRect(this.leftCoord * 10, this.height, 120, 30);
    this.stage.addChild(shape);
  }
}

export default Brick;
