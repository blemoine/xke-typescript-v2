class DrawCanvas {

    spriteCiel:HTMLImageElement;

    spriteCache = {};

    constructor(public context:CanvasRenderingContext2D, public height:number, public width:number) {
        this.spriteCiel = this.spriteImageBuilder('sprite/ciel.png');
    }

    write(text:string, x:number, y:number) {
        this.context.fillStyle = 'black';
        this.context.font = "24pt Helvetica";
        this.context.fillText(text, x, y)
    }

    clear() {
        this.context.drawImage(this.spriteCiel, 0, 0);
    }

    drawShip(ship:Ship) {
        this.context.fillStyle = 'black';
        this.context.drawImage(this.getSprite(ship.sprite), ship.x, ship.y - 20, Ship.width, Ship.height + 20);
    }

    drawBall(ball:Ball) {
        this.context.drawImage(this.getSprite(ball.sprite), ball.x - Ball.radius, ball.y - Ball.radius, 2 * Ball.radius, 2 * Ball.radius);
    }

    drawLevel(level:Lvl.Level) {
        level.bricks.forEach((brick) => {
            this.drawBrick(brick);
        });
    }

    private drawBrick(brick:IBrick) {
        var anyBrick:any = brick;
        this.context.drawImage(this.getSprite(brick.sprite), brick.x, brick.y, anyBrick.constructor.width, anyBrick.constructor.height);
    }

    getSprite(sprite:string):HTMLImageElement {
        if (!this.spriteCache[sprite]) {
            this.spriteCache[sprite] = this.spriteImageBuilder(sprite);
        }
        return this.spriteCache[sprite];
    }

    private spriteImageBuilder(url) {
        var img = new Image();
        img.src = url;
        return img;
    }
}