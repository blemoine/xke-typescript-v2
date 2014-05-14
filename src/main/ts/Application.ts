/// <reference path="../../resources/jquery.d.ts" />

class Brick {
    x:number;
    y:number;
    destructible:boolean = true;
    sprite:String = 'sprite/sprite-brique.png';
    points:number = 10;
    live:number = 1
    static height:number = 30;
    static width:number = 40;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isColliding(ball:Ball) {
        return ball.isColliding(this.x, this.y, (this.x + Brick.width), this.y + Brick.height);
    }
}

class Player {
    point:number = 0;

    get score() {
        return this.point + " point" + (this.point > 1 ? 's' : '');
    }

    addPoints(point) {
        this.point += point;
    }

    displayScore(cssSelector:String) {
        $(cssSelector).html(this.score);
    }
}

class IndestructibleBrick extends Brick {
    sprite:String = 'sprite/chocnoir.png';
    destructible:boolean = false;
}

class ThreeLiveBrick extends Brick {
    get sprite():String {
        return this.live == 2 ? 'sprite/gold2.png' :
                this.live == 1 ? 'sprite/gold3.png' :
            'sprite/gold1.png';
    }

    live = 3;
}

$("#cheat").on('click', function () {
    $("#cheat").addClass('on');
    Ship.width = 150;
});