class AuHasardBalthazar extends GameScene {
  constructor() {
    super({
      key: "auhasardbalthazar"
    });
  }

  create() {
    super.create({
      bgColor: 0xBEC86D,
      tileColor: 0xF1B275,
      playerColor: 0xC04141
    });
    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;

    this.balthazar = this.physics.add.sprite(0, 0, 'balthazar')
      .setPosition(this.game.canvas.width - this.game.canvas.width / 10, this.game.canvas.height / 2 + 24)
      // .setPosition(this.game.canvas.width / 10, this.game.canvas.height / 2 + 24)
      .setScale(SCALE)
      .setFlip(-1, 0)
      .setTint(0x6e4926);
  }

  update(time, delta) {
    super.update(time, delta);
  }

  shoot() {
    let bullet = this.player.shoot();
    if (!bullet) {
      return;
    }
    this.physics.add.overlap(bullet, this.walls, (bullet, target) => {
      if (target.index === 1) {
        bullet.owner.shooting = false;
        bullet.destroy();
      }
    });
    this.physics.add.overlap(bullet, this.balthazar, (bullet, target) => {
      bullet.destroy();
      let tween = this.tweens.add({
        targets: this.balthazar,
        angle: "+=360",
        ease: "Linear",
        duration: 100,
        repeat: -1
      })
    });


  }
}