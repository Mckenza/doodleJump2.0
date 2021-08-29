class ViewMenu {
    constructor() {
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

    setStyleHidden(){
        this.menu.classList.add('leaveView');
    }

    getMenuDiv(){
        return this.menu;
    }

    setActiveButtons(){
        const buttonStart = document.getElementById('button_start_mainmenu_id');
        const buttonRecords = document.getElementById('button_records_mainmenu_id');
        const buttonSetting = document.getElementById('button_settings_mainmenu_id');
        buttonStart.setAttribute('disabled', true);
        buttonRecords.setAttribute('disabled', true);
        buttonSetting.setAttribute('disabled', true);
    }
}

export { ViewMenu };