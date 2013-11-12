/// <reference path="Speed.ts" />

class Ball {
    static radius:number = 8;
    speed:Speed;
    sprite:string = 'sprite/sprite-tir.png';

    constructor(public x:number, public y:number) {
        this.speed = new Speed();
    }

}