class StartState extends State {
    constructor(drawCanvas:DrawCanvas) {
        super(drawCanvas);
    }

    init() {
        super.init();
        this.events.push({
            keyCode: DOM_VK_SPACE,
            action: function () {
                $(document).trigger('start');
                return false;
            }
        });
    }

    render() {
        super.render();
        this.drawCanvas.write('Press space to start', 140, 200);
    }
}
