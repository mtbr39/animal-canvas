

class InputManager {
    constructor(option) {
        this.canvas = option.canvas;
        this.cw = option.cw;
        this.org = option.org;
        this.mousePosition = {};
        this.receivers = [];
        this.isMouseHoldDown = false;
        this.wheelDelta = null;

        // ---- マウスイベント ----
        this.canvas.addEventListener('pointerdown', (e) => {
            this.mousePosition = this.getMousePosition(e);
            this.isMouseHoldDown = true;
        });

        this.canvas.addEventListener('pointerup', (e) => {
            this.isMouseHoldDown = false;
        });

        this.canvas.addEventListener('pointermove', (e) => {
            this.mousePosition = this.getMousePosition(e);
            this.receivers.forEach( (receiver) => {
                if (typeof receiver.onMouseMove === 'function') {
                    receiver.onMouseMove({mousePosition: this.mousePosition});
                }
            } );

        });

        window.addEventListener('wheel', (e) => {
            this.wheelDelta = e.wheelDelta;
            this.receivers.forEach( (receiver) => {
                if (typeof receiver.onMouseWheel === 'function') {
                    receiver.onMouseWheel({wheelDelta: this.wheelDelta});
                }
            } );
        });

    }

    submitReceiver(object) {
        this.receivers.push(object);
    }

    getMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left - this.org.x*this.cw,
            y: event.clientY - rect.top - this.org.y*this.cw,
        };
    }

    update() {
        if (this.isMouseHoldDown) {

            if (this.prevMousePosition != null) {
                this.mousePositionDelta = {x: this.mousePosition.x - this.prevMousePosition.x, y: this.mousePosition.y - this.prevMousePosition.y};
                this.prevMousePosition = this.mousePosition;
            } else {
                this.mousePositionDelta = null;
                this.prevMousePosition = this.mousePosition;
            }

            this.receivers.forEach( (receiver) => {
                if (typeof receiver.onMouseHoldDown === 'function') {
                    receiver.onMouseHoldDown({mousePosition: this.mousePosition, mousePositionDelta: this.mousePositionDelta});
                }
            } );
        } else {
            this.prevMousePosition = null;
        }
    }
}
