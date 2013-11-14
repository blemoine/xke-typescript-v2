
//Scoping pour éviter que $ leak partout
module StateModule {
    declare var $;
    export class IngameState extends StateModule.State {
        ship:Ship;
        ball:Ball;
        level:Lvl.Level;
        modelInterval:number;

        constructor(drawCanvas:DrawCanvas, currentLevel:number) {
            super(drawCanvas);
            this.ship = new Ship(10, drawCanvas.height - Ship.height - 30);
            this.ball = new Ball(10 + Ship.width / 2, this.ship.y - Ball.radius);
            this.level = Lvl.createLevel(currentLevel);

            var timeIntervalInMs = 20;
            this.modelInterval = setInterval(() => {

                var ship = this.ship;

                newPosX = ship.x + ship.speed.x * timeIntervalInMs / 1000.;
                newPosY = ship.y + ship.speed.y * timeIntervalInMs / 1000.;

                if (newPosX < 0) {
                    ship.x = 0
                } else if (newPosX > drawCanvas.width - Ship.width) {
                    ship.x = drawCanvas.width - Ship.width;
                } else {
                    ship.x = newPosX;
                }

                if (newPosY < 0) {
                    ship.y = 0
                } else if (newPosY > drawCanvas.height - Ship.height) {
                    ship.y = drawCanvas.height - Ship.height;
                } else {
                    ship.y = newPosY;
                }


                var ball = this.ball;

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

                    if (newPosY + Ball.radius > this.ship.y &&
                        newPosX > this.ship.x &&
                        newPosX < this.ship.x + Ship.width) {

                        ball.y = this.ship.y - Ball.radius;

                        //la vitesse se conserve, l'angle change.
                        var theta = ball.speed.angleToFrame();

                        var phi = Math.asin((ball.x - this.ship.x) / Ship.width - 1 / 2);
                        var newAngle = 2 * phi - theta;
                        if (Math.abs(newAngle / Math.PI) > 0.9) {
                            newAngle = 0.9 * Math.PI * ((newAngle < 0) ? -1 : 1);
                        }
                        ball.speed.rotate(newAngle);

                    } else if (newPosY + Ball.radius > drawCanvas.height) {
                        BUS.fire('lose');
                    }

                    var collidingBrick:any = this.level.collidingBrick(ball);

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

                        this.level.updateCollidingBrick(ball);
                    }
                }

                if (this.level.finished()) {
                    BUS.fire('next');
                }

            }, timeIntervalInMs);
        }

        render() {
            super.render();
            var drawCanvas = this.drawCanvas;
            drawCanvas.drawShip(this.ship);
            drawCanvas.drawBall(this.ball);
            drawCanvas.drawLevel(this.level);
        }

        init() {
            super.init();

            this.events.push({
                keyCode: DOM_VK_RIGHT,
                action: () => {
                    this.ship.speed = new Speed(380, 0);
                    return false;
                }
            });

            this.events.push({
                keyCode: DOM_VK_LEFT,
                action: () => {
                    this.ship.speed = new Speed(-380, 0);
                    return false;
                }
            });

            this.events.push({
                keyCode: DOM_VK_SPACE,
                action: () => {
                    if (this.ball.speed.norm() == 0) {
                        this.ball.speed = new Speed(1, 370)
                    }
                    return false;
                }
            });

            $(document).keyup((event) => {
                this.ship.speed = new Speed();
            });
        }

        destroy() {
            super.destroy();
            clearInterval(this.modelInterval);
        }
    }
}