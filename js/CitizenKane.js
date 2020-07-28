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

    this.showInstruction("REMEMBER");

    this.memoryTimer = setTimeout(() => {
      this.showGameOver("YOU DIDN'T REMEMBER ROSEBUD");
    }, 10000);
  }

  update(time, delta) {
    super.update(time, delta);
  }

  handleInput() {
    if (this.player.waiting || this.player.dead) return;

    if (this.cursors.space.isDown && !this.player.shooting && !this.rosebudded) {
      this.sound.play('rosebud');
      this.rosebudded = true;
      clearTimeout(this.memoryTimer);

      setTimeout(() => {
        let bullet = this.player.shoot();
        this.player.die();
        this.player.score++;
        this.playerScore.text = this.player.score;

        setTimeout(() => {
          this.showGameOver("YOU REMEMBERED ROSEBUD");
        }, 4000);

      }, 3000);

    }
  }
}