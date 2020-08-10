class TaxiDriver extends GameScene {
  constructor() {
    super({
      key: "taxidriver"
    });
  }

  create() {
    super.create({});

    let width = this.game.canvas.width;
    let height = this.game.canvas.height;

    this.player.x = width / 2;
    this.player.y = height / 2 + 100;
    this.player.moveAngle = 270;
    this.player.setFrame(12);
    this.player.updateFrame();

    // Create the mirror tank (shame it can't work through camera trickery)
    this.enemy = new Tank(this, width / 2, height / 2 - 100, `tank`, 0xC04141);
    this.enemy.setFlipY(true);
    this.add.existing(this.enemy);
    this.cameras.main.ignore(this.enemy);

    // Create camera for mirror...
    this.mirror = this.cameras.add(16 * 18, 16 * 8, 16 * 4, 16 * 6)
      .setBackgroundColor(0xBEC86D)
      .centerOn(width / 2, height / 2 - 100)
      .ignore(this.walls)
    this.mirror.visible = false;

    this.talkinSFX = this.sound.add('you-talkin-to-me');

    this.title = "TAXI DRIVER";
    this.explanation = "You are Travis Bickle (Robert De Niro), alone again in your depressing apartment as you ready yourself for the ultimate confrontation. Point your canon at yourself in the mirror and practice your tough-guy routine. Feel the aching need to shoot just to show you're alive. Use the Arrow Keys to drive your tank and press the Space Bar to deliver your line.";
    this.figureKey = 'fig-taxi-driver';
    this.caption = 'Fig. I – Looking into the mirror'

    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.mirror.visible = true;
    this.timeout = setTimeout(() => {
      this.mirror.visible = false;
      this.gameOver();
    }, 10000);
  }

  update(time, delta) {
    super.update(time, delta);
    if (!this.playing) return;

    this.enemy.setFrame(this.player.frame.name);
    this.enemy.x = this.player.x;
    let dy = this.game.canvas.height / 2 - this.player.y;
    this.enemy.y = this.game.canvas.height / 2 + dy;
  }

  shoot() {
    if (this.talkinSFX.isPlaying) return;
    this.talkinSFX.play();
    this.talkinSFX.once('complete', () => {
      this.player.score++;
      this.playerScore.text = this.player.score;
    });
  }
}