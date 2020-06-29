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
    this.player.x = this.game.canvas.width / 2;
    this.player.y = 3 * this.game.canvas.height / 4;
  }

  update(time, delta) {
    super.update(time, delta);
  }

  handleInput() {
    if (this.player.waiting || this.player.dead) return;

    if (this.cursors.space.isDown && !this.player.shooting) {
      this.sound.play('rosebud');

      setTimeout(() => {
        let bullet = this.player.shoot();
        this.player.die();
      }, 3000);

    }
  }
}