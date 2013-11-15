module('Brick');

test("You must define a brick class", function () {
    equal(typeof Brick, "function", "The class Brick must be defined");
});

test('Brick must have a constructor taking 2 parameters x and y', function () {
    var brick = new Brick(20, 30);
    equal(brick.x, 20);
    equal(brick.y, 30);
});

test('a brick  must be destructible', function () {
    var brick = new Brick(40, 50);
    equal(brick.destructible, true);
});

test('a brick  must have a sprite', function () {
    var brick = new Brick(40, 50);
    equal(brick.sprite, 'sprite/sprite-brique.png');
});

test('a brick must give ten point', function () {
    var brick = new Brick(40, 50);
    equal(brick.points, 10);
});
test('a brick must have 1 life', function () {
    var brick = new Brick(40, 50);
    equal(brick.live, 1);
});

test('Brick must have static height', function () {
    equal(Brick.height, 30);
});

test('Brick must have static width', function () {
    equal(Brick.width, 40);
});

test('a brick must have a method isColliding taking a ball', function () {
    var brick = new Brick(20, 40);
    equal(typeof brick.isColliding, 'function');
    equal(brick.isColliding.length, 1);
});

test('a brick is not colliding with a brick if leftmost part of ball if right of rightmost part of brick ', function () {
    var brick = new Brick(20, 40);
    var ball = new Ball(69, 40);
    equal(brick.isColliding(ball), false);
});

test('a brick is not colliding with a brick if rightmost part of ball if left of leftmost part of brick ', function () {
    var brick = new Brick(20, 40);
    var ball = new Ball(11, 40);
    equal(brick.isColliding(ball), false);
});

test('a brick is not colliding with a brick if uppermost part of ball if bottom of most bottom part of brick ', function () {
    var brick = new Brick(20, 40);
    var ball = new Ball(20, 79);
    equal(brick.isColliding(ball), false);
});

test('a brick is not colliding with a brick if most bottom part of ball if upper of uppermost part of brick ', function () {
    var brick = new Brick(20, 40);
    var ball = new Ball(20, 31);
    equal(brick.isColliding(ball), false);
});

test('a brick is colliding with a brick if a point of the ball is in the brick', function () {
    var brick = new Brick(20, 40);
    equal(brick.isColliding(new Ball(20, 33)), true);
    equal(brick.isColliding(new Ball(13, 40)), true);
});

module('Player');

test('you must define a class Player', function () {
    equal(typeof Player, "function", "The class Player must be defined");
});

test('a player must have a score getter, which gives the score', function () {
    var player = new Player();
    equal(player.score, '0 point');
});

test('a player must have a score getter and a addPoints method, which gives the score without a "s" to point if 1 point', function () {
    var player = new Player();
    equal(typeof player.addPoints, 'function');
    equal(player.addPoints.length, 1);
    player.addPoints(1);
    equal(player.score, '1 point');
});

test('a player must have a score getter and a addPoints method, which gives the score with a "s" to points if more than 1 point', function () {
    var player = new Player();
    equal(typeof player.addPoints, 'function');
    equal(player.addPoints.length, 1);
    player.addPoints(2);
    equal(player.score, '2 points');
});

test('a player must have a display score method that display score at the selector indicated', function () {
    var player = new Player();
    player.addPoints(12);
    equal(typeof player.displayScore, 'function');
    equal(player.displayScore.length, 1);
    player.displayScore('#mockScoreHolder');
    equal($('#mockScoreHolder').html(), '12 points');

    $('#mockScoreHolder').empty()
});

module('Indesctructible brick');

test('class IndestructibleBrick must exist', function () {
    equal(typeof IndestructibleBrick, "function", "The class IndestructibleBrick must be defined");
});

test('class IndestructibleBrick must extends Brick', function () {
    equal(IndestructibleBrick.prototype.__proto__.constructor.toString().indexOf('function Brick'), 0);
});

test('an indestructible brick must have the corresponding sprite', function () {
    var brick = new IndestructibleBrick(20, 30);
    equal(brick.sprite, 'sprite/chocnoir.png');
});

test('an indestructible brick must not be destructible', function () {
    var brick = new IndestructibleBrick(20, 30);
    equal(brick.destructible, false);
});

module('Three lives brick');

test('class ThreeLiveBrick must exist', function () {
    equal(typeof ThreeLiveBrick, "function", "The class ThreeLiveBrick must be defined");
});

test('class ThreeLiveBrick must extends Brick', function () {
    equal(ThreeLiveBrick.prototype.__proto__.constructor.toString().indexOf('function Brick'), 0);
});

test('class ThreeLiveBrick must have 3 lives', function () {
    var brick = new ThreeLiveBrick(20, 30);
    equal(brick.live, 3);
});

test('class ThreeLiveBrick must show sprite gold1 if 3 lives', function () {
    var brick = new ThreeLiveBrick(20, 30);
    equal(brick.sprite, 'sprite/gold1.png');
});

test('class ThreeLiveBrick must show sprite gold2 if 2 lives', function () {
    var brick = new ThreeLiveBrick(20, 30);
    brick.live = 2
    equal(brick.sprite, 'sprite/gold2.png');
});

test('class ThreeLiveBrick must show sprite gold3 if 1 life', function () {
    var brick = new ThreeLiveBrick(20, 30);
    brick.live = 1
    equal(brick.sprite, 'sprite/gold3.png');
});

module('cheat code');

test('click on cheat button must add class "on" on cheat button ', function () {
    $('#cheat').click();
    ok($('#cheat').hasClass('on'));

    Ship.width = 60;
    $('#cheat').removeClass('on');
});

test('click on cheat button must change size of ship', function () {
    $('#cheat').click();
    equal(Ship.width, 150);

    Ship.width = 60;
    $('#cheat').removeClass('on');
});