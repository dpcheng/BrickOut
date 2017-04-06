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
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball_js__["a" /* default */](this.ctx);
  }

  play() {
    this.ball.launch();
    setInterval(this.render, 10);
  }

  createBricks() {
    const dimensions = [0, 125, 250, 375, 500, 625, 750, 875, 1000];
    const heights = [50, 85, 120, 155, 190, 225];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        this.bricks.push(new __WEBPACK_IMPORTED_MODULE_0__brick_js__["a" /* default */](dimensions[i], heights[height], this.ctx));
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.paddle.draw();
    this.bricks.forEach( brick => brick.draw() );
    this.ball.checkContact(this.paddle.borders);
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
  constructor(ctx) {
    this.ctx = ctx;
    this.posX = 500;
    this.posY = 715;
    this.radius = 7.5;
    this.borders = [ this.posX - this.radius, this.posX + this.radius, this.posY - this.radius, this.posY + this.radius ];
    this.velocity = [0,0];
  }

  move() {
    this.wallBounce();
    this.posX += this.velocity[0];
    this.posY += this.velocity[1];
  }

  launch() {
    this.velocity = [2,-2];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#003300';
    this.ctx.stroke();
  }

  wallBounce() {
    this.updateBorders();
    if (this.borders[0] < 0 || this.borders[1] > 1000) {
      this.velocity[0] = -this.velocity[0];
    } else if (this.borders[2] < 0 || this.borders[3] > 750) {
      this.velocity[1] = -this.velocity[1];
    }
  }

  updateBorders() {
    this.borders = [ this.posX - this.radius, this.posX + this.radius, this.posY - this.radius, this.posY + this.radius ];
  }

  checkContact(paddleBorder) {
    if ( (this.borders[2] > paddleBorder[2] &&
      this.borders[2] < paddleBorder[3]) ||
      (this.borders[3] > paddleBorder[2] &&
      this.borders[3] < paddleBorder[3]) )  {

        if ( (this.borders[0] > paddleBorder[0] &&
          this.borders[0] < paddleBorder[1]) ||
          (this.borders[1] > paddleBorder[0] &&
            this.borders[1] < paddleBorder[1]) ) {
            this.posY = paddleBorder[2] - this.radius;
            this.velocity[1] = -this.velocity[1];
            this.updateBorders();
        }
    }

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
    this.borders = [this.leftCoord, this.leftCoord + 120, this.height, this.height + 30];
  }

  draw() {
    this.ctx.fillStyle="#FF0000";
    this.ctx.fillRect(this.leftCoord, this.height, 120, 30);
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
    this.leftCoord = 0;
    this.borders = [this.leftCoord, this.leftCoord + 150, 700, 720];
    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.handleHover.bind(this));
  }

  draw() {
    this.ctx.fillStyle="blue";
    this.ctx.fillRect(this.leftCoord, 700, 150, 20);
  }

  handleHover(e) {
    this.leftCoord = e.screenX - 75;
    this.updateBorders();
  }

  updateBorders() {
    this.borders = [this.leftCoord, this.leftCoord + 150, 700, 720];
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