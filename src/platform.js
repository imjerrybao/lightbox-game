import { PLAYER_COLOR, PLATFORM_SPEED } from './config.js';


class Platform {
    constructor(game, x, y, width, height) {
        this.game = game;
          
        this.graphics = this.game.add.graphics(x, y)
            .clear()
            .beginFill(PLAYER_COLOR)
            .moveTo(0, 0)
            .lineTo(width, 0)
            .lineTo(width, height)
            .lineTo(0, height)
            .lineTo(0, 0)
            .endFill();

        this.game.physics.arcade.enable(this.graphics);

        this.graphics.body.immovable = true;
        this.graphics.body.velocity.x = PLATFORM_SPEED;

        // or this?
        //this.graphics.body.gravity.y = 0;
        //this.graphics.body.gravity.x = -100;

        this.graphics.body.checkCollision.down = false;
        this.graphics.body.checkCollision.left = false;
        this.graphics.body.checkCollision.right = false;

    }
};

export default Platform;
