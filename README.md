# BrickOut

[![BrickOut][game]][brickout]

[BrickOut][brickout] is a browser game inspired by the arcade game Breakout. The objective is to clear as many bricks as possible by bouncing the baseball between the bricks and the baseball bat. The game ends when the player misses three baseballs.

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
[game]: ./docs/game.png
[proposal]: ./docs/proposal.md
