/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brick_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paddle_js__ = __webpack_require__(3);




class Screen {
  constructor(ctx) {
    this.ctx = ctx;
    this.render = this.render.bind(this);
    this.paddle = new __WEBPACK_IMPORTED_MODULE_2__paddle_js__["a" /* default */](this.ctx);
    this.bricks = [];
    this.createBricks();
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball_js__["a" /* default */](this.ctx, this);
    this.paddleCount = 3;
    this.highScore = 0;
    this.points = 0;
  }

  play() {
    setInterval(this.render, 1);
  }

  createBricks() {
    this.bricks = [];
    let dimensions = [0, 125, 250, 375, 500, 625, 750, 875, 1000];
    // let heights = [90, 125, 160, 195, 230, 265];
    let heights = [90, 160, 230];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        this.bricks.push(new __WEBPACK_IMPORTED_MODULE_0__brick_js__["a" /* default */](dimensions[i], heights[height], this.ctx));
      }
    }

    dimensions = [-75, 50, 175, 300, 425, 550, 675, 800, 925, 1050];
    heights = [125, 195, 265];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        this.bricks.push(new __WEBPACK_IMPORTED_MODULE_0__brick_js__["a" /* default */](dimensions[i], heights[height], this.ctx));
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.ctx.fillStyle="grey";
    this.ctx.fillRect(0, 0, 1000, 40);
    this.ctx.font = "30px Helvetica";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`High Score: ${this.highScore}`, 30, 30);

    this.ctx.textAlign = "center";
    this.ctx.fillText(`Score: ${this.points}`, 500, 30);
    this.ctx.fillText(`Paddles Left: ${this.paddleCount}`, 860, 30);

    this.paddle.draw();
    this.ball.checkPaddleContact(this.paddle.borders);
    this.bricks.forEach( brick => {
      if (this.ball.checkBrickContact(brick.borders)) {
        brick.borders = [0, 0, 0, 0];
        brick.width = 0;
        this.points += 100;
        if (this.points > this.highScore) this.highScore = this.points;
        if (this.points % 5100 === 0) {
          this.paddle.leftCoord = 425;
          this.ball.launched = false;
          this.ball.velocity = [0, 0];
          this.ball.posY = 592;
          this.ball.posX = this.paddle.leftCoord + 75;
          this.bricks = [];
          this.createBricks();
        }
      } else {
        brick.draw();
      }
    });
    this.ball.move();
    this.ball.draw();
  }
}

/* harmony default export */ __webpack_exports__["a"] = Screen;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball {
  constructor(ctx, scrn, launched = false) {
    this.ctx = ctx;
    this.posX = 500;
    this.posY = 592;
    this.radius = 7.5;
    this.launched = false;
    this.borders = [ this.posX - this.radius, this.posX + this.radius, this.posY - this.radius, this.posY + this.radius ];
    this.velocity = [0,0];
    this.scrn = scrn;
    this.drawText = this.drawText.bind(this);
    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.handleHover.bind(this));
    this.canvas.addEventListener("click", this.launch.bind(this));
  }

  move() {
    this.wallBounce();
    this.posX += this.velocity[0];
    this.posY += this.velocity[1];
  }

  launch() {
    if (this.scrn.paddleCount < 1) {
      this.scrn.paddleCount = 3;
      if (this.scrn.points > this.scrn.highScore) this.scrn.highScore = this.scrn.points;
      this.scrn.points = 0;
      this.scrn.createBricks();
      this.launched = true;
      this.velocity = [0, -2];
    } else if (!this.launched) {
      this.launched = true;
      this.velocity = [0,-2];
    }
  }

  handleHover(e) {
    if (!this.launched) {
      this.posX = e.offsetX;
      if (this.posX < 0) {
        this.posX = 0;
      } else if (this.posX > 1000) {
        this.posX = 1000;
      }
      this.updateBorders();
    }
  }

  drawText(text, x, y) {
    this.ctx.strokeStyle = 'black';

    this.ctx.miterLimit = 2;
    this.ctx.lineJoin = 'circle';

    this.ctx.lineWidth = 6;
    this.ctx.strokeText(text, x, y);
    this.ctx.lineWidth = 1;
    this.ctx.fillText(text, x, y);
  }

  draw() {
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    if (this.scrn.paddleCount < 1) {
      this.ctx.fillStyle = "lightred";
      this.drawText("Game Over",500,350);
      this.ctx.font = "24px Arial";
      this.drawText(`Score: ${this.scrn.points}`,500,380);
      this.drawText(`Click to start a new game!`,500,450);
    } else if (!this.launched) {
      this.ctx.fillStyle = "white";
      this.drawText("Click to launch",500,400);
    }

    // drawing the baseball
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    // drawing the baseball's stitches
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'red';
    this.ctx.moveTo(this.posX - (this.radius / 1.5), this.posY - (this.radius / 1.5));
    this.ctx.bezierCurveTo(this.posX - 1, this.posY, this.posX - 1, this.posY, this.posX - (this.radius / 1.5), this.posY + (this.radius / 1.5));

    this.ctx.moveTo(this.posX + (this.radius / 1.5), this.posY - (this.radius / 1.5));
    this.ctx.bezierCurveTo(this.posX + 1, this.posY, this.posX + 1, this.posY, this.posX + (this.radius / 1.5), this.posY + (this.radius / 1.5));
    this.ctx.stroke();
  }

  wallBounce() {
    this.updateBorders();
    if (this.borders[0] < 40 || this.borders[1] > 1000) {
      this.velocity[0] = -this.velocity[0];
    } else if (this.borders[2] < 40 || this.borders[3] > 650) {
      this.velocity[1] = -this.velocity[1];
    } else if (this.borders[3] > 640) {
      this.velocity = [0,0];
      this.posY = 592;
      this.posX = this.scrn.paddle.leftCoord + 75;
      this.launched = false;
      this.scrn.paddleCount -= 1;
    }
  }

  updateBorders() {
    this.borders = [ this.posX - this.radius, this.posX + this.radius, this.posY - this.radius, this.posY + this.radius ];
  }

  checkPaddleContact(paddleBorder) {
    if ( (this.borders[2] > paddleBorder[2] &&
      this.borders[2] < paddleBorder[3]) ||
      (this.borders[3] > paddleBorder[2] &&
      this.borders[3] < paddleBorder[3]) )  {

        if ( (this.borders[0] > paddleBorder[0] &&
          this.borders[0] < paddleBorder[1]) ||
          (this.borders[1] > paddleBorder[0] &&
            this.borders[1] < paddleBorder[1]) ) {
            this.posY = paddleBorder[2] - this.radius;
            this.velocity[0] = -((paddleBorder[1] - 75 - this.posX) / 75) * 3;
            this.velocity[1] = -this.velocity[1] - 0.15;
            this.updateBorders();
        }
    }
  }

  checkBrickContact(brickBorder) {
    // [left 0, right 1, top 2, bottom 3]
    if ( (this.borders[2] > brickBorder[2] &&
      this.borders[2] < brickBorder[3]) ||
      (this.borders[3] > brickBorder[2] &&
      this.borders[3] < brickBorder[3]) )  {


        if ( (this.borders[0] > brickBorder[0] &&
          this.borders[0] < brickBorder[1]) ||
          (this.borders[1] > brickBorder[0] &&
            this.borders[1] < brickBorder[1]) ) {

            if ( ( (this.borders[1] > brickBorder[0] - 2) &&
              (this.borders[1] < brickBorder[0] + 2) ) ||
              ( (this.borders[0] > brickBorder[1] - 2) &&
              (this.borders[0] < brickBorder[1] + 2) ) ) {
                this.velocity[0] = -this.velocity[0];
                if (Math.abs(brickBorder[0] - this.posX) >
                Math.abs(brickBorder[1] - this.posX)) {
                  this.posX = brickBorder[1] + this.radius;
                } else {
                  this.posX = brickBorder[0] - this.radius;
                }
              } else {
                this.velocity[1] = -this.velocity[1];
                if (Math.abs(brickBorder[2] - this.posY) >
                Math.abs(brickBorder[3] - this.posY)) {
                  this.posY = brickBorder[3] + this.radius;
                } else {
                  this.posY = brickBorder[2] - this.radius;
                }
              }
            this.updateBorders();
            return true;
        }
    }

    return false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = Ball;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Brick {
  constructor(leftCoord, height, ctx) {
    this.leftCoord = leftCoord;
    this.height = height;
    this.ctx = ctx;
    this.width = 35;
    this.borderWidth = 2;
    this.length = 125;
    this.borders = [this.leftCoord, this.leftCoord + this.length, this.height, this.height + this.width];
  }

  draw() {
    if (this.width) {
      this.ctx.fillStyle ="lightgrey";
      this.ctx.fillRect(this.leftCoord, this.height, this.length + 2, this.width + 2);
      this.ctx.fillStyle ="#E61938";
      this.ctx.fillRect(this.leftCoord + this.borderWidth + 1, this.height + this.borderWidth + 1, this.length - (this.borderWidth * 2), this.width - (this.borderWidth * 2));
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = Brick;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = Paddle;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screen_js__ = __webpack_require__(0);


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const screen = new __WEBPACK_IMPORTED_MODULE_0__screen_js__["a" /* default */](ctx);
  screen.play();
});


/***/ })
/******/ ]);