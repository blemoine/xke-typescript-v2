interface IBrick {
    sprite:string;
    x:number;
    y:number;
    destructible:boolean;
    live:number;
    isColliding: (ball:Ball) => boolean;
}


class BrickMock implements IBrick {
    sprite:string;
    x:number;
    y:number;
    destructible:boolean;
    live:number;
    isColliding(ball:Ball) {
        return false;
    }
}