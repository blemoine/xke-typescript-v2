// * Duck typing d'interface
// * Type "primitif"
// * classe
// * méthode
// * getter / setter
// * visiblité (private)
// * fichier de définition, definitely Typed
// * Module
// * Générique
// * Fonctions raccourcies =>


/// <reference path="../../resources/jquery.d.ts" />

class Player implements IPlayer {
    constructor(private _score:number = 0) {

    }

    get score():string {
        if (this._score <= 1) {
            return '' + this._score + ' point';
        } else {
            return '' + this._score + ' points';
        }
    }

    addPoints(points:number) {
        this._score += points;
    }

    displayScore() {
        $('#score').html(this.score);
    }
}


class Brick implements IBrick {

    static width:number = 40;
    static height:number = 30;

    live:number = 1;
    destructible:boolean = true;
    points:number = 10;

    sprite:string = 'sprite/sprite-brique.png';

    constructor(public x:number, public y:number) {
    }

    isColliding(ball:Ball):boolean {
        return ball.x + Ball.radius > this.x &&
            ball.x - Ball.radius < this.x + Brick.width &&
            ball.y + Ball.radius > this.y &&
            ball.y - Ball.radius < this.y + Brick.height;
    }

}

class IndestructibleBrick extends Brick {
    sprite:string = 'sprite/chocnoir.png';
    destructible:boolean = false;
    points:number = 20;
}

class ThreeLiveBrick extends Brick {

    live:number = 3;
    points:number = 15;

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

$(() => {
    $('#cheat').click(function () {
        console.log('prout');
        $(this).addClass('on');
        Ship.width = 150;
    });
});