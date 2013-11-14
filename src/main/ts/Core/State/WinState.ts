class WinState extends StateModule.State {
    constructor(drawCanvas:DrawCanvas) {
        super(drawCanvas);
    }

    render() {
        super.render();
        this.drawCanvas.write('You win; press space to restart', 140, 200);
    }

    init() {
        super.init();
        this.events.push({
            keyCode: DOM_VK_SPACE,
            action: function () {
                BUS.fire('start');
                return false;
            }
        });
    }

}