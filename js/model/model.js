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
            maxRange: 90,
        }
    }

    getObjDoodle(){
        return this.doodle;
    }

    getAnimation(){
        let {xStart, yStart, height, vx, vy, direction, moveRight, moveLeft} = this.doodle.getCountDoodle();  // данные о дудле
        this.spawnPlatforms();

        /* право */
        if(moveRight){
            xStart += vx;
            if(vx < 2){
                vx += 0.01;  
            }    
        }

        /* Лево */
        if(moveLeft){
            xStart -= vx;
            if(vx < 2){
                vx += 0.01;  
            }  
        }

        /* true - низ, false - верх */
        if(direction){
            yStart += vy;
            vy += 0.04;

            this.fieldPlatform.forEach((value)=>{
                const coords = value.getCoords();
                if(coords[1] < yStart){
                    return;
                }
                if(coords[1] - 7 < yStart + height){
                    if((coords[0] <= xStart && coords[0] + 80 >= xStart + height) || (coords[0] > xStart && coords[0] <= xStart + height) || (coords[0] + 80 >= xStart && coords[0] + 80 < xStart + height)){
                        vy = 4;
                        direction = false;
                    }
                }
            })
        }

        if(!direction){
            if(yStart <= 400){

                const d = this.fieldPlatform.map((value)=>{
                    const coords = value.getCoords();
                    return [coords[0], coords[1] += vy];
                })
                vy -= 0.04;
                this.startValue.current += vy; /* сдвиг сверху вниз и отслеживать последние кооринаты */
    
                if(vy <= 0){
                    direction = true;
                    vy = 0;
                }
            }
            if(yStart > 400){
                yStart -= vy;
                vy -= 0.04;
    
                if(vy <= 0){
                    direction = true;
                    vy = 0;
                }
            }  
        }

        this.doodle.setCountDoodle({xStart, yStart, height, vx, vy, direction, moveRight, moveLeft});
        this.view.draw({xStart, yStart, height, vx, vy, direction, moveRight, moveLeft}, this.fieldPlatform);
    }

    startTimer(){
        setInterval(this.getAnimation.bind(this), 5);
    }

    spawnPlatforms(){
        let currentHeight = this.startValue.current;
        let randomHeightBetweenPlatform = 0;
        let randomXforPlatform = 20;

        if(currentHeight > -200){
            for(let i = currentHeight; i > -800;){
                randomXforPlatform = Math.floor(Math.random() * (401 - 20) + 20);
                this.fieldPlatform.push(new BasicPlatfowm([randomXforPlatform, i]));
    
                randomHeightBetweenPlatform = Math.floor(Math.random() * (this.configPlatfowm.maxRange + 1 - this.configPlatfowm.minRange) + this.configPlatfowm.minRange);
                i -= randomHeightBetweenPlatform;
                this.startValue.current -= randomHeightBetweenPlatform;
            } 
        }
        
        /* чистим что уже за отрисовкой */

        this.fieldPlatform.map((value, index) =>{
            const coordsOver = value.getCoords();
            if(coordsOver[1] > 1000){
                this.fieldPlatform.splice(index, 1);
            }
        });
    }
}

export {Model};