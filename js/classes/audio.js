class AudioDoodle{
    constructor(){
        this.audioObj = new Audio();
        this.audioObj.volume = 0.1;
    }

    playJump(){
        this.audioObj.src = 'audio/jump.wav';
        this.audioObj.play();
    }

    playTramp(){
        this.audioObj.src = 'audio/trampoline.mp3';
        this.audioObj.play();
    }

    playSpring(){
        this.audioObj.src = 'audio/feder.mp3';
        this.audioObj.play();
    }

    playShoot(){
        this.audioObj.src = 'audio/shoot.mp3';
        this.audioObj.play();
    }


}

export { AudioDoodle };