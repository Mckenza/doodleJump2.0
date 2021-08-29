import { ViewMenu } from '/js/view/viewMenu.js';
import { ModelMenu } from '/js/model/modelMenu.js';


class ControllerMenu{
    constructor(controllerGame){
        this.controllerGame = controllerGame;
        this.viewMenu = new ViewMenu();
        this.modelMenu = new ModelMenu(this.viewMenu);
        this.buttons();
    }

    buttons(){
        addEventListener('click', (e)=>{
            if(e.target.id === 'button_start_mainmenu_id'){
                this.viewMenu.setStyleHidden();
                this.viewMenu.setActiveButtons();   /* сделать клавиши неактивными */
                new this.controllerGame();
            }
            if(e.target.id === 'button_records_mainmenu_id'){
                console.log('ff');
            }
            if(e.target.id === 'button_settings_mainmenu_id'){
                console.log('s');
            }
        })
    }
}

export { ControllerMenu };