//A déplacer
interface IPlayer {
    name:string;
    score:number;
}

//Creation du player
// Duck typing d'interface
// type primitif
// classe
//les méthodes
//getter setter
//méthode privée
//valeur par défaut
//reference


/// <reference path="Core/jquery.d.ts" />


class Player {
    constructor(public name:string, private _score:number = 0) {

    }

    set score(points:number) {
        this._score = points;
    }

    get score():number {
        return this._score;
    }


    instrument() {
        $('#displayScore').click(() => {
            // afficher les meilleurs scores avec le score
        });
    }
}


//Creation d'un niveau
// module
//


/// <reference path="Core/Brick.ts" />
/// <reference path="Core/Ball.ts" />
/// <reference path="Core/Lvl.ts" />
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

class IndestructibleBrick extends Brick {
    sprite:string = 'sprite/chocnoir.png';
    destructible:boolean = false;
}

module Lvl {

    levelsDescriptor.push({
        bricks: [
            new Brick(90, 50),
            new Brick(90 + Brick.width, 50),
            new Brick(90, 50 + Brick.height),
            new Brick(90 + Brick.width, 50 + Brick.height)
        ]
    });

    levelsDescriptor.push({
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
    });

    levelsDescriptor.push({
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
    });

}
