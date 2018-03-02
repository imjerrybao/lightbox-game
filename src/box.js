import {
    BOX_GRAVITY,
    BOX_SIZE,
    JUMP_COST,
    JUMP_SPEED_UP,
    MIN_BOX_SIZE,
    MIN_DECELERATION,
    PLAYER_COLOR,
    PLATFORM_SPEED,
    SLOW_DOWN_THRESHOLD,
    X_SPEED,
} from './config.js';


class Box {
    constructor(game, x, y, jumpsound) {
        this.is_alive = true;

        this.game = game;

        this.jumpsound = jumpsound;
          
        this.graphics = this.game.add.graphics(x, y)
            .clear()
            .beginFill(PLAYER_COLOR)
            .moveTo(0, 0)
            .lineTo(BOX_SIZE, 0)
            .lineTo(BOX_SIZE, BOX_SIZE)
            .lineTo(0, BOX_SIZE)
            .lineTo(0, 0)
            .endFill();


        this.game.physics.arcade.enable(this.graphics);

        this.graphics.body.bounce.set(0);
        this.graphics.body.gravity.y = BOX_GRAVITY;
        this.graphics.body.velocity.x = X_SPEED;
        this.graphics.body.collideWorldBounds = true;
    }

    update(cursorKeys) {
        if (this.is_alive) {
            if (cursorKeys.left.isDown) {
                this.graphics.body.velocity.x = -X_SPEED;
            }
            if (cursorKeys.right.isDown) {
                this.graphics.body.velocity.x = X_SPEED;
            }
            if (cursorKeys.up.isDown) {
                if (this.graphics.body.velocity.y > SLOW_DOWN_THRESHOLD) {
                    this.graphics.body.velocity.y = JUMP_SPEED_UP;
                    this.graphics.scale.x -= JUMP_COST;
                    this.graphics.scale.y -= JUMP_COST;

                    if (this.graphics.body.width < MIN_BOX_SIZE || this.graphics.body.height < MIN_BOX_SIZE ) {
                        this.kill();
                    }
                    else {
                        this.jumpsound.play();
                    }
                }
            }

            if (this.graphics.body.velocity.y !== 0) {
                this.graphics.body.velocity.y += Math.max(
                    Math.abs(this.graphics.body.velocity.y) * 0.1,
                    MIN_DECELERATION
                );
            }
        }
    }

    kill() {
        this.is_alive = false;

        if (this.graphics.body.width < MIN_BOX_SIZE || this.graphics.body.height < MIN_BOX_SIZE ) {
            this.graphics.kill();
        }
        else {
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 1000;

            this.graphics.body.checkCollision.down = false;
            this.graphics.body.checkCollision.left = false;
            this.graphics.body.checkCollision.right = false;
            this.graphics.body.checkCollision.up = false;

            this.graphics.body.collideWorldBounds = false;
        }
    }
};

export default Box;
