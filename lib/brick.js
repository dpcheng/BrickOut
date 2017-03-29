class Brick {
  constructor(leftCoord, stage) {
    this.leftCoord = leftCoord;
    this.stage = stage;
    this.draw();
  }

  draw() {
    let shape = new createjs.Shape();
    shape.graphics.beginFill("#ff0000").drawRect(this.leftCoord * 10, 100, 120, 30);
    this.stage.addChild(shape);
    //Update stage will render next frame
    this.stage.update();
  }
}

export default Brick;
