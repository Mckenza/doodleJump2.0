class AudioDoodle{
    constructor(){
        this.jump = new Audio('audio/jump.wav');
        this.tramp = new Audio('audio/trampoline.mp3');
        this.spring = new Audio('audio/feder.mp3');
        this.shoot = new Audio('audio/shoot.mp3');
    }

    playJump(){
        this.jump.play();
    }

    playTramp(){
        this.tramp.play();
    }

    playSpring(){
        this.spring.play();
    }

    playShoot(){
        this.shoot.play();
    }


}

export { AudioDoodle };