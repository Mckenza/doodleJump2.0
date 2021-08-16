import {View} from '/js/view/view.js';
import {Model} from '/js/model/model.js'

class Controller{
    constructor(){
        this.view = new View();
        this.model = new Model(this.view);
    }
}

export {Controller}