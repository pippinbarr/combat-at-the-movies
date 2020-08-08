class TheConversation extends GameScene {
  constructor() {
    super({
      key: "theconversation"
    });
  }

  create() {
    super.create({});

    let width = this.game.canvas.width;
    let height = this.game.canvas.height;

    this.outer = this.map.createDynamicLayer("outer", this.tileset, 0, 0);
    this.outer.forEachTile((tile) => {
      tile.tint = 0xF1B275;
    });

    this.player.x = this.game.canvas.width / 10;
    this.player.y = 10;

    this.enemy1 = new AITank(this, 100, 240, `tank`, 0x272AB0);
    this.add.existing(this.enemy1);
    this.enemy1.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.enemy1.y = this.game.canvas.height / 2 + 24;
    this.enemy1.setFrame(8);
    this.enemy1.moveAngle = 180;

    this.tanks.add(this.enemy1);
    this.shootables.add(this.enemy1);

    this.enemy2 = new AITank(this, 100, 240, `tank`, 0xC04141, this.enemy1);
    this.add.existing(this.enemy2);
    this.enemy2.x = this.game.canvas.width / 10;
    this.enemy2.y = this.game.canvas.height / 2 + 24;

    this.enemy1.enemy = this.enemy2;

    this.tanks.add(this.enemy2);
    this.shootables.add(this.enemy2);

    this.walls.visible = false;
    this.enemy1.visible = false;
    this.enemy2.visible = false;

    this.title = "THE CONVERSATION";
    this.explanation = "...";
    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.events.addListener("DEATH", (tank) => {
      if (this.gameOverTimer) return;
      this.events.removeListener("DEATH");
      this.gameOverTimer = setTimeout(() => {
        this.gameOverTimer = undefined;
        this.showGameOver("MURDER!");
      }, 5000);
    });
  }

  update(time, delta) {
    if (!this.playing) return;

    super.update(time, delta);
    this.enemy1.update();
    this.enemy2.update();

    if (Phaser.Math.Distance.Between(this.enemy1.x, this.enemy1.y, this.enemy2.x, this.enemy2.y) < 400) {
      let bullet1 = this.enemy1.shoot(this.shootables);
      let bullet2 = this.enemy2.shoot(this.shootables);

      if (bullet1) bullet1.visible = false;
      if (bullet2) bullet2.visible = false;
    }
  }

  shoot() {

  }
}