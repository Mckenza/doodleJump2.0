import { View } from '/js/view/view.js';
import { Model } from '/js/model/model.js';

class Controller {
    constructor(contextContrl) {
        this.context = contextContrl;
        this.view = null;
        this.model = null;
        this.objDoodle = null;
        this.isPause = false;
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

    events() {
        let shoot = true;
        addEventListener('keydown', (e) => {
            if (e.code === 'ArrowRight' && this.objDoodle !== null) {
                this.objDoodle.setIsMoveRight(true);
            }

            if (e.code === 'ArrowLeft' && this.objDoodle !== null) {
                this.objDoodle.setIsMoveLeft(true);
            }
            if (e.code === 'KeyF' && this.objDoodle !== null) {
                if (shoot) {
                    this.view.shootDown();
                    this.model.spawnBullet();
                    shoot = false;
                }
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
            if (e.code === 'KeyF' && this.objDoodle !== null) {
                this.view.shootUp();
                shoot = true;
            }
        });

        /* Кнопка рестарта (поле игры) */
        document.getElementById('restart_button_id').onclick = () => {
            this.isPause = false;
            this.view.setStyleRestartHidden();
            this.model = new Model(this.view);
            this.objDoodle = this.model.getObjDoodle();
        }

        /* Кнопка выхода в меню (поле игры) */
        document.getElementById('menu_button_id').onclick = () => {
            this.model.setTimer();
            this.view.setStyleRestartHidden();
            this.view.setStyleGameFieldhidden();
            this.view = null;
            this.model = null;
            this.objDoodle = null;
            this.context.setVisibleMenu();
            window.onbeforeunload = null;
        }

        /* Кнопка паузы (поле игры) */
        document.getElementById('pause_button_id').onclick = () => {
            if (this.model === null) {
                return;
            }
            if (!this.isPause) {
                this.model.setTimer(true);
                this.view.changePauseName(true);
                this.isPause = true;
                this.model.stopAllPlatform(true);
            } else {
                this.model.setTimer(false);
                this.view.changePauseName(false);
                this.isPause = false;
                this.model.stopAllPlatform(false);
            }
        }
        /* Кнопка сохранения результата */
        document.getElementById('save_nickname_id').onclick = () => {
            const nick = this.view.getNickname();
            if (nick) {
                this.model.setNicknameinLocal(nick);
                this.model.setDataScore(nick);
            }
        }

        /* Кнопка отключения/включения звуков */
        document.getElementById('mute_unmute_sound').onclick = () => {
            if (this.model !== null) {
                this.model.setVolumeGame();
            };
        }

        /* Предупреждение о выходе при начатой игре */
        window.onbeforeunload = (e) =>{
            e.preventDefault();
            const message = 'Результат игры будет утерян, действительно хотите выйти?';
            e.returnValue = message;
            return message;
        }
    }
}

export { Controller }