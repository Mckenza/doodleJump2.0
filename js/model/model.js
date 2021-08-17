import { Doodle } from "/js/classes/doodle.js";
import { BasicPlatfowm } from '/js/classes/basic_platform.js';

class Model{
    constructor(view){
        this.view = view;
        this.doodle = new Doodle();
        this.fieldPlatform = [];
        this.startTimer();
        this.startValue = {
            startY: 780,
            startX: 10,
            current: 780,
        }

        /* Настройка расстояний между платформами при спавне */
        this.configPlatfowm = {
            minRange: 20,
            maxRange: 70,
        }
        //this.spawnPlatforms();
    }

    getAnimation(){
        let {xStart, yStart, height, vx, vy} = this.doodle.getCountDoodle();  // данные о дудле

        this.spawnPlatforms();
        this.doodle.setCountDoodle({xStart, yStart, height, vx, vy});
        this.view.draw(this.doodle.getCountDoodle(), this.fieldPlatform);
    }

    startTimer(){
        setInterval(this.getAnimation.bind(this), 1000);
    }

    spawnPlatforms(){
        let currentHeight = this.startValue.current;
        let randomHeightBetweenPlatform = 0;
        let randomXforPlatform = 20;

        for(let i = currentHeight; i > -800;){
            randomXforPlatform = Math.floor(Math.random() * (401 - 20) + 20);
            this.fieldPlatform.push(new BasicPlatfowm([randomXforPlatform, i]));

            randomHeightBetweenPlatform = Math.floor(Math.random() * (this.configPlatfowm.maxRange + 1 - this.configPlatfowm.minRange) + this.configPlatfowm.minRange);
            i -= randomHeightBetweenPlatform;
            this.startValue.current -= randomHeightBetweenPlatform;
        } 
    }
}

export {Model};