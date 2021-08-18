class Doodle{
    constructor(){
        this.countDoodle = {
            xStart: 230,
            yStart: 500,
            height: 40,
            vx: 0,
            vy: 0,
            direction: true, /* true - низ, false - верх */
        }
    }

    getCountDoodle(){
        return this.countDoodle;
    }

    setCountDoodle(obj){
        this.countDoodle = {...obj};
    }
}

export {Doodle}