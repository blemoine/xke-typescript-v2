//Inversion de Control, en mode Arrache !
declare var Player;

enum GameEvents {
    START, LOSE, NEXT
}
class EventBus {
    listeners:any = {};

    on(event:GameEvents, listener:() => any) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    fire(event:GameEvents) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => listener())
        }
    }
}


var BUS = new EventBus();


class Game implements Renderable {
    state:StateModule.State;
    width:number = 640;
    height:number = 480;
    drawCanvas:DrawCanvas;
    currentLevel:number = 0;
    player:IPlayer;

    constructor(public id:string) {
        var canvas = <HTMLCanvasElement>document.getElementById(this.id);
        canvas.width = this.width;
        canvas.height = this.height;
        var context = canvas.getContext('2d');
        this.drawCanvas = new DrawCanvas(context, this.height, this.width);
        this.changeState(new StartState(this.drawCanvas));
        var PlayerClass = PlayerMock;
        if (typeof Player != "undefined") {
            PlayerClass = Player;
        }

        var PlayerClass = PlayerMock;
        if (typeof Player != "undefined") {
            PlayerClass = Player;
        }

        this.player = new PlayerClass();
        this.player.displayScore('#score');

        var goToIngameState = () => {
            var ingameState = new StateModule.IngameState(this.drawCanvas, this.currentLevel);
            ingameState.level.brickDestroyedListeners.push((brick) => {
                this.player.addPoints(brick.points);
                this.player.displayScore('#score');
                return true;
            });
            this.changeState(ingameState);
        };

        BUS.on(GameEvents.START, () => {
            this.player = new PlayerClass();
            this.player.displayScore('#score');
            goToIngameState();
        });

        BUS.on(GameEvents.LOSE, () => {
            this.changeState(new LoseState(this.drawCanvas));
        });

        BUS.on(GameEvents.NEXT, () => {
            ++this.currentLevel;
            if (this.currentLevel < Lvl.levelsDescriptor.length) {
                goToIngameState();
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