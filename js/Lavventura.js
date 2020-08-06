class Lavventura extends GameScene {
  constructor() {
    super({
      key: "lavventura"
    });
  }

  create() {
    super.create({
      // bgColor: 0xffffff,
      // tileColor: 0x0000cc,
      // playerColor: 0xcccccc
    });
    this.player.x = this.game.canvas.width / 2;
    this.player.y = this.game.canvas.height / 2;

    this.showInstruction("FIND ANNA", () => {
      setTimeout(() => {
        this.showGameOver("YOU DIDN'T FIND ANNA");
      }, 10000);
    });


  }

  update(time, delta) {
    super.update(time, delta);
    if (!this.playing) return;
  }
}