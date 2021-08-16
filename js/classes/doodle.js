class Doodle{
    constructor(){
        this.countDoodle = {
            xStart: 200,
            yStart: 700,
            height: 40,
            vx: 0,
            vy: 8,
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