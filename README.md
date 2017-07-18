# BrickOut

[BrickOut][brickout] is a browser game inspired by the arcade game Breakout. The objective is to clear as many bricks as possible by bouncing the baseball between the bricks and the baseball bat. The game ends when the player misses three baseballs.

[![BrickOut][game]][brickout]

## Features

  - Intuitive mouse control of baseball bat
  - Custom baseball bounce physics
  - Score and high score tracking


## Project Design
Design of BrickOut started with a [proposal][proposal] to aid in organization during development.

## Technologies

* JavaScript
  - Object-oriented programming of Bricks, Baseballs, Bat, and the interactions between the objects.
* HTML Canvas
  - Renders each object as the game runs.
* CSS
  - Styles the title, background, and sidebars.

## Checking Ball/Brick contact
  The most complex part of this project was a method determining whether the ball is is in contact with a brick. There were many iterations before I was able to find a solution I was satisfied with.

  First, I built the `Ball` class with a borders attribute:
  ```javaScript
  this.borders = [
    this.posX - this.radius, // left border
    this.posX + this.radius, // right border
    this.posY - this.radius, // top border
    this.posY + this.radius  // bottom border
  ];
  ```

  Next I built a `checkBrickContact` method for the `Ball` class:
  ```javascript
  // Will return a boolean, true if in contact with a brick
  checkBrickContact(brickBorders) {

    // This will check whether the right or left border of the ball
    // is between the brick's right and left border
    if (
      (this.borders[2] > brickBorders[2] && this.borders[2] < brickBorders[3]) ||
      (this.borders[3] > brickBorders[2] && this.borders[3] < brickBorders[3]) ) {

      // Check whether the top (or bottom) border of the ball
      // is between the brick's top and bottom border
      if (
        (this.borders[0] > brickBorders[0] && this.borders[0] < brickBorders[1]) ||
        (this.borders[1] > brickBorders[0] && this.borders[1] < brickBorders[1])
        ) {

        // Once I determine part of the ball is within the brick's borders,
        // we check which of the brick's borders the ball is bouncing off of

        // This checks if the right (or left) side of the ball
        // is in contact with the left (or right) side of the brick.
        if (
          ( (this.borders[1] > brickBorders[0] - 2) && (this.borders[1] < brickBorders[0] + 2) ) ||
          ( (this.borders[0] > brickBorders[1] - 2) && (this.borders[0] < brickBorders[1] + 2) )
          ) {

          // reverse ball's horizontal velocity
          this.velocity[0] = -this.velocity[0];

          // Check if the ball is closer to right or left border.
          // Then I adjust the position of the ball so the ball
          // is no longer partially within the brick
          if (Math.abs(brickBorders[0] - this.posX) >
          Math.abs(brickBorders[1] - this.posX)) {
            this.posX = brickBorders[1] + this.radius;
          } else {
            this.posX = brickBorders[0] - this.radius;
          }

        // This block will run if the top (or bottom) side of the ball
        //  is in contact with the bottom (or top) of the brick
        } else {
          // reverse ball's vertical velocity
          this.velocity[1] = -this.velocity[1];

          // Check if the ball is closer to top or bottom border.
          // Then I adjust the position of the ball
          // so a portion of the ball is not within the brick
          if (Math.abs(brickBorders[2] - this.posY) >
          Math.abs(brickBorders[3] - this.posY)) {
            this.posY = brickBorders[3] + this.radius;
          } else {
            this.posY = brickBorders[2] - this.radius;
          }
        }

      // The position of the ball is now different,
      // so I update the ball's borders
      this.updateBorders();
      return true;
      }
    }

    return false;
  }
  ```

## Future Features

In addition to the features listed above, there are several features I would like to add in the future.

### Power-ups

Each power-up will last until a baseball touches the floor.

  - Long Bat
    * This will extend the length of the baseball bat.

  - Sticky Bat
    * When the baseball comes in contact with the bat, the baseball will be "stuck". The player can then reposition the bat before clicking and launching the ball at will.

### Power-downs

Each power-down will last either 15 seconds or until a baseball touches the floor (whichever occurs first).

  - Short Bat
    * The baseball bat's length is decreased.

  - Fast Ball
    * The speed of the baseball is significantly increased.


[brickout]: https://dpcheng.github.io/BrickOut/
[game]: ./docs/game.png "BrickOut game screen"
[proposal]: ./docs/proposal.md
