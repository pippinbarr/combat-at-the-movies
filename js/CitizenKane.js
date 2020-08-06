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

    this.enemyScore.visible = false;

    this.showInstruction("REMEMBER", () => {
      setTimeout(() => {
        let bullet = this.player.shoot();
        this.player.die();
        setTimeout(() => {
          if (this.player.score === 0) {
            this.showGameOver("YOU DIDN'T REMEMBER ROSEBUD");
          }
          else {
            this.showGameOver("YOU REMEMBERED ROSEBUD");
          }
        }, 5000);
      }, 10000);
    });


  }

  update(time, delta) {
    super.update(time, delta);
    if (!this.playing) return;
  }

  handleInput() {
    if (this.player.waiting || this.player.dead) return;

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
    if (this.cursors.space.isDown && !this.player.shooting && !this.rosebudded) {
      this.sound.play('rosebud');
      this.rosebudded = true;

      this.player.score++;
      this.playerScore.text = this.player.score;
    }
  }
}