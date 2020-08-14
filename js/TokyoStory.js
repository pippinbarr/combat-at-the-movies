class TokyoStory extends GameScene {
  constructor() {
    super({
      key: "tokyostory"
    });
  }

  create() {
    super.create({
      // bgColor: 0xBEC86D,
      // tileColor: 0xF1B275,
      // playerColor: 0xC04141
    });
    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;
    this.player.maxSpeed = 100;
    this.player.updateRate = 24;

    this.enemyScore.destroy();

    this.title = "TOKYO STORY";
    this.explanation = "???";
    this.figureKey = 'fig-tokyo-story';
    this.caption = '???'

    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.timeout = setTimeout(() => {
      this.player.active = false;
      clearTimeout(this.timeout);
      this.gameOverTimer = setTimeout(() => {
        this.gameOver();
      }, 5000);
    }, 20000);
  }

  update(time, delta) {
    super.update(time, delta);
  }
}