import {View} from '/js/view/view.js';
import {Model} from '/js/model/model.js';

class Controller{
    constructor(){
        this.view = new View();
        this.view.setStyleGameField();
        this.model = new Model(this.view);
        this.objDoodle = this.model.getObjDoodle();
        this.events();
    }

    /* кнопка движения по сторонам*/ 
    events(){
        addEventListener('keydown', (e) =>{
            if(e.code === 'ArrowRight'){
                this.objDoodle.setIsMoveRight(true);
            }

            if(e.code === 'ArrowLeft'){
                this.objDoodle.setIsMoveLeft(true);
            }
        });

        addEventListener('keyup', (e) =>{
            if(e.code === 'ArrowRight'){
                this.objDoodle.setIsMoveRight(false);
                this.objDoodle.setVXzero();
            }

            if(e.code === 'ArrowLeft'){
                this.objDoodle.setIsMoveLeft(false);
                this.objDoodle.setVXzero();
            }
        });

        /* кнопка стрельбы*/ 
        addEventListener('keypress', (e) =>{
            if(e.code === 'Space'){
                this.model.spawnBullet();
            }
        })
    }
}

export {Controller}