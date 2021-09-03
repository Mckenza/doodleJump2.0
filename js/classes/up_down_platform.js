import { BasicPlatform } from '/js/classes/basic_platform.js';

class UpDownPlatform extends BasicPlatform {
    constructor(coords) {
        super(coords);
        this.type = 'upDown';
        this.add = 'none';      /* добавочное к платформе*/
        this.vy = 0.75;
        this.currentUp = 300;
        this.pause = false;
        this.move();
        this.randomAdd();
    }

    move() {
        let triggerMove = false;
        setInterval(() => {
            if (!this.pause) {
                if (!triggerMove) {
                    this.coords[1] -= this.vy;
                    this.currentUp -= this.vy;
                    if (this.currentUp <= 0) {
                        triggerMove = true;
                    }
                }

                if (triggerMove) {
                    this.coords[1] += this.vy;
                    this.currentUp += this.vy;
                    if (this.currentUp >= 300) {
                        triggerMove = false;
                    }
                }
            }
        }, 5);
    }

    randomAdd() {
        super.randomAdd();
    }
}

export { UpDownPlatform };