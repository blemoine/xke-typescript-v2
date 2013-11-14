var DOM_VK_SPACE = 32;
var DOM_VK_LEFT = 37;
var DOM_VK_RIGHT = 39;

//Scoping pour éviter que $ leak partout
module StateModule {

    declare var $;
    export class State implements Renderable {

        events:KeyEventReactor[] = [];

        constructor(public drawCanvas:DrawCanvas) {
        }

        init() {

            $(document).keydown((event)=> {
                var key = event.which;

                this.events.forEach((reactor) => {
                    if (key == reactor.keyCode) {
                        reactor.action();
                    }
                });
            });
        }

        destroy() {
            $(document).off('keydown keyup');
        }

        render() {
            this.drawCanvas.clear();
        }
    }

}

