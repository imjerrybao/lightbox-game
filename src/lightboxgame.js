//    var update = function() {
//        switch (currentState) {
//            case STATES.alive:
//                game.physics.arcade.collide(player, bounds, collideBounds);
//                game.physics.arcade.collide(player, platforms, collidePlatforms);
//                control();
//                break;
//        }
//    };
//
// ----------------------

import BootState from './boot.js';
import MenuState from './menu.js';
import GameState from './game.js';
import DeadState from './dead.js';
import {
    WIDTH, HEIGHT,
    BOOT_STATE, MENU_STATE, GAME_STATE, DEAD_STATE
} from './config.js';

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'lightbox-game');

game.state.add(BOOT_STATE, BootState);
game.state.add(MENU_STATE, MenuState);
game.state.add(GAME_STATE, GameState);
game.state.add(DEAD_STATE, DeadState);

game.state.start(BOOT_STATE);
