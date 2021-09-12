import { ViewMenu } from '/js/view/viewMenu.js';
import { ModelMenu } from '/js/model/modelMenu.js';


class ControllerMenu {
    constructor(controllerGame) {
        this.self = this;
        this.controllerGame = controllerGame;
        this.controllerGameInit = null;
        this.viewMenu = new ViewMenu();
        this.modelMenu = new ModelMenu(this.viewMenu);
        this.buttons();
    }

    buttons() {
        addEventListener('click', (e) => {
            if (e.target.id === 'button_start_mainmenu_id') {
                this.viewMenu.setStyleHidden();
                this.controllerGameInit = null;
                this.controllerGameInit = new this.controllerGame(this.self);
            }
            if (e.target.id === 'button_records_mainmenu_id') {
                this.modelMenu.getDataScore();
                this.viewMenu.visibleScore();
            }
            if (e.target.id === 'button_settings_mainmenu_id') {
                console.log('просто платформа :)');
            }
            if (e.target.id === 'button_back_records_id') {
                this.viewMenu.unVisibleScore();
            }
        })
    }

    /* сделать активными кнопки главного меню */
    setVisibleMenu() {
        this.viewMenu.setActiveButtons();
    }
}

export { ControllerMenu };