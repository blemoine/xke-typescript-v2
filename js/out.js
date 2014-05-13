var Speed = (function () {
    function Speed(x, y) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        this.x = x;
        this.y = y;
    }
    Speed.prototype.norm = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    Speed.prototype.angleToFrame = function () {
        var norm = this.norm();
        var cos = this.x / norm;
        var sin = this.y / norm;

        var signe = Math.asin(sin) > 0 ? 1 : -1;
        return signe * Math.acos(cos);
    };

    Speed.prototype.rotate = function (angle) {
        var norm = this.norm();
        this.x = norm * Math.cos(angle);
        this.y = norm * Math.sin(angle);
    };
    return Speed;
})();
var Ball = (function () {
    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'sprite/sprite-tir.png';
        this.speed = new Speed();
    }
    Ball.prototype.isColliding = function (x, y, leftX, bottomY) {
        return this.x + Ball.radius > x && this.x - Ball.radius < leftX && this.y + Ball.radius > y && this.y - Ball.radius < bottomY;
    };
    Ball.radius = 8;
    return Ball;
})();
var BrickMock = (function () {
    function BrickMock() {
    }
    BrickMock.prototype.isColliding = function (ball) {
        return false;
    };
    return BrickMock;
})();
var DrawCanvas = (function () {
    function DrawCanvas(context, height, width) {
        this.context = context;
        this.height = height;
        this.width = width;
        this.spriteCache = {};
        this.spriteCiel = this.spriteImageBuilder('sprite/ciel.png');
    }
    DrawCanvas.prototype.write = function (text, x, y) {
        this.context.fillStyle = 'black';
        this.context.font = "24pt Helvetica";
        this.context.fillText(text, x, y);
    };

    DrawCanvas.prototype.clear = function () {
        this.context.drawImage(this.spriteCiel, 0, 0);
    };

    DrawCanvas.prototype.drawShip = function (ship) {
        this.context.fillStyle = 'black';
        this.context.drawImage(this.getSprite(ship.sprite), ship.x, ship.y - 20, Ship.width, Ship.height + 20);
    };

    DrawCanvas.prototype.drawBall = function (ball) {
        this.context.drawImage(this.getSprite(ball.sprite), ball.x - Ball.radius, ball.y - Ball.radius, 2 * Ball.radius, 2 * Ball.radius);
    };

    DrawCanvas.prototype.drawLevel = function (level) {
        var _this = this;
        level.bricks.forEach(function (brick) {
            _this.drawBrick(brick);
        });
    };

    DrawCanvas.prototype.drawBrick = function (brick) {
        var anyBrick = brick;
        this.context.drawImage(this.getSprite(brick.sprite), brick.x, brick.y, anyBrick.constructor.width, anyBrick.constructor.height);
    };

    DrawCanvas.prototype.getSprite = function (sprite) {
        if (!this.spriteCache[sprite]) {
            this.spriteCache[sprite] = this.spriteImageBuilder(sprite);
        }
        return this.spriteCache[sprite];
    };

    DrawCanvas.prototype.spriteImageBuilder = function (url) {
        var img = new Image();
        img.src = url;
        return img;
    };
    return DrawCanvas;
})();
var Lvl;
(function (Lvl) {
    var Level = (function () {
        function Level(bricks) {
            this.bricks = bricks;
            this.brickDestroyedListeners = [];
        }
        Level.prototype.finished = function () {
            return this.bricks.filter(function (brick) {
                return brick.destructible;
            }).length == 0;
        };

        Level.prototype.collidingBrick = function (ball) {
            return this.bricks.filter(function (brick) {
                return brick.isColliding(ball);
            })[0];
        };

        Level.prototype.updateCollidingBrick = function (ball) {
            var collidingBrick = this.collidingBrick(ball);
            if (collidingBrick.destructible) {
                collidingBrick.live = collidingBrick.live - 1;
            }

            var destroyedBricks = this.bricks.filter(function (brick) {
                return brick.live <= 0;
            });
            this.brickDestroyedListeners.forEach(function (listener) {
                destroyedBricks.forEach(function (brick) {
                    return listener(brick);
                });
            });

            this.bricks = this.bricks.filter(function (brick) {
                return brick.live > 0;
            });
        };
        return Level;
    })();
    Lvl.Level = Level;

    Lvl.levelsDescriptor = Lvl.levelsDescriptor || [];

    Lvl.levelsDescriptor.push(function () {
        if (typeof Brick != 'undefined') {
            return {
                bricks: [
                    new Brick(90, 50),
                    new Brick(90 + Brick.width, 50),
                    new Brick(90, 50 + Brick.height),
                    new Brick(90 + Brick.width, 50 + Brick.height)
                ]
            };
        } else {
            throw new Error('You must define Brick');
        }
    });

    Lvl.levelsDescriptor.push(function () {
        if (typeof Brick != 'undefined' && typeof IndestructibleBrick != 'undefined') {
            return {
                bricks: [
                    new Brick(90 + Brick.width, 50),
                    new Brick(90 + Brick.width, 50 + Brick.height),
                    new Brick(90 + 2 * Brick.width, 50),
                    new Brick(90 + 2 * Brick.width, 50 + Brick.height),
                    new IndestructibleBrick(90, 50),
                    new IndestructibleBrick(90, 50 + Brick.height),
                    new IndestructibleBrick(90, 50 + Brick.height),
                    new IndestructibleBrick(90 + 3 * Brick.width, 50),
                    new IndestructibleBrick(90 + 3 * Brick.width, 50 + Brick.height)
                ]
            };
        } else {
            throw new Error('You must define Brick');
        }
    });

    Lvl.levelsDescriptor.push(function () {
        if (typeof Brick != 'undefined' && typeof IndestructibleBrick != 'undefined' && ThreeLiveBrick != 'undefined') {
            return {
                bricks: [
                    new Brick(90 + Brick.width, 50 + Brick.height),
                    new Brick(90 + 2 * Brick.width, 50),
                    new ThreeLiveBrick(90 + Brick.width, 50),
                    new ThreeLiveBrick(90 + 2 * Brick.width, 50 + Brick.height),
                    new IndestructibleBrick(90, 50),
                    new IndestructibleBrick(90, 50 + Brick.height),
                    new IndestructibleBrick(90, 50 + Brick.height),
                    new IndestructibleBrick(90 + 3 * Brick.width, 50),
                    new IndestructibleBrick(90 + 3 * Brick.width, 50 + Brick.height)
                ]
            };
        } else {
            throw new Error('You must define Brick');
        }
    });

    function createLevel(index) {
        var descriptor = Lvl.levelsDescriptor[index]();
        return new Level(descriptor.bricks.slice(0));
    }
    Lvl.createLevel = createLevel;
})(Lvl || (Lvl = {}));
var PlayerMock = (function () {
    function PlayerMock() {
        this.score = '';
    }
    PlayerMock.prototype.addPoints = function (points) {
    };

    PlayerMock.prototype.displayScore = function (selector) {
    };
    return PlayerMock;
})();
var Ship = (function () {
    function Ship(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'sprite/sprite-vaisseau.png';
        this.speed = new Speed();
    }
    Ship.width = 60;
    Ship.height = 40;
    return Ship;
})();
var DOM_VK_SPACE = 32;
var DOM_VK_LEFT = 37;
var DOM_VK_RIGHT = 39;

var StateModule;
(function (StateModule) {
    var State = (function () {
        function State(drawCanvas) {
            this.drawCanvas = drawCanvas;
            this.events = [];
        }
        State.prototype.init = function () {
            var _this = this;
            $(document).keydown(function (event) {
                var key = event.which;

                _this.events.forEach(function (reactor) {
                    if (key == reactor.keyCode) {
                        reactor.action();
                        event.preventDefault();
                        return false;
                    }
                });
            });
        };

        State.prototype.destroy = function () {
            $(document).off('keydown keyup');
        };

        State.prototype.render = function () {
            this.drawCanvas.clear();
        };
        return State;
    })();
    StateModule.State = State;
})(StateModule || (StateModule = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StateModule;
(function (StateModule) {
    var IngameState = (function (_super) {
        __extends(IngameState, _super);
        function IngameState(drawCanvas, currentLevel) {
            var _this = this;
            _super.call(this, drawCanvas);
            this.ship = new Ship(10, drawCanvas.height - Ship.height - 30);
            this.ball = new Ball(10 + Ship.width / 2, this.ship.y - Ball.radius);
            this.level = Lvl.createLevel(currentLevel);

            var timeIntervalInMs = 20;
            this.modelInterval = setInterval(function () {
                var ship = _this.ship;

                newPosX = ship.x + ship.speed.x * timeIntervalInMs / 1000.;
                newPosY = ship.y + ship.speed.y * timeIntervalInMs / 1000.;

                if (newPosX < 0) {
                    ship.x = 0;
                } else if (newPosX > drawCanvas.width - Ship.width) {
                    ship.x = drawCanvas.width - Ship.width;
                } else {
                    ship.x = newPosX;
                }

                if (newPosY < 0) {
                    ship.y = 0;
                } else if (newPosY > drawCanvas.height - Ship.height) {
                    ship.y = drawCanvas.height - Ship.height;
                } else {
                    ship.y = newPosY;
                }

                var ball = _this.ball;

                if (ball.speed.norm() == 0) {
                    ball.x = ship.x + Ship.width / 2;
                    ball.y = ship.y - Ball.radius;
                } else {
                    var newPosX = ball.x + ball.speed.x * timeIntervalInMs / 1000.;
                    var newPosY = ball.y + ball.speed.y * timeIntervalInMs / 1000.;

                    ball.x = newPosX;
                    ball.y = newPosY;

                    if (newPosX - Ball.radius < 0) {
                        ball.x = Ball.radius;
                        ball.speed.x = -ball.speed.x;
                    }
                    if (newPosX + Ball.radius > drawCanvas.width) {
                        ball.x = drawCanvas.width - Ball.radius;
                        ball.speed.x = -ball.speed.x;
                    }

                    if (newPosY - Ball.radius < 0) {
                        ball.y = Ball.radius;
                        ball.speed.y = -ball.speed.y;
                    }

                    if (newPosY + Ball.radius > _this.ship.y && newPosX > _this.ship.x && newPosX < _this.ship.x + Ship.width) {
                        ball.y = _this.ship.y - Ball.radius;

                        var theta = ball.speed.angleToFrame();

                        var phi = Math.asin((ball.x - _this.ship.x) / Ship.width - 1 / 2);
                        var newAngle = 2 * phi - theta;
                        if (Math.abs(newAngle / Math.PI) > 0.9) {
                            newAngle = 0.9 * Math.PI * ((newAngle < 0) ? -1 : 1);
                        }
                        ball.speed.rotate(newAngle);
                    } else if (newPosY + Ball.radius > drawCanvas.height) {
                        BUS.fire(GameEvents.LOSE);
                    }

                    var collidingBrick = _this.level.collidingBrick(ball);

                    if (collidingBrick) {
                        var brickLowerCoordinate = collidingBrick.y + collidingBrick.constructor.height;

                        var under = ball.y - Ball.radius < brickLowerCoordinate && ball.y + Ball.radius > brickLowerCoordinate;
                        var over = ball.y + Ball.radius > collidingBrick.y && ball.y - Ball.radius < collidingBrick.y;
                        if (under || over) {
                            ball.speed.y = -ball.speed.y + ((ball.speed.y > 0) ? -1 : 1);
                        }

                        var brickRighterCoordinate = collidingBrick.x + collidingBrick.constructor.width;

                        var leftOf = ball.x + Ball.radius > collidingBrick.x && ball.x - Ball.radius < collidingBrick.x;
                        var rightOf = ball.x - Ball.radius < brickRighterCoordinate && ball.x + Ball.radius > brickRighterCoordinate;

                        if (leftOf || rightOf) {
                            ball.speed.x = -ball.speed.x + ((ball.speed.x > 0) ? -1 : 1);
                        }

                        _this.level.updateCollidingBrick(ball);
                    }
                }

                if (_this.level.finished()) {
                    BUS.fire(GameEvents.NEXT);
                }
            }, timeIntervalInMs);
        }
        IngameState.prototype.render = function () {
            _super.prototype.render.call(this);
            var drawCanvas = this.drawCanvas;
            drawCanvas.drawShip(this.ship);
            drawCanvas.drawBall(this.ball);
            drawCanvas.drawLevel(this.level);
        };

        IngameState.prototype.init = function () {
            var _this = this;
            _super.prototype.init.call(this);

            this.events.push({
                keyCode: DOM_VK_RIGHT,
                action: function () {
                    _this.ship.speed = new Speed(380, 0);
                    return false;
                }
            });

            this.events.push({
                keyCode: DOM_VK_LEFT,
                action: function () {
                    _this.ship.speed = new Speed(-380, 0);
                    return false;
                }
            });

            this.events.push({
                keyCode: DOM_VK_SPACE,
                action: function () {
                    if (_this.ball.speed.norm() == 0) {
                        _this.ball.speed = new Speed(1, 370);
                    }
                    return false;
                }
            });

            $(document).keyup(function (event) {
                _this.ship.speed = new Speed();
            });
        };

        IngameState.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            clearInterval(this.modelInterval);
        };
        return IngameState;
    })(StateModule.State);
    StateModule.IngameState = IngameState;
})(StateModule || (StateModule = {}));
var LoseState = (function (_super) {
    __extends(LoseState, _super);
    function LoseState(drawCanvas) {
        _super.call(this, drawCanvas);
    }
    LoseState.prototype.render = function () {
        _super.prototype.render.call(this);
        this.drawCanvas.write('You lose; press space to restart', 140, 200);
    };

    LoseState.prototype.init = function () {
        _super.prototype.init.call(this);
        this.events.push({
            keyCode: DOM_VK_SPACE,
            action: function () {
                BUS.fire(GameEvents.START);
                return false;
            }
        });
    };
    return LoseState;
})(StateModule.State);
var StartState = (function (_super) {
    __extends(StartState, _super);
    function StartState(drawCanvas) {
        _super.call(this, drawCanvas);
    }
    StartState.prototype.init = function () {
        _super.prototype.init.call(this);
        this.events.push({
            keyCode: DOM_VK_SPACE,
            action: function () {
                BUS.fire(GameEvents.START);
                return false;
            }
        });
    };

    StartState.prototype.render = function () {
        _super.prototype.render.call(this);
        this.drawCanvas.write('Press space to start', 140, 200);
    };
    return StartState;
})(StateModule.State);
var WinState = (function (_super) {
    __extends(WinState, _super);
    function WinState(drawCanvas) {
        _super.call(this, drawCanvas);
    }
    WinState.prototype.render = function () {
        _super.prototype.render.call(this);
        this.drawCanvas.write('You win; press space to restart', 140, 200);
    };

    WinState.prototype.init = function () {
        _super.prototype.init.call(this);
        this.events.push({
            keyCode: DOM_VK_SPACE,
            action: function () {
                BUS.fire(GameEvents.START);
                return false;
            }
        });
    };
    return WinState;
})(StateModule.State);
var GameEvents;
(function (GameEvents) {
    GameEvents[GameEvents["START"] = 0] = "START";
    GameEvents[GameEvents["LOSE"] = 1] = "LOSE";
    GameEvents[GameEvents["NEXT"] = 2] = "NEXT";
})(GameEvents || (GameEvents = {}));
var EventBus = (function () {
    function EventBus() {
        this.listeners = {};
    }
    EventBus.prototype.on = function (event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    };

    EventBus.prototype.fire = function (event) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(function (listener) {
                return listener();
            });
        }
    };
    return EventBus;
})();

var BUS = new EventBus();

var Game = (function () {
    function Game(id) {
        var _this = this;
        this.id = id;
        this.width = 640;
        this.height = 480;
        this.currentLevel = 0;
        var canvas = document.getElementById(this.id);
        canvas.width = this.width;
        canvas.height = this.height;
        var context = canvas.getContext('2d');
        this.drawCanvas = new DrawCanvas(context, this.height, this.width);
        this.changeState(new StartState(this.drawCanvas));
        var PlayerClass = PlayerMock;
        if (typeof Player != "undefined") {
            PlayerClass = Player;
        }

        this.player = new PlayerClass();
        this.player.displayScore('#score');

        var goToIngameState = function () {
            var ingameState = new StateModule.IngameState(_this.drawCanvas, _this.currentLevel);
            ingameState.level.brickDestroyedListeners.push(function (brick) {
                _this.player.addPoints(brick.points);
                _this.player.displayScore('#score');
                return true;
            });
            _this.changeState(ingameState);
        };

        BUS.on(GameEvents.START, function () {
            _this.player = new PlayerClass();
            _this.player.displayScore('#score');
            goToIngameState();
        });

        BUS.on(GameEvents.LOSE, function () {
            _this.changeState(new LoseState(_this.drawCanvas));
        });

        BUS.on(GameEvents.NEXT, function () {
            ++_this.currentLevel;
            if (_this.currentLevel < Lvl.levelsDescriptor.length) {
                goToIngameState();
            } else {
                _this.currentLevel = 0;
                _this.changeState(new WinState(_this.drawCanvas));
            }
        });
    }
    Game.prototype.changeState = function (newState) {
        if (this.state) {
            this.state.destroy();
        }
        this.state = newState;
        this.state.init();
    };

    Game.prototype.render = function () {
        var _this = this;
        setInterval(function () {
            _this.state.render();
        }, 50);
    };
    return Game;
})();
//# sourceMappingURL=out.js.map
