class CitizenKane extends GameScene {
  constructor() {
    console.log("CitizenKane constructor.")
    super({
      key: "citizenkane"
    });
  }

  create() {
    super.create(0xFF0000, 0x00ff00, 0xFFFFFF);
    this.player.x = this.game.canvas.width / 2;
    this.player.y = 3 * this.game.canvas.height / 4;
  }

  update(time, delta) {
    super.update(time, delta);
  }

  handleInput() {
    if (this.player.waiting || this.player.dead) return;

    if (this.cursors.space.isDown) {
      let bullet = this.player.shoot();
      if (!bullet) {
        return;
      }

      this.player.die();

    }
  }
}