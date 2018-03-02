/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var WIDTH = exports.WIDTH = 800;

var HEIGHT = exports.HEIGHT = 600;

var WORLD_WIDTH = exports.WORLD_WIDTH = WIDTH;

var WORLD_HEIGHT = exports.WORLD_HEIGHT = HEIGHT * 2;

var BOOT_STATE = exports.BOOT_STATE = 'Boot';

var MENU_STATE = exports.MENU_STATE = 'Menu';

var GAME_STATE = exports.GAME_STATE = 'Game';

var DEAD_STATE = exports.DEAD_STATE = 'Dead';

var PLAYER_COLOR = exports.PLAYER_COLOR = 0x0b2228;

var BG_COLOR = exports.BG_COLOR = '#E0D8CC';

var JUMP_COST = exports.JUMP_COST = 0.15;

var BOX_FEEDING = exports.BOX_FEEDING = 0.008;

var JUMP_SPEED_UP = exports.JUMP_SPEED_UP = -1500;

var X_SPEED = exports.X_SPEED = 300;

var BOX_GRAVITY = exports.BOX_GRAVITY = 200;

var SLOW_DOWN_THRESHOLD = exports.SLOW_DOWN_THRESHOLD = -200;

var MIN_DECELERATION = exports.MIN_DECELERATION = 50;

var MIN_BOX_SIZE = exports.MIN_BOX_SIZE = 8.5;

var BOX_SIZE = exports.BOX_SIZE = 40;

var DEATHS_BORDER_COLOR = exports.DEATHS_BORDER_COLOR = 0xCC0000;

var DEATHS_BORDER_HEIGHT = exports.DEATHS_BORDER_HEIGHT = 20;

var PLATFORM_MIN_WIDTH = exports.PLATFORM_MIN_WIDTH = 50;

var PLATFORM_MAX_WIDTH = exports.PLATFORM_MAX_WIDTH = 150;

var PLATFORM_HEIGHT = exports.PLATFORM_HEIGHT = 20;

var PLATFORM_CREATING_MIN_INTERVAL = exports.PLATFORM_CREATING_MIN_INTERVAL = 200;

var PLATFORM_CREATING_MAX_INTERVAL = exports.PLATFORM_CREATING_MAX_INTERVAL = 500;

var PLATFORM_SPEED = exports.PLATFORM_SPEED = -240;

var DEATHS_DROP_COLOR = exports.DEATHS_DROP_COLOR = 0xCC0000;

var DEATHS_DROP_MIN_SPEED = exports.DEATHS_DROP_MIN_SPEED = 100;

var DEATHS_DROP_MAX_SPEED = exports.DEATHS_DROP_MAX_SPEED = 500;

var DEATHS_DROP_SIZE = exports.DEATHS_DROP_SIZE = 15;

var DEATHS_DROP_MIN_INTERVAL = exports.DEATHS_DROP_MIN_INTERVAL = 200;

var DEATHS_DROP_MAX_INTERVAL = exports.DEATHS_DROP_MAX_INTERVAL = 3000;

var PLATFORM_FEEDING = exports.PLATFORM_FEEDING = 0.05;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boot = function () {
    function Boot(game) {
        _classCallCheck(this, Boot);

        this.game = game;
    }

    _createClass(Boot, [{
        key: 'preload',
        value: function preload() {
            this.game.stage.backgroundColor = _config.BG_COLOR;

            var frames_number = 3,
                height = 141,
                width = 132;
            this.game.load.spritesheet('startbtn', 'startbtn6.png', width, height, frames_number, 0, 0);

            this.game.load.image('starttext', 'starttext.png');
            this.game.load.image('deadtext', 'deadtext.png');

            this.game.load.audio('introsound', ['intro.mp3', 'intro.ogg']);
            this.game.load.audio('deathsound', ['explosion.mp3', 'explosion.wav']);
            this.game.load.audio('jumpsound', ['jump.mp3', 'jump.wav']);
            this.game.load.audio('powerupsound', ['powerup.mp3', 'powerup.wav']);
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.state.start(_config.MENU_STATE);
        }
    }]);

    return Boot;
}();

;

exports.default = Boot;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeadState = function () {
    function DeadState(game) {
        _classCallCheck(this, DeadState);

        this.game = game;

        this.spaceKey = null;
    }

    _createClass(DeadState, [{
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {
            this.game.add.sprite(124, 170, 'deadtext');
            this.game.add.button(335, 350, 'startbtn', this.startGame, null, 1, 0, 2);

            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.spaceKey.isDown) {
                this.startGame();
            }
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.game.state.start(_config.GAME_STATE);
        }
    }]);

    return DeadState;
}();

;

exports.default = DeadState;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _box = __webpack_require__(5);

var _box2 = _interopRequireDefault(_box);

var _platform2 = __webpack_require__(9);

var _platform3 = _interopRequireDefault(_platform2);

var _deathsborder = __webpack_require__(6);

var _deathsborder2 = _interopRequireDefault(_deathsborder);

var _deathsdrop = __webpack_require__(7);

var _deathsdrop2 = _interopRequireDefault(_deathsdrop);

var _config = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Play = function () {
    function Play(game) {
        _classCallCheck(this, Play);

        this.game = game;

        this.STATES = {
            start: 'start',
            alive: 'alive',
            dead: 'dead'
        };
    }

    _createClass(Play, [{
        key: 'create',
        value: function create() {
            var _this = this;

            this.feeding = false;

            this.jumpsound = this.game.add.audio('jumpsound');
            this.deathsound = this.game.add.audio('deathsound');
            this.introsound = this.game.add.audio('introsound');
            this.powerupsound = this.game.add.audio('powerupsound');

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.setBounds(0, 0, _config.WORLD_WIDTH, _config.WORLD_HEIGHT);

            this.cursorKeys = this.game.input.keyboard.createCursorKeys();

            var style = { font: "12px Arial", fill: "#8A1C1E", align: "left" };
            var i = 1;
            while (i * 100 < _config.WORLD_HEIGHT) {
                var y = i * 100;
                var text = this.game.add.text(20, y, '-' + y + '-', style);
                text.anchor.set(0.5);
                i++;
            }

            this.box = new _box2.default(this.game, 0, 200, this.jumpsound);
            this.game.camera.follow(this.box.graphics);

            this.platforms = this.game.add.group();

            this.drops = this.game.add.group();

            // first platfoms
            var firstPlatforms = [{
                x: 100,
                y: 320,
                width: _config.PLATFORM_MAX_WIDTH,
                height: _config.PLATFORM_HEIGHT
            }, {
                x: 350,
                y: 460,
                width: _config.PLATFORM_MAX_WIDTH,
                height: _config.PLATFORM_HEIGHT
            }];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = firstPlatforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref2 = _step.value;
                    var x = _ref2.x,
                        _y = _ref2.y,
                        width = _ref2.width,
                        height = _ref2.height;

                    var platform = new _platform3.default(this.game, x, _y, width, height);
                    this.platforms.add(platform.graphics);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.createRandomPlatform();

            this.bounds = this.game.add.group();
            this.bounds.add(new _deathsborder2.default(this.game, 0, 0).graphics);
            this.bounds.add(new _deathsborder2.default(this.game, 0, _config.WORLD_HEIGHT - _config.DEATHS_BORDER_HEIGHT).graphics);

            var whenCreateDrop = this.game.rnd.between(_config.DEATHS_DROP_MIN_INTERVAL, _config.DEATHS_DROP_MAX_INTERVAL);
            this.game.time.events.add(whenCreateDrop, this.createRandomDeathsDrop, this);

            this.introsound.loopFull();

            this.score = 0;
            this.scoreText = this.game.add.text(400, 40, '' + this.score, { font: "24px Arial", fill: "#8A1C1E", align: "center" });
            this.scoreText.anchor.set(0.5);
            this.scoreText.fixedToCamera = true;
            this.game.time.events.loop(100, function () {
                if (_this.box.is_alive) {
                    _this.score += 25;
                    _this.scoreText.setText('' + _this.score);
                }
            }, this);

            this.currentState = this.STATES.start;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            switch (this.currentState) {
                case this.STATES.start:
                    this.currentState = this.STATES.alive;
                    break;

                case this.STATES.alive:
                    this.feeding = false;

                    this.game.physics.arcade.collide(this.box.graphics, this.platforms, this.collidePlatform, null, this);

                    if (this.feeding && !this.powerupsound.isPlaying) {
                        this.powerupsound.loopFull();
                    } else if (!this.feeding && this.powerupsound.isPlaying) {
                        this.powerupsound.stop();
                    }

                    this.game.physics.arcade.collide(this.box.graphics, this.bounds, this.killBox, null, this);

                    this.game.physics.arcade.collide(this.box.graphics, this.drops, this.killBox, null, this);

                    this.box.update(this.cursorKeys);

                    var toRemove = [];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.platforms.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var platform = _step2.value;

                            if (platform.position.x + _config.PLATFORM_MAX_WIDTH < 0) {
                                toRemove.push(platform);
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = toRemove[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _platform = _step3.value;

                            _platform.kill();
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    toRemove = [];
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = this.drops.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var drop = _step4.value;

                            if (drop.position.y < 0 || drop.position.y > _config.WORLD_HEIGHT) {
                                toRemove.push(drop);
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = toRemove[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var _drop = _step5.value;

                            _drop.kill();
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }

                    if (!this.box.is_alive) {
                        if (this.powerupsound.isPlaying) {
                            this.powerupsound.stop();
                        }

                        this.deathsound.play();

                        this.currentState = this.STATES.dead;

                        this.introsound.stop();
                        this.game.time.events.add(1300, function () {
                            _this2.game.state.start(_config.DEAD_STATE);
                        }, this);
                    }
                    break;

                case this.STATES.dead:
                    break;
            }
        }
    }, {
        key: 'createRandomDeathsDrop',
        value: function createRandomDeathsDrop() {
            var x = this.game.rnd.between(0, _config.WORLD_WIDTH - _config.DEATHS_DROP_SIZE);

            var y = 0;
            if (this.game.rnd.between(0, 10) < 5) {
                y = _config.WORLD_HEIGHT;
            }

            var drop = new _deathsdrop2.default(this.game, x, y);
            this.drops.add(drop.graphics);

            var whenCreateDrop = this.game.rnd.between(_config.DEATHS_DROP_MIN_INTERVAL, _config.DEATHS_DROP_MAX_INTERVAL);
            this.game.time.events.add(whenCreateDrop, this.createRandomDeathsDrop, this);
        }
    }, {
        key: 'createRandomPlatform',
        value: function createRandomPlatform() {
            var x = _config.WORLD_WIDTH;

            var y = this.game.rnd.between(_config.DEATHS_BORDER_HEIGHT + _config.BOX_SIZE + 10, _config.WORLD_HEIGHT - _config.DEATHS_BORDER_HEIGHT);

            var width = this.game.rnd.between(_config.PLATFORM_MIN_WIDTH, _config.PLATFORM_MAX_WIDTH);

            var height = _config.PLATFORM_HEIGHT;

            var platform = new _platform3.default(this.game, x, y, width, height);
            this.platforms.add(platform.graphics);

            var nextTime = this.game.rnd.between(_config.PLATFORM_CREATING_MIN_INTERVAL, _config.PLATFORM_CREATING_MAX_INTERVAL);
            this.game.time.events.add(nextTime, this.createRandomPlatform, this);
        }
    }, {
        key: 'collidePlatform',
        value: function collidePlatform(player, platform) {
            this.feeding = true;

            platform.scale.y -= _config.PLATFORM_FEEDING;

            player.scale.x += _config.BOX_FEEDING;
            player.scale.y += _config.BOX_FEEDING;

            if (platform.scale.y < 0.05) {
                platform.kill();
            }
        }
    }, {
        key: 'killBox',
        value: function killBox(player, bound) {
            this.box.kill();
        }
    }]);

    return Play;
}();

;

exports.default = Play;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuState = function () {
    function MenuState(game) {
        _classCallCheck(this, MenuState);

        this.game = game;

        this.spaceKey = null;
    }

    _createClass(MenuState, [{
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {
            this.game.add.button(335, 200, 'startbtn', this.startGame, null, 1, 0, 2);
            this.game.add.sprite(181, 370, 'starttext');

            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.spaceKey.isDown) {
                this.startGame();
            }
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.game.state.start(_config.GAME_STATE);
        }
    }]);

    return MenuState;
}();

;

exports.default = MenuState;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
    function Box(game, x, y, jumpsound) {
        _classCallCheck(this, Box);

        this.is_alive = true;

        this.game = game;

        this.jumpsound = jumpsound;

        this.graphics = this.game.add.graphics(x, y).clear().beginFill(_config.PLAYER_COLOR).moveTo(0, 0).lineTo(_config.BOX_SIZE, 0).lineTo(_config.BOX_SIZE, _config.BOX_SIZE).lineTo(0, _config.BOX_SIZE).lineTo(0, 0).endFill();

        this.game.physics.arcade.enable(this.graphics);

        this.graphics.body.bounce.set(0);
        this.graphics.body.gravity.y = _config.BOX_GRAVITY;
        this.graphics.body.velocity.x = _config.X_SPEED;
        this.graphics.body.collideWorldBounds = true;
    }

    _createClass(Box, [{
        key: 'update',
        value: function update(cursorKeys) {
            if (this.is_alive) {
                if (cursorKeys.left.isDown) {
                    this.graphics.body.velocity.x = -_config.X_SPEED;
                }
                if (cursorKeys.right.isDown) {
                    this.graphics.body.velocity.x = _config.X_SPEED;
                }
                if (cursorKeys.up.isDown) {
                    if (this.graphics.body.velocity.y > _config.SLOW_DOWN_THRESHOLD) {
                        this.graphics.body.velocity.y = _config.JUMP_SPEED_UP;
                        this.graphics.scale.x -= _config.JUMP_COST;
                        this.graphics.scale.y -= _config.JUMP_COST;

                        if (this.graphics.body.width < _config.MIN_BOX_SIZE || this.graphics.body.height < _config.MIN_BOX_SIZE) {
                            this.kill();
                        } else {
                            this.jumpsound.play();
                        }
                    }
                }

                if (this.graphics.body.velocity.y !== 0) {
                    this.graphics.body.velocity.y += Math.max(Math.abs(this.graphics.body.velocity.y) * 0.1, _config.MIN_DECELERATION);
                }
            }
        }
    }, {
        key: 'kill',
        value: function kill() {
            this.is_alive = false;

            if (this.graphics.body.width < _config.MIN_BOX_SIZE || this.graphics.body.height < _config.MIN_BOX_SIZE) {
                this.graphics.kill();
            } else {
                this.graphics.body.velocity.x = 0;
                this.graphics.body.velocity.y = 1000;

                this.graphics.body.checkCollision.down = false;
                this.graphics.body.checkCollision.left = false;
                this.graphics.body.checkCollision.right = false;
                this.graphics.body.checkCollision.up = false;

                this.graphics.body.collideWorldBounds = false;
            }
        }
    }]);

    return Box;
}();

;

exports.default = Box;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeathsBorder = function DeathsBorder(game, x, y) {
    _classCallCheck(this, DeathsBorder);

    this.game = game;

    this.graphics = this.game.add.graphics(x, y).clear().beginFill(_config.DEATHS_BORDER_COLOR).moveTo(0, 0).lineTo(_config.WIDTH, 0).lineTo(_config.WIDTH, _config.DEATHS_BORDER_HEIGHT).lineTo(0, _config.DEATHS_BORDER_HEIGHT).lineTo(0, 0).endFill();

    this.game.physics.arcade.enable(this.graphics);
    this.graphics.body.immovable = true;
};

;

exports.default = DeathsBorder;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeathsDrop = function DeathsDrop(game, x, y) {
    _classCallCheck(this, DeathsDrop);

    this.game = game;

    this.graphics = this.game.add.graphics(x, y).clear().beginFill(_config.DEATHS_DROP_COLOR).moveTo(0, 0).lineTo(_config.DEATHS_DROP_SIZE, 0).lineTo(_config.DEATHS_DROP_SIZE, _config.DEATHS_DROP_SIZE).lineTo(0, _config.DEATHS_DROP_SIZE).lineTo(0, 0).endFill();

    this.game.physics.arcade.enable(this.graphics);

    this.graphics.body.immovable = true;

    var speed = this.game.rnd.between(_config.DEATHS_DROP_MIN_SPEED, _config.DEATHS_DROP_MAX_SPEED);
    if (y === 0) {
        this.graphics.body.velocity.y = speed;
    } else {
        this.graphics.body.velocity.y = -speed;
    }

    this.graphics.body.velocity.x = this.game.rnd.between(-_config.PLATFORM_SPEED, _config.PLATFORM_SPEED);
};

;

exports.default = DeathsDrop;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boot = __webpack_require__(1);

var _boot2 = _interopRequireDefault(_boot);

var _menu = __webpack_require__(4);

var _menu2 = _interopRequireDefault(_menu);

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _dead = __webpack_require__(2);

var _dead2 = _interopRequireDefault(_dead);

var _config = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new Phaser.Game(_config.WIDTH, _config.HEIGHT, Phaser.AUTO, 'lightbox-game'); //    var update = function() {
//        switch (currentState) {
//            case STATES.alive:
//                game.physics.arcade.collide(player, bounds, collideBounds);
//                game.physics.arcade.collide(player, platforms, collidePlatforms);
//                control();
//                break;
//        }
//    };
//
// ----------------------

game.state.add(_config.BOOT_STATE, _boot2.default);
game.state.add(_config.MENU_STATE, _menu2.default);
game.state.add(_config.GAME_STATE, _game2.default);
game.state.add(_config.DEAD_STATE, _dead2.default);

game.state.start(_config.BOOT_STATE);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = function Platform(game, x, y, width, height) {
    _classCallCheck(this, Platform);

    this.game = game;

    this.graphics = this.game.add.graphics(x, y).clear().beginFill(_config.PLAYER_COLOR).moveTo(0, 0).lineTo(width, 0).lineTo(width, height).lineTo(0, height).lineTo(0, 0).endFill();

    this.game.physics.arcade.enable(this.graphics);

    this.graphics.body.immovable = true;
    this.graphics.body.velocity.x = _config.PLATFORM_SPEED;

    // or this?
    //this.graphics.body.gravity.y = 0;
    //this.graphics.body.gravity.x = -100;

    this.graphics.body.checkCollision.down = false;
    this.graphics.body.checkCollision.left = false;
    this.graphics.body.checkCollision.right = false;
};

;

exports.default = Platform;

/***/ })
/******/ ]);