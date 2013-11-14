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
