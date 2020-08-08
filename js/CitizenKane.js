class CitizenKane extends GameScene {
  constructor() {
    super({
      key: "citizenkane"
    });
  }

  create() {
    super.create({
      // bgColor: 0xFF0000,
      // tileColor: 0x00ff00,
      // playerColor: 0xFFFFFF
    });
    this.player.x = this.game.canvas.width / 2 - 5;
    this.player.y = 3 * this.game.canvas.height / 4 - 28;

    this.rosebudSFX = this.sound.add('rosebud');

    this.enemyScore.visible = false;

    this.title = "CITIZEN KANE";
    this.explanation = "CITIZEN KANE is a game of memories. Play Charles Foster Kane as he lies dying in Xanadu. Use the Left and Right Arrow Keys to toss and turn in your bed, filled with regret. Press the Space Bar to give voice to your one most precious memory. But better remember it quickly! You're going to die!";
    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    setTimeout(() => {
      let bullet = this.player.shoot();
      this.player.die();
      this.rosebudSFX.pause();
      setTimeout(() => {
        if (this.player.score === 0) {
          this.showGameOver("YOU DIDN'T REMEMBER ROSEBUD");
        }
        else {
          this.showGameOver("YOU REMEMBERED ROSEBUD");
        }
      }, 5000);
    }, 10000);
  }

  update(time, delta) {
    super.update(time, delta);
    if (!this.playing) return;
  }

  handleInput() {
    if (this.player.waiting || this.player.dead || !this.playing) return;

    if (this.cursors.left.isDown) {
      this.player.rotationDirection = -1;
    }
    else if (this.cursors.right.isDown) {
      this.player.rotationDirection = 1;
    }
    else {
      this.player.rotationDirection = 0;
    }

    // ROSEBUD
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.rosebudding) {
      this.rosebudSFX.play();
      this.rosebudding = true;
      this.rosebudSFX.once('complete', () => {
        this.rosebudding = false
      });;
      this.player.score++;
      this.playerScore.text = this.player.score;
    }
  }
}