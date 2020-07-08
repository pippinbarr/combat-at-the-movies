class BeauTravail extends GameScene {
  constructor() {
    super({
      key: "beautravail"
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

    // Create the mirror tank
    this.enemy = new Tank(this, width / 2, height / 2 - 100, `tank`, 0xC04141);
    this.enemy.setFlipY(true);
    this.enemy.depth = -100;
    this.add.existing(this.enemy);
  }

  update(time, delta) {
    super.update(time, delta);

    // Update the mirror
    this.enemy.setFrame(this.player.frame.name);
    this.enemy.x = this.player.x;
    let dy = this.game.canvas.height / 2 + 45 - this.player.y;
    this.enemy.y = this.game.canvas.height / 2 + dy;
  }

  shoot() {

  }
}