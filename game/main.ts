var game;

/**
 * --------------------------------------------------------------------------
 * States
 * --------------------------------------------------------------------------
 *
 * Load in the menu, game and debug states.
 *
 */

import Boot = require('./states/boot');
game.state.add('Boot', Boot.Boot);

import Game = require('./states/game');
var addGameStates = () => {

}

import Menu = require('./states/menu');
var addMenuStates = () => {
    game.state.add('Menu.Start', Menu.Start);
}

import Debug = require('./states/debug');
var addDebugStates = () => {
    game.state.add('Debug.Default', Debug.Default);
}


/**
 * --------------------------------------------------------------------------
 * Game
 * --------------------------------------------------------------------------
 *
 * Listen to the window onload event and create the global phaser game
 * object. Attach game states and start into the boot state.
 *
 */

window.onload = () => {
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    addGameStates();
    addMenuStates();
    addDebugStates();

    game.state.start('Boot', true, false, 'Debug.Default');
}