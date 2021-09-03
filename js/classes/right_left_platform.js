import { BasicPlatform } from '/js/classes/basic_platform.js';

class RightLeftPlatform extends BasicPlatform {
    constructor(coords) {
        super(coords);
        this.type = 'rightLeft';
        this.add = 'none';      /* добавочное к платформе*/
        this.vx = 1;
        this.pause = false;
        this.move();
        this.randomAdd();
    }

    move() {
        let triggerMove = false;
        setInterval(() => {
            if (!this.pause) {
                if (!triggerMove) {
                    this.coords[0] += this.vx;
                    if (this.coords[0] >= 400) {
                        triggerMove = true;
                    }
                }

                if (triggerMove) {
                    this.coords[0] -= this.vx;
                    if (this.coords[0] <= 20) {
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

export { RightLeftPlatform };