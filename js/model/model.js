import { Doodle } from "/js/classes/doodle.js";
import { BasicPlatform } from '/js/classes/basic_platform.js';
import { RightLeftPlatform } from '/js/classes/right_left_platform.js';
import { UpDownPlatform } from '/js/classes/up_down_platform.js';
import { Mobs } from '/js/classes/mobs.js';
import { Bullet } from '/js/classes/bullet.js';

class Model {
    constructor(view) {
        this.view = view;
        this.doodle = new Doodle();
        this.fieldPlatform = [];
        this.arrayBullets = [];
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
    }

    getObjDoodle() {
        return this.doodle;
    }

    getAnimation() {
        let { xStart, yStart, height, vx, vy, direction, moveRight, moveLeft } = this.doodle.getCountDoodle();  // данные о дудле
        this.spawnPlatforms();
        this.startValue.startY = yStart;
        this.startValue.startX = xStart;
        let coordsBul = [];

        /*
        if(this.arrayBullets.length !== 0){  
            this.arrayBullets.map((value)=>{
                coordsBul.push(value.getCoords());
            })
            console.log(coordsBul);
        }
        */

        if(xStart > 500){
            xStart = -60;
        }
        if(xStart < -60){
            xStart = 498;
        }

        /* право */
        if (moveRight) {
            xStart += vx;
            if (vx < 2) {
                vx += 0.01;
            }
        }

        /* Лево */
        if (moveLeft) {
            xStart -= vx;
            if (vx < 2) {
                vx += 0.01;
            }
        }

        /* true - низ, false - верх */
        if (direction) {
            yStart += vy;
            vy += 0.04;

            this.fieldPlatform.forEach((value) => {
                const coords = value.getCoords();
                const extension = value.getAdd();
                if (coords[1] < yStart) {
                    return;
                }
                /*coords[1] < yStart + height */
                if (coords[1] < yStart + height && coords[1] + 15 > yStart + height) {
                    if ((coords[0] <= xStart && coords[0] + 80 >= xStart + height) || (coords[0] > xStart && coords[0] <= xStart + height) || (coords[0] + 80 >= xStart && coords[0] + 80 < xStart + height)) {
                        if(extension === 'tramp'){
                            vy = 10;
                        } else if (extension === 'spring'){
                            vy = 7;
                        } else {
                            vy = 4;
                        }
                        direction = false;
                    }
                }
            })
        }

        if (!direction) {
            if (yStart <= 400) {

                this.fieldPlatform.map((value) => {
                    const coords = value.getCoords();
                    return [coords[0], coords[1] += vy];
                })
                vy -= 0.04;
                this.startValue.current += vy; /* сдвиг сверху вниз и отслеживать последние кооринаты */

                if (vy <= 0) {
                    direction = true;
                    vy = 0;
                }
            }
            if (yStart > 400) {
                yStart -= vy;
                vy -= 0.04;

                if (vy <= 0) {
                    direction = true;
                    vy = 0;
                }
            }
        }

        this.doodle.setCountDoodle({ xStart, yStart, height, vx, vy, direction, moveRight, moveLeft });
        this.view.draw({ xStart, yStart, height, vx, vy, direction, moveRight, moveLeft }, this.fieldPlatform, this.arrayBullets);
    }

    startTimer() {
        setInterval(this.getAnimation.bind(this), 5);
    }

    spawnBullet(){
        this.arrayBullets.push(new Bullet([this.startValue.startX, this.startValue.startY]));
        console.log(this.arrayBullets);
    }

    spawnPlatforms() {
        let currentHeight = this.startValue.current;
        let randomHeightBetweenPlatform = 0;
        let randomXforPlatform = 20;
        let upDownCoef = 0;

        if (currentHeight > -200) {
            for (let i = currentHeight; i > -800;) {
                randomXforPlatform = Math.floor(Math.random() * (401 - 20) + 20);
                let randomTypePlatform = Math.floor(Math.random() * 101 + 1);
                if (randomTypePlatform < 10) {
                    this.fieldPlatform.push(new RightLeftPlatform([20, i]));
                } else if (randomTypePlatform > 11 && randomTypePlatform < 15){
                    upDownCoef = 250;
                    this.fieldPlatform.push(new UpDownPlatform([randomXforPlatform, i]));
                } else if (randomTypePlatform > 15 && randomTypePlatform < 18){
                    this.fieldPlatform.push(new Mobs([randomXforPlatform, i]));
                    upDownCoef = 80;
                } else {
                    this.fieldPlatform.push(new BasicPlatform([randomXforPlatform, i]));
                }

                randomHeightBetweenPlatform = Math.floor(Math.random() * (this.configPlatfowm.maxRange + 1 - this.configPlatfowm.minRange) + this.configPlatfowm.minRange) + upDownCoef;
                i -= randomHeightBetweenPlatform;
                upDownCoef = 0;
                this.startValue.current -= randomHeightBetweenPlatform;
            }
        }

        /* чистим что уже за отрисовкой */

        this.fieldPlatform.map((value, index) => {
            const coordsOver = value.getCoords();
            if (coordsOver[1] > 1000) {
                this.fieldPlatform.splice(index, 1);
            }
        });
    }
}

export { Model };