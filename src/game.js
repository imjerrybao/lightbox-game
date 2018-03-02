import Box from './box.js';
import Platform from './platform.js';
import DeathsBorder from './deathsborder.js';
import DeathsDrop from './deathsdrop.js';
import {
    BOX_FEEDING,
    BOX_SIZE,
    DEAD_STATE,
    DEATHS_BORDER_HEIGHT,
    DEATHS_DROP_MAX_INTERVAL,
    DEATHS_DROP_MIN_INTERVAL,
    DEATHS_DROP_SIZE,
    HEIGHT,
    PLATFORM_CREATING_MAX_INTERVAL,
    PLATFORM_CREATING_MIN_INTERVAL,
    PLATFORM_FEEDING,
    PLATFORM_HEIGHT,
    PLATFORM_MAX_WIDTH,
    PLATFORM_MIN_WIDTH,
    WIDTH,
    WORLD_HEIGHT,
    WORLD_WIDTH
} from './config.js';


class Play {
    constructor(game) {
        this.game = game;

        this.STATES = {
            start: 'start',
            alive: 'alive',
            dead: 'dead',
        };
    }

    create() {
        this.feeding = false;

        this.jumpsound = this.game.add.audio('jumpsound');
        this.deathsound = this.game.add.audio('deathsound');
        this.introsound = this.game.add.audio('introsound');
        this.powerupsound = this.game.add.audio('powerupsound');

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        this.cursorKeys = this.game.input.keyboard.createCursorKeys();

        const style = {font: "12px Arial", fill: "#8A1C1E", align: "left"};
        let i = 1;
        while (i * 100 < WORLD_HEIGHT) {
            let y = i * 100;
            let text = this.game.add.text(20, y, `-${y}-`, style);
            text.anchor.set(0.5);
            i++;
        }

        this.box = new Box(this.game, 0, 200, this.jumpsound);
        this.game.camera.follow(this.box.graphics);

        this.platforms = this.game.add.group();

        this.drops = this.game.add.group();

        // first platfoms
        let firstPlatforms = [
            {
                x: 100,
                y: 320,
                width: PLATFORM_MAX_WIDTH,
                height: PLATFORM_HEIGHT
            },
            {
                x: 350,
                y: 460,
                width: PLATFORM_MAX_WIDTH,
                height: PLATFORM_HEIGHT
            },
        ];

        for (let {x, y, width, height} of firstPlatforms) {
            let platform = new Platform(this.game, x, y, width, height);
            this.platforms.add(platform.graphics);
        }

        this.createRandomPlatform();

        this.bounds = this.game.add.group();
        this.bounds.add((new DeathsBorder(this.game, 0, 0)).graphics);
        this.bounds.add((new DeathsBorder(this.game, 0, WORLD_HEIGHT - DEATHS_BORDER_HEIGHT)).graphics);


        let whenCreateDrop = this.game.rnd.between(
            DEATHS_DROP_MIN_INTERVAL,
            DEATHS_DROP_MAX_INTERVAL
        );
        this.game.time.events.add(whenCreateDrop, this.createRandomDeathsDrop, this);

        this.introsound.loopFull();

        this.score = 0;
        this.scoreText = this.game.add.text(
            400, 40, `${this.score}`,
            {font: "24px Arial", fill: "#8A1C1E", align: "center"}
        );
        this.scoreText.anchor.set(0.5);
        this.scoreText.fixedToCamera = true;
        this.game.time.events.loop(100, () => {
            if (this.box.is_alive) {
                this.score += 25;
                this.scoreText.setText(`${this.score}`);
            }
        }, this);

        this.currentState = this.STATES.start;
    }
    
    update() {
        switch (this.currentState) {
            case this.STATES.start:
                this.currentState = this.STATES.alive;
                break;

            case this.STATES.alive:
                this.feeding = false;

                this.game.physics.arcade.collide(
                    this.box.graphics,
                    this.platforms,
                    this.collidePlatform,
                    null,
                    this
                );

                if (this.feeding && !this.powerupsound.isPlaying) {
                    this.powerupsound.loopFull();
                }
                else if (!this.feeding && this.powerupsound.isPlaying) {
                    this.powerupsound.stop();
                }

                this.game.physics.arcade.collide(
                    this.box.graphics, this.bounds, this.killBox, null, this);

                this.game.physics.arcade.collide(
                    this.box.graphics, this.drops, this.killBox, null, this);

                this.box.update(this.cursorKeys);

                let toRemove = [];
                for (let platform of this.platforms.children) {
                    if ((platform.position.x + PLATFORM_MAX_WIDTH) < 0) {
                        toRemove.push(platform);
                    }
                }
                for (let platform of toRemove) {
                    platform.kill();
                }

                toRemove = [];
                for (let drop of this.drops.children) {
                    if (drop.position.y < 0 || drop.position.y > WORLD_HEIGHT) {
                        toRemove.push(drop);
                    }
                }
                for (let drop of toRemove) {
                    drop.kill();
                }

                if (! this.box.is_alive) {
                    if (this.powerupsound.isPlaying) {
                        this.powerupsound.stop();
                    }

                    this.deathsound.play();

                    this.currentState = this.STATES.dead;

                    this.introsound.stop();
                    this.game.time.events.add(1300, () => {
                        this.game.state.start(DEAD_STATE);
                    }, this)
                }
                break;

            case this.STATES.dead:
                break;
        }
    }

    createRandomDeathsDrop() {
        let x = this.game.rnd.between(0, WORLD_WIDTH - DEATHS_DROP_SIZE);

        let y = 0;
        if (this.game.rnd.between(0, 10) < 5) {
            y = WORLD_HEIGHT;
        }

        let drop = new DeathsDrop(this.game, x, y);
        this.drops.add(drop.graphics);

        let whenCreateDrop = this.game.rnd.between(
            DEATHS_DROP_MIN_INTERVAL,
            DEATHS_DROP_MAX_INTERVAL
        );
        this.game.time.events.add(whenCreateDrop, this.createRandomDeathsDrop, this);
    }

    createRandomPlatform() {
        let x = WORLD_WIDTH;

        let y = this.game.rnd.between(
            DEATHS_BORDER_HEIGHT + BOX_SIZE + 10,
            WORLD_HEIGHT - DEATHS_BORDER_HEIGHT
        );

        let width = this.game.rnd.between(
            PLATFORM_MIN_WIDTH,
            PLATFORM_MAX_WIDTH
        );

        let height = PLATFORM_HEIGHT;

        let platform = new Platform(this.game, x, y, width, height);
        this.platforms.add(platform.graphics);

        let nextTime = this.game.rnd.between(
            PLATFORM_CREATING_MIN_INTERVAL,
            PLATFORM_CREATING_MAX_INTERVAL
        );
        this.game.time.events.add(nextTime, this.createRandomPlatform, this);
    }

    collidePlatform(player, platform) {
        this.feeding = true;

        platform.scale.y -= PLATFORM_FEEDING;

        player.scale.x += BOX_FEEDING;
        player.scale.y += BOX_FEEDING;

        if (platform.scale.y < 0.05) {
            platform.kill();
        }
    }

    killBox(player, bound) {
        this.box.kill();
    }
};

export default Play;
