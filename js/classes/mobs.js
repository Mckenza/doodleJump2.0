import { BasicPlatform } from '/js/classes/basic_platform.js';

class Mobs extends BasicPlatform {
    constructor(coords) {
        super(coords);
        this.vx = 1.5;
        this.type = 'mob';
        this.move();
    }

    move() {
        let triggerMove = false;
        let range = 0;
        setInterval(() => {
            if (!triggerMove) {
                this.coords[0] += this.vx;
                range += this.vx;
                if (range >= 50) {
                    triggerMove = true;
                }
            }

            if (triggerMove) {
                this.coords[0] -= this.vx;
                range -= this.vx;
                if (range <= 0) {
                    triggerMove = false;
                }
            }
        }, 5);
    }
}

export { Mobs };