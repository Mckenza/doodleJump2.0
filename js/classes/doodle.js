class Doodle {
    constructor() {
        this.countDoodle = {
            xStart: 230,
            yStart: 500,
            height: 60,
            vx: 1,
            vy: 0,
            direction: true, /* true - низ, false - верх */
            moveRight: false, /* разрешение движения */
            moveLeft: false, /* разрешение движения */
        }
    }

    getCountDoodle() {
        return this.countDoodle;
    }

    setCountDoodle(obj) {
        this.countDoodle = { ...obj };
    }

    setIsMoveRight(value) {
        this.countDoodle.moveRight = value;
    }

    setIsMoveLeft(value) {
        this.countDoodle.moveLeft = value;
    }

    setVXzero() {
        this.countDoodle.vx = 1;
    }
}

export { Doodle }