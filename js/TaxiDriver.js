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
    this.mirrorTank = new Tank(this, width / 2, height / 2 - 100, `tank`, 0xC04141);
    this.mirrorTank.setFlipY(true);
    this.add.existing(this.mirrorTank);
    this.cameras.main.ignore(this.mirrorTank);

    // Create camera for mirror...
    let mirror = this.cameras.add(16 * 18, 16 * 8, 16 * 4, 16 * 6)
      .setBackgroundColor(0xBEC86D)
      .centerOn(width / 2, height / 2 - 100)
      .ignore(this.walls)

  }

  update(time, delta) {
    super.update(time, delta);
    this.mirrorTank.setFrame(this.player.frame.name);
    this.mirrorTank.x = this.player.x;
    let dy = this.game.canvas.height / 2 - this.player.y;
    this.mirrorTank.y = this.game.canvas.height / 2 + dy;
  }

  shoot() {

  }
}