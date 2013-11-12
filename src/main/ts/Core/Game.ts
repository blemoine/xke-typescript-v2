class Game implements Renderable {
    state:State;
    width:number = 640;
    height:number = 480;
    drawCanvas:DrawCanvas;
    currentLevel:number = 0;

    constructor(public id:string) {
        var canvas = <HTMLCanvasElement>document.getElementById(this.id);
        canvas.width = this.width;
        canvas.height = this.height;
        var context = canvas.getContext('2d');
        this.drawCanvas = new DrawCanvas(context, this.height, this.width);
        this.changeState(new StartState(this.drawCanvas));

        $(document).on('start', () => {
            this.changeState(new IngameState(this.drawCanvas, this.currentLevel));
        });
        $(document).on('lose', () => {
            this.changeState(new LoseState(this.drawCanvas));
        });
        $(document).on('next', () => {
            ++this.currentLevel;
            if (this.currentLevel < Lvl.levelsDescriptor.length) {
                this.changeState(new IngameState(this.drawCanvas, this.currentLevel));
            } else {
                this.currentLevel = 0;
                this.changeState(new WinState(this.drawCanvas));
            }
        });
    }

    changeState(newState) {
        if (this.state) {
            this.state.destroy();
        }
        this.state = newState;
        this.state.init();
    }

    render() {
        setInterval(() => {
            this.state.render()
        }, 50);
    }
}