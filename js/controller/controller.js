import { View } from '/js/view/view.js';
import { Model } from '/js/model/model.js';

class Controller {
    constructor(contextContrl) {
        this.context = contextContrl;
        this.view = null;
        this.model = null;
        this.objDoodle = null;
        this.events();
        this.initModel();
    }

    initModel() {
        this.view = new View();
        this.view.setStyleReadyNoHidden();
        setTimeout(() => {
            this.view.setStyleReady();
        }, 2000);

        setTimeout(() => {
            this.model = new Model(this.view);
            this.objDoodle = this.model.getObjDoodle();
        }, 4000);
    }

    /* кнопка движения по сторонам*/
    events() {
        addEventListener('keydown', (e) => {
            if (e.code === 'ArrowRight' && this.objDoodle !== null) {
                this.objDoodle.setIsMoveRight(true);
            }

            if (e.code === 'ArrowLeft' && this.objDoodle !== null) {
                this.objDoodle.setIsMoveLeft(true);
            }
        });

        addEventListener('keyup', (e) => {
            if (e.code === 'ArrowRight' && this.objDoodle !== null) {
                this.objDoodle.setIsMoveRight(false);
                this.objDoodle.setVXzero();
            }

            if (e.code === 'ArrowLeft' && this.objDoodle !== null) {
                this.objDoodle.setIsMoveLeft(false);
                this.objDoodle.setVXzero();
            }
        });

        /* кнопка стрельбы*/
        addEventListener('keypress', (e) => {
            if (e.code === 'Space' && this.objDoodle !== null) {
                this.model.spawnBullet();
            }
        });

        document.getElementById('restart_button_id').onclick = () => {
            this.view.setStyleRestartHidden();
            this.model = new Model(this.view);
            this.objDoodle = this.model.getObjDoodle();
        }

        document.getElementById('menu_button_id').onclick = () => {
            this.model.setTimer();
            this.view.setStyleRestartHidden();
            this.view.setStyleGameFieldhidden();
            this.view = null;
            this.model = null;
            this.objDoodle = null;
            this.context.setVisibleMenu();
        }
    }
}

export { Controller }