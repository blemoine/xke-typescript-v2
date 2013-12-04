describe('Brick',function(){

    it("You must define a brick class", function () {
        equal(typeof Brick, "function", "The class Brick must be defined");
    });

    it('Brick must have a constructor taking 2 parameters x and y', function () {
        var brick = new Brick(20, 30);
        equal(brick.x, 20);
        equal(brick.y, 30);
    });

    it('a brick  must be destructible', function () {
        var brick = new Brick(40, 50);
        equal(brick.destructible, true);
    });

    it('a brick  must have a sprite', function () {
        var brick = new Brick(40, 50);
        equal(brick.sprite, 'sprite/sprite-brique.png');
    });

    it('a brick must give ten point', function () {
        var brick = new Brick(40, 50);
        equal(brick.points, 10);
    });
    it('a brick must have 1 life', function () {
        var brick = new Brick(40, 50);
        equal(brick.live, 1);
    });

    it('Brick must have static height', function () {
        equal(Brick.height, 30);
    });

    it('Brick must have static width', function () {
        equal(Brick.width, 40);
    });

    it('a brick must have a method isColliding taking a ball', function () {
        var brick = new Brick(20, 40);
        equal(typeof brick.isColliding, 'function');
        equal(brick.isColliding.length, 1);
    });

    it('a brick is not colliding with a brick if leftmost part of ball if right of rightmost part of brick ', function () {
        var brick = new Brick(20, 40);
        var ball = new Ball(69, 40);
        equal(brick.isColliding(ball), false);
    });

    it('a brick is not colliding with a brick if rightmost part of ball if left of leftmost part of brick ', function () {
        var brick = new Brick(20, 40);
        var ball = new Ball(11, 40);
        equal(brick.isColliding(ball), false);
    });

    it('a brick is not colliding with a brick if uppermost part of ball if bottom of most bottom part of brick ', function () {
        var brick = new Brick(20, 40);
        var ball = new Ball(20, 79);
        equal(brick.isColliding(ball), false);
    });

    it('a brick is not colliding with a brick if most bottom part of ball if upper of uppermost part of brick ', function () {
        var brick = new Brick(20, 40);
        var ball = new Ball(20, 31);
        equal(brick.isColliding(ball), false);
    });

    it('a brick is colliding with a brick if a point of the ball is in the brick', function () {
        var brick = new Brick(20, 40);
        equal(brick.isColliding(new Ball(20, 33)), true);
        equal(brick.isColliding(new Ball(13, 40)), true);
    });
});

describe('Player', function (){

    it('you must define a class Player', function () {
        equal(typeof Player, "function", "The class Player must be defined");
    });

    it('a player must have a score getter, which gives the score', function () {
        var player = new Player();
        equal(player.score, '0 point');
    });

    it('a player must have a score getter and a addPoints method, which gives the score without a "s" to point if 1 point', function () {
        var player = new Player();
        equal(typeof player.addPoints, 'function');
        equal(player.addPoints.length, 1);
        player.addPoints(1);
        equal(player.score, '1 point');
    });

    it('a player must have a score getter and a addPoints method, which gives the score with a "s" to points if more than 1 point', function () {
        var player = new Player();
        equal(typeof player.addPoints, 'function');
        equal(player.addPoints.length, 1);
        player.addPoints(2);
        equal(player.score, '2 points');
    });

    it('a player must have a display score method that display score at the selector indicated', function () {
        var player = new Player();
        player.addPoints(12);
        equal(typeof player.displayScore, 'function');
        equal(player.displayScore.length, 1);
        player.displayScore('#mockScoreHolder');
        equal($('#mockScoreHolder').html(), '12 points');

        $('#mockScoreHolder').empty()
    });
});

describe('Indesctructible brick', function(){
    it('class IndestructibleBrick must exist', function () {
        equal(typeof IndestructibleBrick, "function", "The class IndestructibleBrick must be defined");
    });

    it('class IndestructibleBrick must extends Brick', function () {
        equal(IndestructibleBrick.prototype.__proto__.constructor.toString().indexOf('function Brick'), 0);
    });

    it('an indestructible brick must have the corresponding sprite', function () {
        var brick = new IndestructibleBrick(20, 30);
        equal(brick.sprite, 'sprite/chocnoir.png');
    });

    it('an indestructible brick must not be destructible', function () {
        var brick = new IndestructibleBrick(20, 30);
        equal(brick.destructible, false);
    });
});

describe('Three lives brick',function(){
    it('class ThreeLiveBrick must exist', function () {
        equal(typeof ThreeLiveBrick, "function", "The class ThreeLiveBrick must be defined");
    });

    it('class ThreeLiveBrick must extends Brick', function () {
        equal(ThreeLiveBrick.prototype.__proto__.constructor.toString().indexOf('function Brick'), 0);
    });

    it('class ThreeLiveBrick must have 3 lives', function () {
        var brick = new ThreeLiveBrick(20, 30);
        equal(brick.live, 3);
    });

    it('class ThreeLiveBrick must show sprite gold1 if 3 lives', function () {
        var brick = new ThreeLiveBrick(20, 30);
        equal(brick.sprite, 'sprite/gold1.png');
    });

    it('class ThreeLiveBrick must show sprite gold2 if 2 lives', function () {
        var brick = new ThreeLiveBrick(20, 30);
        brick.live = 2
        equal(brick.sprite, 'sprite/gold2.png');
    });

    it('class ThreeLiveBrick must show sprite gold3 if 1 life', function () {
        var brick = new ThreeLiveBrick(20, 30);
        brick.live = 1
        equal(brick.sprite, 'sprite/gold3.png');
    });
});

describe('cheat code',function(){

    it('click on cheat button must add class "on" on cheat button ', function () {
        $('#cheat').click();
        ok($('#cheat').hasClass('on'));

        Ship.width = 60;
        $('#cheat').removeClass('on');
    });

    it('click on cheat button must change size of ship', function () {
        $('#cheat').click();
        equal(Ship.width, 150);

        Ship.width = 60;
        $('#cheat').removeClass('on');
    });
});