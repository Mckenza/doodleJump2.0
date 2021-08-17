class BasicPlatfowm {
    constructor(coords) {
        this.coords = coords; /*массив координат X Y */
    }

    getCoords() {
        return this.coords;
    }

    setCoords(coords) {
        this.coords = coords;
    }
}

export { BasicPlatfowm };