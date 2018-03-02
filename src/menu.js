import { GAME_STATE } from './config.js';


class MenuState {
    constructor(game) {
        this.game = game;

        this.spaceKey = null;
    }
    
    preload() {}

    create() {
        this.game.add.button(335, 200, 'startbtn', this.startGame, null, 1, 0, 2);
        this.game.add.sprite(181, 370, 'starttext');

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.startGame()
        }
    }

    startGame() {
        this.game.state.start(GAME_STATE) ;
    }
};


export default MenuState;
