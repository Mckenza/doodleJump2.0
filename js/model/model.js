import { Doodle } from "/js/classes/doodle.js";

class Model{
    constructor(view){
        this.view = view;
        this.doodle = new Doodle();
        this.getAnimation();
    }

    getAnimation(){
        let {xStart, yStart, height, vx, vy} = this.doodle.getCountDoodle();  // данные о дудле
        if(yStart > 200){
            yStart -= 1;
        } 
        






        this.doodle.setCountDoodle({xStart, yStart, height, vx, vy});
        this.view.draw(this.doodle.getCountDoodle());
        this.animation = requestAnimationFrame(this.getAnimation.bind(this));
    }
}

export {Model};