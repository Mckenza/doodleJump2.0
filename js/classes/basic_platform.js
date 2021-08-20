class BasicPlatform {
    constructor(coords) {
        this.coords = coords; /*массив координат X Y */
        this.type = 'basic';   /*Тип платформы */
        this.add = 'none';      /* добавочное к платформе*/
        this.paramsPlatform = {
            height: 10,
            width: 80,
        }
        this.randomAdd();
    }

    getCoords() {
        return this.coords;
    }

    setCoords(coords) {
        this.coords = coords;
    }

    getParamsPlatform(){
        return this.paramsPlatform;
    }
    getType(){
        return this.type;
    }

    randomAdd(){
        let chance = Math.floor(Math.random() * 100);
        if(chance < 2){
            this.add = 'tramp';
        }
        if(chance > 2 && chance < 5){
            this.add = 'spring';
        }
    }

    getAdd(){
        return this.add;
    }
}

export { BasicPlatform };