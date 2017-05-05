# BrickOut Proposal

## Background
BrickOut is inspired by the video game Breakout. Breakout was released by Atari in 1976. The player controls a paddle that can only travel horizontally along the bottom of the screen. There are 8 rows of bricks near the top of the screen. The player must bounce a ball from the paddle and hit each brick to clear them. The ball bounces off each surface except the bottom of the screen. If the ball touches the bottom of the screen, the player loses a paddle. The player has 2 paddles in reserve, with 3 total. Once the player no longer has any of the paddles, the player loses. The player passes the level when all the bricks are cleared.

## Functionality & MVP
In BrickOut, the user is able to:
- [ ] Start, pause, or reset the game
- [ ] Move the paddle with the left/right arrows, or direct the paddle using the mouse (Bonus Feature)
- [ ] Bounce the ball by placing the paddle in the ball's path
- [ ] Clear bricks when in contact with the bouncing ball

This project will also include:
- [ ] A modal describing the rules of BrickOut
- [ ] A production README

## Wireframes
This project will have the game title at the top of the window. In the middle will be the game screen. Below the game will be a picture of the controls and a button to open a How To Play modal. The modal will explain the game rules and power-ups (see Bonus Features). Next to the controls will be links to my LinkedIn and Github.

![BrickOut wireframe][wireframe]

## Architecture and Technology
BrickOut will require the following technologies:
* JavaScript and jQuery for Game logic
* Easel.js with HTML 5 Canvas for rendering the DOM and game elements
* Keymapper for handling user input
* Webpack to consolidate the various scripts into a bundle

Along with the entry file, there are four additional scripts:

`screen.js`: This script will manipulate and render the paddle, ball, and bricks elements.

`paddle.js`: This script will handle user input and move the paddle accordingly.

`ball.js`: This script will alter the ball trajectory, bounces, and contact with paddle/bricks.

`brick.js`: This script will house the logic of clearing when in contact with the ball, and occasionally dropping power-ups (see Bonus Features)

## Implementation Timeline
**Day 1**: Set up webpack and install `Easel.js` and `Keymapper`. Write the entry file and skeleton of the 4 scripts. Learn how to use `Easel.js` and `Keymapper`.
* Have a site that uses the bundle script with all 4 scripts incorporated
* Render the game screen and paddle
* Be able to move the paddle with user input

**Day 2**: Add the ball and bricks to the game
* Add a ball that bounces off each surface
* Have different colored bricks at the top of the screen

**Day 3**: Code the rules into the game
* Bricks disappear when the ball hits them
* Ball disappears when hitting the bottom of the screen. Reduces the paddle count
* Game ends when all paddles are gone or all bricks cleared

**Day 4**: Style and add additional content to the page
* Style the paddle, balls, bricks, and background of the game
* Add controls and rules modal
* Include the Github and LinkedIn links

## Bonus Features
Once I complete the MVPs, I may update the game with these features:
* Control the paddle using the mouse instead of keyboard inputs
* Bricks will occasionally drop power-ups towards the bottom of the screen. If the paddle touches the power-up, the gameplay will be altered. Potential power-ups are:
  * Longer paddle: Increase the size of the paddle
  * Sticky paddle: Can 'catch' the ball, reposition the paddle, and press the button to release the ball at will
  * Multi-ball: The ball splits into 3. The player loses the paddle when all 3 balls have disappeared
  * Strong ball: The ball doesn't bounce on contact with the brick, but clears all bricks in its path


[wireframe]: ./wireframe.png
