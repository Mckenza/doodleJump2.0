import { Doodle } from '/js/classes/doodle.js';
import { BasicPlatform } from '/js/classes/basic_platform.js';
import { RightLeftPlatform } from '/js/classes/right_left_platform.js';
import { UpDownPlatform } from '/js/classes/up_down_platform.js';
import { Mobs } from '/js/classes/mobs.js';
import { Bullet } from '/js/classes/bullet.js';
import { AudioDoodle } from '/js/classes/audio.js';
import { LoadData } from '/js/classes/loadData.js';

class Model {
    constructor(view) {
        this.stopTimer = false;
        this.view = view;
        this.ajax = new LoadData();
        this.view.changePauseName(false);
        this.doodle = new Doodle();
        this.audio = new AudioDoodle();
        this.fieldPlatform = [];
        this.arrayBullets = [];
        this.arrayScore = [];
        this.score = 0;
        this.currentNick = '';
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
            basicChance: 10,
        }
        this.getNamefromLocal();
    }

    getObjDoodle() {
        return this.doodle;
    }

    setTimer(value) {
        this.stopTimer = value;
    }

    getAnimation() {
        if (this.stopTimer) {
            return;
        }

        if(this.score > 20000 && this.score < 39999){
            this.configPlatfowm.minRange = 40;
            this.configPlatfowm.basicChance = 20;
        }
        
        if(this.score > 40000 && this.score < 49999){
            this.configPlatfowm.basicChance = 30;
        }

        if(this.score > 50000){
            this.configPlatfowm.basicChance = 40;
            this.configPlatfowm.minRange = 40;
        }

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

        if (yStart > 810) {
            vx = 0;
            vy = 0;

            this.arrayBullets.map((value, index) => {
                this.arrayBullets.splice(index, 1);
            });

            if (this.fieldPlatform.length !== 0) {
                this.fieldPlatform.map((value, index) => {
                    const coordsOver = value.getCoords();
                    if (coordsOver[1] < -100 || coordsOver[1] > 800) {
                        this.fieldPlatform.splice(index, 1);
                    }
                });
                this.fieldPlatform.map((value) => {
                    const coords = value.getCoords();
                    return [coords[0], coords[1] -= 4];
                })
            } else {
                this.stopTimer = true;
                this.view.setStyleRestart();
            }
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
                this.score = Math.floor(this.score + vy);

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
        this.view.draw({ xStart, yStart, height, vx, vy, direction, moveRight, moveLeft }, this.fieldPlatform, this.arrayBullets, this.score);
    }

    /* Отправить данные на "сервер" */
    setDataScore(nick){
        this.currentNick = nick;
        this.ajax.readData(this.setDataScoreCallback.bind(this));
        //this.ajax.lockgetData(data);
    }

    setDataScoreCallback(data){
        console.log(data);
        this.arrayScore = data;
        this.arrayScore.push({nick: this.currentNick, score: this.score});
        this.parseData();
    }

    parseData(){
        if(this.arrayScore.length > 0){
            this.arrayScore = this.arrayScore.sort((a, b) =>{
                return b.score - a.score;
            });
        }
        if(this.arrayScore.length > 30){
            this.arrayScore.length = 30;
        }
        this.ajax.lockgetData(this.arrayScore);
    }

    /* получить ник из localStorage (даже если пустой) */
    getNamefromLocal(){
        this.view.setNickname(localStorage.getItem('DoodleJumpName'));
    }

    setNicknameinLocal(nickname){
        localStorage.setItem('DoodleJumpName', nickname);
    }

    stopAllPlatform(val){
        this.arrayBullets.map(value => {
            value.pauseObj(val);
        });
        this.fieldPlatform.map(value =>{
            if(value.getType() !== 'basic'){
                value.pauseObj(val);
            }
        })
    }

    startTimer() {
        setInterval(this.getAnimation.bind(this), 5);
    }

    /* стреляем и чистим пули за пределами отрисовки */
    spawnBullet() {
        if (!this.stopTimer) {
            this.audio.playShoot();
            this.arrayBullets.push(new Bullet([this.startValue.startX, this.startValue.startY]));
            this.arrayBullets.map((value, index) => {
                if (value.getCoords()[1] < -450) {
                    this.arrayBullets.splice(index, 1);
                }
            });
        }
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
                if (randomTypePlatform < this.configPlatfowm.basicChance) {
                    const randomSpawn = Math.floor(Math.random() * 300 + 30);
                    this.fieldPlatform.push(new RightLeftPlatform([randomSpawn, i]));
                } else if (randomTypePlatform > 61 && randomTypePlatform < 64 && !(this.fieldPlatform[this.fieldPlatform.length - 1] instanceof UpDownPlatform)) {
                    upDownCoef = 300;
                    this.fieldPlatform.push(new UpDownPlatform([randomXforPlatform, i]));
                } else if (randomTypePlatform > 45 && randomTypePlatform < 48) {
                    if (randomXforPlatform > 200) {
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
                    if(this.score < 100000){
                        this.fieldPlatform.push(new BasicPlatform([randomXforPlatform, i]));
                    } else {
                        const randomSpawn = Math.floor(Math.random() * 300 + 30);
                        this.fieldPlatform.push(new RightLeftPlatform([randomSpawn, i]));
                    }
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
            const type = value.getType();
            if (coordsOver[1] > 810 && type !== 'upDown') {
                this.fieldPlatform.splice(index, 1);
            }
            if (type === 'upDown' && coordsOver[1] > 900) {
                this.fieldPlatform.splice(index, 1);
            }
        });
    }
}

export { Model };