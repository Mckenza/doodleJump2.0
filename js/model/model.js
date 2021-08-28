import { Doodle } from "/js/classes/doodle.js";
import { BasicPlatform } from '/js/classes/basic_platform.js';
import { RightLeftPlatform } from '/js/classes/right_left_platform.js';
import { UpDownPlatform } from '/js/classes/up_down_platform.js';
import { Mobs } from '/js/classes/mobs.js';
import { Bullet } from '/js/classes/bullet.js';
import { AudioDoodle } from '/js/classes/audio.js';

class Model {
    constructor(view) {
        this.view = view;
        this.doodle = new Doodle();
        this.audio = new AudioDoodle();
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
            minRange: 30,
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

        /* столкновение пули и моба */
        this.arrayBullets.map((value, index) => {
            const coordsBullet = value.getCoords();
            this.fieldPlatform.map((v, i) => {
                const coordsMob = v.getCoords();
                if (v.getType() === 'mob') {
                    if (coordsBullet[0] > coordsMob[0] && coordsBullet[0] < coordsMob[0] + 80 && coordsBullet[1] < coordsMob[1] + 50 && coordsBullet[1] > coordsMob[1]) {
                        this.arrayBullets.splice(index, 1);
                        this.fieldPlatform.splice(i, 1);
                    }
                }
            })
        })

        /* выход за пределы (лево) */
        if (xStart > 500) {
            xStart = -60;
        }
        /* выход за пределы (лево) */
        if (xStart < -60) {
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
                if (coords[1] < yStart + height && coords[1] + 15 > yStart + height) {
                    if ((coords[0] <= xStart && coords[0] + 80 >= xStart + height) || (coords[0] > xStart && coords[0] <= xStart + height) || (coords[0] + 80 >= xStart && coords[0] + 80 < xStart + height)) {
                        if (extension === 'tramp') {
                            this.audio.playTramp();
                            vy = 10;
                        } else if (extension === 'spring') {
                            this.audio.playSpring();
                            vy = 7;
                        } else {
                            this.audio.playJump();
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

    /* стреляем и чистим пули за пределами отрисовки */
    spawnBullet() {
        this.audio.playShoot();
        this.arrayBullets.push(new Bullet([this.startValue.startX, this.startValue.startY]));
        this.arrayBullets.map((value, index) => {
            if (value.getCoords()[1] < -450) {
                this.arrayBullets.splice(index, 1);
            }
        });
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
                    const randomSpawn = Math.floor(Math.random() * 300 + 30);
                    this.fieldPlatform.push(new RightLeftPlatform([randomSpawn, i]));
                } else if (randomTypePlatform > 11 && randomTypePlatform < 14 && !(this.fieldPlatform[this.fieldPlatform.length - 1] instanceof UpDownPlatform)) {
                    upDownCoef = 300;
                    this.fieldPlatform.push(new UpDownPlatform([randomXforPlatform, i]));
                } else if (randomTypePlatform > 15 && randomTypePlatform < 18) {
                    if(randomXforPlatform > 200){
                        const randomWithMob = Math.floor(Math.random() * 100 + 20);
                        const randomYwithMob = Math.floor(Math.random() * 20);
                        this.fieldPlatform.push(new Mobs([randomXforPlatform, i]));
                        this.fieldPlatform.push(new BasicPlatform([randomWithMob, i - randomYwithMob]));
                    } else {
                        const randomWithMob = Math.floor(Math.random() * 101 + 300);
                        const randomYwithMob = Math.floor(Math.random() * 20);
                        this.fieldPlatform.push(new Mobs([randomXforPlatform, i]));
                        this.fieldPlatform.push(new BasicPlatform([randomWithMob, i - randomYwithMob]));
                    }
                    upDownCoef = 60;
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