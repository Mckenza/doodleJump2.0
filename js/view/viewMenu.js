class ViewMenu {
    constructor() {
        this.buttonStart = document.getElementById('button_start_mainmenu_id');
        this.buttonRecords = document.getElementById('button_records_mainmenu_id');
        this.buttonSetting = document.getElementById('button_settings_mainmenu_id');
        this.menu = document.getElementById('main_menu_id');
        this.canvasPre = document.getElementById('pre_doodle_canvas_id');
        this.canvasDraw = this.canvasPre.getContext('2d');
        this.doodleImgRight = new Image();
        this.doodleImgRight.src = 'img/mainMenuDoodle.png';
    }

    draw(dataDoodle) {
        const { xStart, yStart } = dataDoodle;
        this.canvasDraw.clearRect(0, 0, 200, 400);
        this.canvasDraw.drawImage(this.doodleImgRight, xStart, yStart);
    }

    /* скрыть главное меню (при переходе на поле игры) */
    setStyleHidden(){
        this.menu.classList.add('leaveView');
        this.buttonStart.setAttribute('disabled', true);
        this.buttonRecords.setAttribute('disabled', true);
        this.buttonSetting.setAttribute('disabled', true);
    }

    getMenuDiv(){
        return this.menu;
    }

    /* Показать главное меню (из поля игры) */
    setActiveButtons(){
        this.menu.classList.remove('leaveView');
        this.buttonStart.removeAttribute('disabled');
        this.buttonRecords.removeAttribute('disabled');
        this.buttonSetting.removeAttribute('disabled');
    }
}

export { ViewMenu };