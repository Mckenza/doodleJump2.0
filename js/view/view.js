
class View{
    constructor(){
        this.canvas = document.getElementById('canvas_main');
        this.canvasDraw = this.canvas.getContext('2d');
    }

    draw(dataDoodle){
        const {xStart, yStart, height, vx, vy} = dataDoodle
        this.canvasDraw.clearRect(0, 0, 500, 800);
        this.canvasDraw.fillRect(xStart, yStart, height, height);
    }
}

export {View}