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

/*


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

 */
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

    isColliding(ball) {
        return ball.x + Ball.radius > this.x &&
            ball.x - Ball.radius < this.x + Brick.width &&
            ball.y + Ball.radius > this.y &&
            ball.y - Ball.radius < this.y + Brick.height;
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