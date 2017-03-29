class Brick {
  constructor(leftCoord, rightCoord, stage) {
    this.leftCoord = leftCoord;
    this.rightCoord = rightCoord;
    this.stage = stage;
    this.draw();
  }

  draw() {
    let rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    rectangle.x = rectangle.y = 50;
    //Add Shape instance to stage display list.
    this.stage.addChild(rectangle);
    //Update stage will render next frame
    this.stage.update();
  }
}

export default Brick;
