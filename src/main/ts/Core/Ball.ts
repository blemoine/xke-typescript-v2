/// <reference path="Speed.ts" />

class Ball {
    static radius:number = 8;
    speed:Speed;
    sprite:string = 'sprite/sprite-tir.png';

    constructor(public x:number, public y:number) {
        this.speed = new Speed();
    }

    isColliding(x:number, y:number, leftX:number, bottomY:number):boolean {
        return this.x + Ball.radius > x &&
            this.x - Ball.radius < leftX &&
            this.y + Ball.radius > y &&
            this.y - Ball.radius < bottomY;
    }
}