import { BG_COLOR, MENU_STATE } from './config.js';


class Boot {
    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.stage.backgroundColor = BG_COLOR;

        const frames_number = 3, height = 141, width = 132;
        this.game.load.spritesheet(
            'startbtn', 'startbtn6.png', width, height, frames_number, 0, 0);

        this.game.load.image('starttext', 'starttext.png');
        this.game.load.image('deadtext', 'deadtext.png');

        this.game.load.audio('introsound', ['intro.mp3', 'intro.ogg']);
        this.game.load.audio('deathsound', ['explosion.mp3', 'explosion.wav']);
        this.game.load.audio('jumpsound', ['jump.mp3', 'jump.wav']);
        this.game.load.audio('powerupsound', ['powerup.mp3', 'powerup.wav']);
    }

    create() {
        this.game.state.start(MENU_STATE);
    }
};


export default Boot;
