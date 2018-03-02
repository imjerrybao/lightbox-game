import {
    DEATHS_DROP_COLOR,
    DEATHS_DROP_SIZE,
    DEATHS_DROP_MAX_SPEED,
    DEATHS_DROP_MIN_SPEED,
    PLATFORM_SPEED
} from './config.js';


class DeathsDrop {
    constructor(game, x, y) {
        this.game = game;
          
        this.graphics = this.game.add.graphics(x, y)
            .clear()
            .beginFill(DEATHS_DROP_COLOR)
            .moveTo(0, 0)
            .lineTo(DEATHS_DROP_SIZE, 0)
            .lineTo(DEATHS_DROP_SIZE, DEATHS_DROP_SIZE)
            .lineTo(0, DEATHS_DROP_SIZE)
            .lineTo(0, 0)
            .endFill();

        this.game.physics.arcade.enable(this.graphics);

        this.graphics.body.immovable = true;

        const speed = this.game.rnd.between(
            DEATHS_DROP_MIN_SPEED,
            DEATHS_DROP_MAX_SPEED
        );
        if (y === 0) {
            this.graphics.body.velocity.y = speed;
        }
        else {
            this.graphics.body.velocity.y = -speed;
        }

        this.graphics.body.velocity.x = this.game.rnd.between(
            -PLATFORM_SPEED,
            PLATFORM_SPEED
        );
    }
};

export default DeathsDrop;
