import {
    DEATHS_BORDER_COLOR,
    DEATHS_BORDER_HEIGHT,
    WIDTH
} from './config.js';


class DeathsBorder {
    constructor(game, x, y) {
        this.game = game;
          
        this.graphics = this.game.add.graphics(x, y)
            .clear()
            .beginFill(DEATHS_BORDER_COLOR)
            .moveTo(0, 0)
            .lineTo(WIDTH, 0)
            .lineTo(WIDTH, DEATHS_BORDER_HEIGHT)
            .lineTo(0, DEATHS_BORDER_HEIGHT)
            .lineTo(0, 0)
            .endFill();

        this.game.physics.arcade.enable(this.graphics);
        this.graphics.body.immovable = true;
    }
};

export default DeathsBorder;
