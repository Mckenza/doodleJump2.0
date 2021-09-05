import { Doodle } from '/js/classes/doodle.js';
import { LoadData } from '/js/classes/loadData.js';

class ModelMenu {
    constructor(view) {
        this.view = view;
        this.ajax = new LoadData();
        this.dataAjax = [];
        this.doodle = new Doodle();
        this.doodle.setCountDoodle({
            xStart: 70,
            yStart: 50,
            height: 60,
            vx: 1,
            vy: 0,
            direction: true,
            moveRight: false,
            moveLeft: false,
        });
        this.widthCanvas = 200;
        this.heightCanvas = 400;
        this.setTimer();
    }

    getAnimation() {
        let { xStart, yStart, height, vx, vy, direction, moveRight, moveLeft } = this.doodle.getCountDoodle();

        if (direction) {
            yStart += vy;
            vy += 0.04;

            if (this.heightCanvas - 10 <= yStart + height) {
                vy = 4.84;
                direction = false;
            }
        }

        if (!direction) {

            yStart -= vy;
            vy -= 0.04;

            if (vy <= 0) {
                direction = true;
                vy = 0;
            }
        }

        this.doodle.setCountDoodle({ xStart, yStart, height, vx, vy, direction, moveRight, moveLeft });
        this.view.draw({ xStart, yStart });
    }

    setTimer() {
        setInterval(this.getAnimation.bind(this), 5);
    }

    getDataScore(){
        this.ajax.readData(this.loadData.bind(this));      
    }
    
    loadData(data){
        this.dataAjax = data;
    }

    parseData(){
        this.dataAjax = this.dataAjax.map()
    }
}

export { ModelMenu };