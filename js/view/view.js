
class View{
    constructor(){
        this.canvas = document.getElementById('canvas_main');
        this.canvasDraw = this.canvas.getContext('2d');
        this.doodleImgRight = new Image();
        this.doodleImgRight.src = 'img/doodleRight.png'; 
        this.doodleImgLeft = new Image();
        this.doodleImgLeft.src = 'img/doodleLeft.png';
        this.stateImg = this.doodleImgLeft;
        this.platformImg = new Image();
        this.platformImg.src = 'img/platform_basic.png';
    }

    draw(dataDoodle, platforms){
        const {xStart, yStart, height, vx, vy, direction, moveRight, moveLeft} = dataDoodle;
        this.canvasDraw.clearRect(0, 0, 500, 800);

        for(let i = 0; i < platforms.length; i++){
            let platform = platforms[i].getCoords();
            if(platform[1] > 0){
                this.canvasDraw.drawImage(this.platformImg, platform[0], platform[1]);
                //this.canvasDraw.fillRect(platform[0], platform[1], 80, 10);  
            }
        }
        
            if(moveRight){
                this.stateImg = this.doodleImgRight;
            } 
            if(moveLeft){
               this.stateImg = this.doodleImgLeft;
            }
            this.canvasDraw.drawImage(this.stateImg, xStart, yStart);
        
        //this.canvasDraw.fillRect(xStart, yStart, height, height);

        
    }
}

export {View}