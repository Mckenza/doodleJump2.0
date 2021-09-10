class ViewMenu {
    constructor() {
        this.buttonStart = document.getElementById('button_start_mainmenu_id');
        this.buttonRecords = document.getElementById('button_records_mainmenu_id');
        this.buttonSetting = document.getElementById('button_settings_mainmenu_id');
        this.scoreDiv = document.getElementById('score_window_id');
        this.scoreTable = document.querySelector('.table_records');
        this.wait = document.querySelector('.table_record_wait');
        this.menu = document.getElementById('main_menu_id');
        this.canvasPre = document.getElementById('pre_doodle_canvas_id');
        this.canvasDraw = this.canvasPre.getContext('2d');
        this.doodleImgRight = new Image();
        this.doodleImgRight.src = 'img/mainMenuDoodle.png';
        this.timerWait = null;
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
        document.querySelector('.restart_div').classList.remove('nohidden');
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

    /* показать окно рекордов */
    visibleScore(){
        this.scoreDiv.classList.remove('unvisible');
        this.setAnimationWait();
    }

    /* скрыть окно рекордов */
    unVisibleScore(){
        this.scoreDiv.classList.add('unvisible');
    }

    /* сообщение об ошибке при чтении данных с сервера */
    viewReadData(){
        this.scoreTable.innerHTML = '';
        this.scoreTable.textContent = `Ошибка при загрузке данных,
        попробуйте еще раз или подождите чуть-чуть`;
    }

    createTableScore(data){
        this.scoreTable.innerHTML = '';
        const list = document.createElement('ol');
        list.setAttribute('class', 'list_for_score');
        let counter = 1;
        data.forEach(element => {
            const li = document.createElement('li');
            li.setAttribute('class', 'one_item_li');
            const div = document.createElement('div');
            div.setAttribute('class', 'one_item_from_list');
            const divCounter = document.createElement('div');
            divCounter.setAttribute('class', 'one_item_number');
            divCounter.textContent = `${counter++}.`;
            const divNick = document.createElement('div');
            divNick.setAttribute('class', 'one_item_nick');
            const divScore = document.createElement('div');
            divScore.setAttribute('class', 'one_item_score');
            divNick.textContent = element['nick'];
            divScore.textContent = element['score'];
            div.appendChild(divCounter);
            div.appendChild(divNick);
            div.appendChild(divScore);
            li.appendChild(div);
            list.appendChild(li);    
        });
        this.scoreTable.appendChild(list);
    }

    /* Анимирование картинки "ожидания загрузки данных с сервера" */
    setAnimationWait(){
        let angle = 0;
        this.timerWait = setInterval(() => {
            this.wait.setAttribute('style', `transform: rotate(${angle++}deg)`)
            if(angle === 360){
                angle = 0;
            }
        }, 5);
    }

    deteleTimerWait(){
        clearInterval(this.timerWait);
    }

}

export { ViewMenu };