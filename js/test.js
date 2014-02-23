module('Brick');

test("You must define a brick class", function () {
    equal(typeof Brick, "function", "The class Brick must be defined");
});

test('Brick must have a constructor taking 2 parameters x and y', function () {
    var brick = new Brick(20, 30);
    equal(brick.x, 20, "x must have the value passed in the constructor");
    equal(brick.y, 30, "y must have the value passed in the constructor");
});

test('a brick  must be destructible', function () {
    var brick = new Brick(40, 50);
    equal(brick.destructible, true, "the attribut desctructible of a brick must be true");
});

test('a brick  must have a sprite', function () {
    var brick = new Brick(40, 50);
    equal(brick.sprite, 'sprite/sprite-brique.png', "the attribute sprite of a brick must be 'sprite/sprite-brique.png'");
});

test('a brick must give ten point', function () {
    var brick = new Brick(40, 50);
    equal(brick.points, 10, "The attribute points of a brick must be 10");
});
test('a brick must have 1 life', function () {
    var brick = new Brick(40, 50);
    equal(brick.live, 1, "The attribute live of a brick must be 1");
});

test('Brick must have static height', function () {
    equal(Brick.height, 30, "class Brick must have 30 for static height");
});

test('Brick must have static width', function () {
    equal(Brick.width, 40, "class Brick must have 40 for static width");
});

test('a brick must have a isColliding method which take one parameter', function () {
    equal(typeof Brick.prototype.isColliding, 'function', 'isColliding must be a method');
    equal(Brick.prototype.isColliding.length, 1, 'isColliding must take one parameter of type Ball');
});

test('must call ball is Colliding with correct parameter when a brick isColliding is called', function () {
    var brick = new Brick(30, 20);
    var ball = new Ball(1, 2);
    ball.isColliding = function (x, y, leftX, bottomY) {
        equal(x, 30, 'The first parameter of ball.isColliding must be the x position of the brick');
        equal(y, 20, 'The second parameter of ball.isColliding must be the y position of the brick');
        equal(leftX, 30 + Brick.width, 'The third parameter of ball.isColliding must be the leftmost x position of the brick');
        equal(bottomY, 20 + Brick.height, 'The fourth parameter of ball.isColliding must be the most bottom y position of the brick');
        return true;
    }

    var mockResult = brick.isColliding(ball);

    equal(mockResult, true, 'The result must be true, because the mock returns true');
});


module('Player');

test('you must define a class Player', function () {
    equal(typeof Player, "function", "The class Player must be defined");
});

test('a player must have a score getter, which gives the score', function () {
    var player = new Player();
    equal(player.score, '0 point', "a player must have an getter score which give the score formatted as a string");
});

test('a player must have a score getter and a addPoints method, which gives the score without a "s" to point if 1 point', function () {
    var player = new Player();
    equal(typeof player.addPoints, 'function', "a player must have a method addPoints");
    equal(player.addPoints.length, 1, "the method addPoints take on parameter");
    player.addPoints(1);
    equal(player.score, '1 point', "the getter score must return correctly formatted score");
});

test('a player must have a score getter and a addPoints method, which gives the score with a "s" to points if more than 1 point', function () {
    var player = new Player();
    equal(typeof player.addPoints, 'function', "a player must have a method addPoints");
    equal(player.addPoints.length, 1, "the method addPoints take on parameter");
    player.addPoints(2);
    equal(player.score, '2 points', "the getter score must return correctly formatted score");
});

test('a player must have a display score method that display score at the selector indicated', function () {
    var player = new Player();
    player.addPoints(12);
    equal(typeof player.displayScore, 'function', "a player must have a display score method");
    equal(player.displayScore.length, 1, "the display score method take exactly one parameter");
    player.displayScore('#mockScoreHolder');
    equal($('#mockScoreHolder').html(), '12 points', "The display score method fill the element which css selector is passed in parameter with the score of player");

    $('#mockScoreHolder').empty()
});

module('Indesctructible brick');

test('class IndestructibleBrick must exist', function () {
    equal(typeof IndestructibleBrick, "function", "The class IndestructibleBrick must be defined");
});

test('class IndestructibleBrick must extends Brick', function () {
    equal(IndestructibleBrick.prototype.__proto__.constructor.toString().indexOf('function Brick'), 0, 'class IndescructibleBrick must extends Brick ');
});

test('an indestructible brick must have the corresponding sprite', function () {
    var brick = new IndestructibleBrick(20, 30);
    equal(brick.sprite, 'sprite/chocnoir.png', "an indescructible brick must have 'sprite/chocnoir.png' as sprite");
});

test('an indestructible brick must not be destructible', function () {
    var brick = new IndestructibleBrick(20, 30);
    equal(brick.destructible, false, 'an indestructible brick must be indestructible');
});

module('Three lives brick');

test('class ThreeLiveBrick must exist', function () {
    equal(typeof ThreeLiveBrick, "function", "The class ThreeLiveBrick must be defined");
});

test('class ThreeLiveBrick must extends Brick', function () {
    equal(ThreeLiveBrick.prototype.__proto__.constructor.toString().indexOf('function Brick'), 0, 'class ThreeLiveBrick must extends Brick ');
});

test('class ThreeLiveBrick must have 3 lives', function () {
    var brick = new ThreeLiveBrick(20, 30);
    equal(brick.live, 3, "a threeLiveBrick must have 3 lives");
});

test('class ThreeLiveBrick must show sprite gold1 if 3 lives', function () {
    var brick = new ThreeLiveBrick(20, 30);
    equal(brick.sprite, 'sprite/gold1.png', "the sprite of a threeLiveBrick must be 'sprite/gold1.png'");
});

test('class ThreeLiveBrick must show sprite gold2 if 2 lives', function () {
    var brick = new ThreeLiveBrick(20, 30);
    brick.live = 2
    equal(brick.sprite, 'sprite/gold2.png', "at 2 lives, the sprite of a three live brick must be 'sprite/gold2.png'");
});

test('class ThreeLiveBrick must show sprite gold3 if 1 life', function () {
    var brick = new ThreeLiveBrick(20, 30);
    brick.live = 1
    equal(brick.sprite, 'sprite/gold3.png', "at 1 life, the sprite of a threeLiveBrick must be 'sprite/gold3.png'");
});

module('cheat code');

test('click on cheat button must add class "on" on cheat button ', function () {
    $('#cheat').click();
    ok($('#cheat').hasClass('on'), 'you must listen click on #cheat button and add the "on"  class');

    Ship.width = 60;
    $('#cheat').removeClass('on');
});

test('click on cheat button must change size of ship', function () {
    $('#cheat').click();
    equal(Ship.width, 150, 'you must listen click on #cheat button and set the width of the ship at 150');

    Ship.width = 60;
    $('#cheat').removeClass('on');
});