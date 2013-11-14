class Brick {

    static width:number = 40;
    static height:number = 30;

    live:number = 1;
    destructible:boolean = true;
    points:number = 10;

    sprite:string = 'sprite/sprite-brique.png';

    constructor(public x:number, public y:number) {
    }

    isNotColliding(ball:Ball):boolean {
        return !(ball.x + Ball.radius > this.x &&
            ball.x - Ball.radius < this.x + Brick.width &&
            ball.y + Ball.radius > this.y &&
            ball.y - Ball.radius < this.y + Brick.height);
    }

}
