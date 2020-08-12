class SomeLikeItHot extends GameScene {
  constructor() {
    super({
      key: "somelikeithot"
    });
  }

  create() {
    let pink = 0xff6666;

    super.create({
      playerColor: pink
    });

    let width = this.game.canvas.width;
    let height = this.game.canvas.height;

    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;

    this.enemy = new AITank(this, 100, 240, `tank`, pink);
    this.add.existing(this.enemy);
    this.enemy.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.enemy.y = this.game.canvas.height / 2 + 24;
    this.enemy.setFrame(8);
    this.enemy.moveAngle = 180;

    this.tanks.add(this.enemy);
    this.shootables.add(this.enemy);

    this.title = "SOME LIKE IT HOT";
    this.explanation = "Experience combat in its purest form, one tank versus the other in a battle to the death. Hold the Up Arrow to move forwards, the Left and Right Arrows to turn, and press the Space Bar to shoot. But this time both tanks are pink! Hilarity ensues as two old foes must navigate a new relationship... as ladies!";
    this.figureKey = 'fig-some-like-it-hot';
    this.caption = 'Fig. C – Hijinks'
    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.events.addListener("DEATH", (tank) => {
      if (this.gameOverTimer) return;
      this.playing = false;
      this.events.removeListener("DEATH");
      this.gameOverTimer = setTimeout(() => {
        this.gameOverTimer = undefined;
        this.gameOver();
      }, 5000);
    });
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.playing) return;

    this.enemy.update();

    if (!this.enemy.dead && Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y) < 400) {
      this.enemy.shoot(this.shootables);
    }
  }

}