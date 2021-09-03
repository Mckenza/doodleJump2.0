import { BasicPlatform } from '/js/classes/basic_platform.js';

class Bullet extends BasicPlatform {
    constructor(coords) {
        super(coords);
        this.vy = 5;
        this.isDel = false;
        this.pause = false;
        this.move();
    }

    move() {
        setInterval(() => {
            if(!this.pause){
                this.coords[1] -= this.vy;
                if (this.coords[1] < -500) {
                    this.vy = 0;
                    this.isDel = true;
                }
            }   
        }, 5);
    }

    getIsDel() {
        return this.isDel;
    }
}

export { Bullet };