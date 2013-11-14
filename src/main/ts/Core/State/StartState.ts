class StartState extends StateModule.State {
    constructor(drawCanvas:DrawCanvas) {
        super(drawCanvas);
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

    render() {
        super.render();
        this.drawCanvas.write('Press space to start', 140, 200);
    }
}
