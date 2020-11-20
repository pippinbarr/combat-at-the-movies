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
    this.explanation = "Anna (Lea Massari) has gone missing on the island of Lisca Bianca. Take on the role of Sandro (Gabriele Ferzetti) as you search for her fruitlessly on the rocky isle. Hold the Up Arrow to move forwards and the Left and Right Arrows to turn. Scour the area, but she's nowhere to be seen! Betrayal of Anna with Claudia not included.";
    this.figureKey = 'fig-lavventura';
    this.caption = 'Searching for Anna on Lisca Bianca'
    this.showInstructions(this.startGame.bind(this));
  }

  startGame() {
    this.roundTimer = setTimeout(() => {
      this.gameOver();
    }, this.ROUND_TIME);
  }

  update(time, delta) {
    super.update(time, delta);
    if (!this.playing) return;
  }

  shoot() {
    // No shooting
  }
}