import Game = require('./game');

export class Default extends Phaser.State {
    create() {
        new Phaser.Text(this.game, 50, 50, "Phaser Typescript Skeleton", {});
    }
}