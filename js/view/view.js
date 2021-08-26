
class View {
    constructor() {
        this.canvas = document.getElementById('canvas_main');
        this.canvasDraw = this.canvas.getContext('2d');
        this.doodleImgRight = new Image();
        this.doodleImgRight.src = 'img/doodleRight.png';
        this.doodleImgLeft = new Image();
        this.doodleImgLeft.src = 'img/doodleLeft.png';
        this.stateImg = this.doodleImgLeft;
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
    }

    draw(dataDoodle, platforms, bullets) {
        const { xStart, yStart, height, vx, vy, direction, moveRight, moveLeft } = dataDoodle;
        this.canvasDraw.clearRect(0, 0, 500, 800);

        if (moveRight) {
            this.stateImg = this.doodleImgRight;
        }
        if (moveLeft) {
            this.stateImg = this.doodleImgLeft;
        }

        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i].getCoords();
            let typePlatfowm = platforms[i].getType();
            let extension = platforms[i].getAdd();
            if (platform[1] > 0) {
                if(typePlatfowm === 'basic'){
                    this.canvasDraw.drawImage(this.platformImg, platform[0], platform[1]);
                }
                if(typePlatfowm === 'upDown'){
                    this.canvasDraw.drawImage(this.upDownImg, platform[0], platform[1]);
                }
                if(typePlatfowm === 'rightLeft'){
                    this.canvasDraw.drawImage(this.leftRightImg, platform[0], platform[1]);
                }
                if(extension === 'tramp'){
                    this.canvasDraw.drawImage(this.trampImg, platform[0] + 10, platform[1] - 13);
                }
                if(extension === 'spring'){
                    this.canvasDraw.drawImage(this.springImg, platform[0] + 30, platform[1] - 10);
                }
                if(typePlatfowm === 'mob'){
                    let randomMob = platforms[i].getRandomMob();
                    if(randomMob < 50){
                        this.canvasDraw.drawImage(this.mobOne, platform[0], platform[1]);
                    }
                    if(randomMob > 50){
                        this.canvasDraw.drawImage(this.mobTwo, platform[0], platform[1]);
                    }
                }
                
            }
        }

        for(let i = 0; i < bullets.length; i++){
            let coodrs = bullets[i].getCoords();
            this.canvasDraw.beginPath();
            this.canvasDraw.arc(coodrs[0], coodrs[1], 3, (Math.PI/180) * 0, (Math.PI/180) * 360);
            this.canvasDraw.fill();
        }
        
        this.canvasDraw.drawImage(this.stateImg, xStart, yStart);
    }
}

export { View }