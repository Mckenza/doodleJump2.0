class BasicPlatfowm {
    constructor(coords) {
        this.coords = coords; /*массив координат X Y */
        this.paramsPlatform = {
            height: 10,
            width: 80,
        }
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
}

export { BasicPlatfowm };