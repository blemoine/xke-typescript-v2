class LoseState extends State {
    constructor(drawCanvas:DrawCanvas) {
        super(drawCanvas);
    }

    render() {
        super.render();
        this.drawCanvas.write('You lose; press space to restart', 140, 200);
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

}