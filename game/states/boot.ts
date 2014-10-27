export class Boot extends Phaser.State {
    public nextState: string;

    init(nextState: string) {
        this.nextState = nextState;
    }

    create() {
        console.log('boo');
        this.input.maxPointers = 1;
        this.input.addPointer();

        this.stage.backgroundColor = "#000000";

        this.game.state.start(this.nextState);
    }
}