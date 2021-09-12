
class View {
    constructor() {
        this.gameDiv = document.getElementById('field_game_id');
        this.canvas = document.getElementById('canvas_main');
        this.buttonRestart = document.getElementById('restart_button_id');
        this.buttonMainMenu = document.getElementById('menu_button_id');
        this.scoreSpan = document.getElementById('score_span_id');
        this.pauseButton = document.querySelector('.pause_button');
        this.inputNamenick = document.getElementById('nickname_input_id');
        this.buttonSendNickname = document.getElementById('save_nickname_id');
        this.scoreSpan.textContent = 0;
        this.canvasDraw = this.canvas.getContext('2d');
        this.doodleImgRight = new Image();
        this.doodleImgRight.src = 'img/doodleRight.png';
        this.doodleImgLeft = new Image();
        this.doodleImgLeft.src = 'img/doodleLeft.png';
        this.stateImg = this.doodleImgLeft;
        this.currentStare = this.doodleImgLeft;
        this.platformImg = new Image();
        this.platformImg.src = 'img/platform_basic.png';
        this.leftRightImg = new Image();
        this.leftRightImg.src = 'img/leftRigth.png';
        this.upDownImg = new Image();
        this.upDownImg.src = 'img/upDown.png';
        this.trampImg = new Image();
        this.trampImg.src = 'img/tramp.png';
        this.springImg = new Image();
        this.springImg.src = 'img/spring.png';
        this.mobOne = new Image();
        this.mobOne.src = 'img/mob_one.png';
        this.mobTwo = new Image();
        this.mobTwo.src = 'img/mob_two.png';
        this.doodleShoot = new Image();
        this.doodleShoot.src = 'img/doodlesh.png';
        this.timerSh = null;
        this.setStyleGameField();
    }

    /* Меняем надпись на кнопки паузы */
    changePauseName(state) {
        if (state) {
            this.pauseButton.querySelector('.icons_pause_play').classList.add('pause');
        } else {
            this.pauseButton.querySelector('.icons_pause_play').classList.remove('pause');
        }
    }

    /* показываем поле для игры и т.д. */
    setStyleGameField() {
        this.gameDiv.classList.add('viewGame');
    }

    /* скрываем поле игры */
    setStyleGameFieldhidden() {
        this.gameDiv.classList.remove('viewGame');
    }

    /* скрыть "Готовы?" */
    setStyleReady() {
        document.querySelector('.ready_div').classList.add('hidden');
    }

    /* показать "Готовы?" */
    setStyleReadyNoHidden() {
        document.querySelector('.ready_div').classList.remove('hidden');
    }

    /* показать div с кнопками при проигрыше и сделать их активными */
    setStyleRestart() {
        this.buttonSendNickname.classList.remove('dis');
        this.inputNamenick.removeAttribute('disabled');
        this.buttonSendNickname.removeAttribute('disabled');
        this.buttonRestart.removeAttribute('disabled');
        this.buttonMainMenu.removeAttribute('disabled');
        document.querySelector('.restart_div').classList.add('nohidden');
    }

    /* убрать div с кнопками при рестарте и сделать их неактивными */
    setStyleRestartHidden() {
        this.inputNamenick.setAttribute('disabled', true);
        this.buttonSendNickname.setAttribute('disabled', true);
        this.buttonRestart.setAttribute('disabled', true);
        this.buttonMainMenu.setAttribute('disabled', true);
        document.querySelector('.restart_div').classList.remove('nohidden');
    }

    /* ввод ника и валидация */
    getNickname(message) {
        if (message === 'error') {
            this.inputNamenick.value = 'Ошибка при сохранении, попробуйте снова';
            document.querySelector('.nickname_save').classList.add('voidnick');
            setTimeout(() => {
                document.querySelector('.nickname_save').classList.remove('voidnick');
                this.inputNamenick.value = '';
            }, 2000);
            return;
        }
        if (message === 'success') {
            document.querySelector('.nickname_save').classList.add('success');
            setTimeout(() => {
                document.querySelector('.nickname_save').classList.remove('success');
            }, 1000);
            return;
        }
        if (!this.inputNamenick.value) {
            document.querySelector('.nickname_save').classList.add('voidnick');
            setTimeout(() => {
                document.querySelector('.nickname_save').classList.remove('voidnick');
            }, 1000);
            return '';
        }
        return this.inputNamenick.value
    }

    /* Вызов функции из модели и установки ника в поле для ввода ника */
    setNickname(nickname) {
        this.inputNamenick.value = nickname;
    }

    /* делать кнопку неактивной при успешном сохранении ника */
    setDisabledSavebutton(value){
        if(value === 'noSave'){
            this.buttonSendNickname.removeAttribute('disabled');
            this.buttonSendNickname.classList.remove('dis');
            return;
        }
        if(value === 'save'){
            this.buttonSendNickname.setAttribute('disabled', 'true');
            this.buttonSendNickname.classList.add('dis');
            return;
        }         
    }

    /* Поменять иконку звука */
    changeIconSound(isMute){
        if(isMute){
            document.querySelector('#icons_sound_off_on_id').classList.add('mute');
        } else {
            document.querySelector('#icons_sound_off_on_id').classList.remove('mute');
        }

    }

    shootDown() {
        this.stateImg = this.doodleShoot;
        this.timerSh = setTimeout(() => {
            this.stateImg = this.currentStare;
        }, 500);
    }

    shootUp() {
        this.stateImg = this.currentStare;
        clearTimeout(this.timerSh);
        this.timerSh = null;
    }

    draw(dataDoodle, platforms, bullets, score) {
        const { xStart, yStart, height, vx, vy, direction, moveRight, moveLeft } = dataDoodle;
        this.canvasDraw.clearRect(0, 0, 500, 800);

        this.scoreSpan.textContent = score;

        if (moveRight && this.stateImg !== this.doodleShoot) {
            this.stateImg = this.doodleImgRight;
            this.currentStare = this.stateImg;
        }
        if (moveLeft && this.stateImg !== this.doodleShoot) {
            this.stateImg = this.doodleImgLeft;
            this.currentStare = this.stateImg;
        }

        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i].getCoords();
            let typePlatfowm = platforms[i].getType();
            let extension = platforms[i].getAdd();
            if (platform[1] > 0) {
                if (typePlatfowm === 'basic') {
                    this.canvasDraw.drawImage(this.platformImg, platform[0], platform[1]);
                }
                if (typePlatfowm === 'upDown') {
                    this.canvasDraw.drawImage(this.upDownImg, platform[0], platform[1]);
                }
                if (typePlatfowm === 'rightLeft') {
                    this.canvasDraw.drawImage(this.leftRightImg, platform[0], platform[1]);
                }
                if (extension === 'tramp') {
                    this.canvasDraw.drawImage(this.trampImg, platform[0] + 10, platform[1] - 13);
                }
                if (extension === 'spring') {
                    this.canvasDraw.drawImage(this.springImg, platform[0] + 30, platform[1] - 10);
                }
                if (typePlatfowm === 'mob') {
                    let randomMob = platforms[i].getRandomMob();
                    if (randomMob < 50) {
                        this.canvasDraw.drawImage(this.mobOne, platform[0], platform[1]);
                    }
                    if (randomMob > 50) {
                        this.canvasDraw.drawImage(this.mobTwo, platform[0], platform[1]);
                    }
                }

            }
        }

        for (let i = 0; i < bullets.length; i++) {
            let coodrs = bullets[i].getCoords();
            this.canvasDraw.beginPath();
            this.canvasDraw.arc(coodrs[0], coodrs[1], 3, (Math.PI / 180) * 0, (Math.PI / 180) * 360);
            this.canvasDraw.fill();
        }

        this.canvasDraw.drawImage(this.stateImg, xStart, yStart);
    }
}

export { View }