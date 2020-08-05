class BeauTravail extends GameScene {
  constructor() {
    super({
      key: "beautravail"
    });
  }

  create() {
    super.create({});

    this.walls.visible = true;

    this.walls2 = this.map.createDynamicLayer("walls2", this.tileset, 0, 0);
    this.walls2.setCollisionByProperty({
      collides: true
    });
    this.walls2.forEachTile((tile) => {
      tile.tint = 0xF1B275;
    });
    this.walls2.visible = false;


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

    this.music = this.sound.add('rhythm-of-the-night');
    this.music.loop = true;

    this.showInstruction("DANCE", () => {
      this.music.play();
    });

    setTimeout(() => {
      this.showGameOver("THE CREDITS ROLL");
    }, 30000);
  }

  update(time, delta) {
    super.update(time, delta);

    // Update the mirror
    this.enemy.setFrame(this.player.frame.name);
    this.enemy.x = this.player.x;
    let dy = this.game.canvas.height / 2 + 45 - this.player.y;
    this.enemy.y = this.game.canvas.height / 2 + dy;

    if (this.game.getFrame() % 30 === 0) {
      this.walls.visible = !this.walls.visible;
      this.walls2.visible = !this.walls2.visible;
    }

  }

  handleInput() {
    super.handleInput();

    // Add reversing just this once for expressivity
    if (this.cursors.down.isDown) {
      this.player.speed = -this.player.maxSpeed;
    }
  }

  shoot() {

  }
}