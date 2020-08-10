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

    this.title = "L'AVVENTURA";
    this.explanation = "Anna (Lea Massari) has gone missing on the island of Lisca Bianca. Take on the role of Sandro (Gabriele Ferzetti) as you search for her fruitlessly on the rocky isle. Use the Arrow Keys to scour the area, but she's nowhere to be seen! Betrayal of Anna with Claudia not included.";
    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    setTimeout(() => {
      this.showGameOver("YOU DIDN'T FIND ANNA");
    }, 10000);
  }

  update(time, delta) {
    super.update(time, delta);
    if (!this.playing) return;
  }
}