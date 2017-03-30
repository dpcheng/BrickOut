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
  constructor(ctx, stage) {
    this.ctx = ctx;
    this.stage = stage;
  }

  play() {
    const dimensions = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
    const heights = [50, 85, 120, 155, 190, 225];
    for (let height = 0; height < heights.length; height++) {
      for (let i = 0; i < dimensions.length - 1; i++) {
        new __WEBPACK_IMPORTED_MODULE_0__brick_js__["a" /* default */](dimensions[i], heights[height], this.stage);
      }
    }
    const paddle = new __WEBPACK_IMPORTED_MODULE_2__paddle_js__["a" /* default */](this.stage);
    this.stage.update();
  }
}

/* harmony default export */ __webpack_exports__["a"] = Screen;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball {
  constructor() {

  }
}

/* unused harmony default export */ var _unused_webpack_default_export = Ball;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = Brick;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
  const stage = new createjs.Stage("game-canvas");
  const screen = new __WEBPACK_IMPORTED_MODULE_0__screen_js__["a" /* default */](ctx, stage);
  screen.play();
});


/***/ })
/******/ ]);