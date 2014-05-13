class Ship {

    static width:number=60;
    static height:number=40;
    speed:Speed;
    sprite:string =  'sprite/sprite-vaisseau.png';

    constructor(public x:number,public y:number) {
        this.speed = new Speed();
    }

}