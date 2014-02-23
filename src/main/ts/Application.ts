
/// <reference path="../../resources/jquery.d.ts" />

class Brick {

    static width:number = 40;
    static height:number = 30;

    destructible:boolean = true;
    sprite:string = 'sprite/sprite-brique.png';
    live:number = 1;
    points:number = 10;

    constructor(public x:number, public y:number) {
    }

    isColliding(ball:Ball) {
        return ball.isColliding(this.x, this.y, this.x + Brick.width, this.y + Brick.height);
    }
}

class Player {

    private point:number = 0;

    addPoints(points:number) {
        this.point = points;
    }

    get score():string {
        if (this.point < 2) {
            return this.point + ' point';
        }
        return this.point + ' points';
    }

    displayScore(selector:String) {
        $(selector).html(this.score)
    }
}

class IndestructibleBrick extends Brick {
    sprite:string = 'sprite/chocnoir.png';
    destructible:boolean = false;
}

class ThreeLiveBrick extends Brick {

    live:number = 3;

    get sprite():string {
        if (this.live == 1) {
            return 'sprite/gold3.png'
        } else if (this.live == 2) {
            return 'sprite/gold2.png'
        } else {
            return 'sprite/gold1.png'
        }
    }
}

$('#cheat').click(function () {
    $(this).addClass('on');
    Ship.width = 150;
});