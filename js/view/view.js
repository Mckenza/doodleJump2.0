
class View{
    constructor(){
        this.canvas = document.getElementById('canvas_main');
        this.canvasDraw = this.canvas.getContext('2d');
    }

    draw(dataDoodle, platforms){
        const {xStart, yStart, height, vx, vy} = dataDoodle
        this.canvasDraw.clearRect(0, 0, 500, 800);
        this.canvasDraw.fillRect(xStart, yStart, height, height);

        for(let i = 0; i < platforms.length; i++){
            let platform = platforms[i].getCoords();
            if(platform[1] > 0){
                this.canvasDraw.fillRect(platform[0], platform[1], 80, 10);
                
            }
        }
    }
}

export {View}