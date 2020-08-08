class Rashomon extends GameScene {
  constructor() {
    super({
      key: "rashomon"
    });
  }

  create() {
    let bgColor = 0xBEC86D;

    super.create({
      bgColor: bgColor,
      // tileColor: 0xF1B275,
      // playerColor: 0xC04141
    });
    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;

    this.enemy = new AITank(this, 100, 240, `tank`, 0x272AB0);
    this.add.existing(this.enemy);
    this.enemy.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.enemy.y = this.game.canvas.height / 2 + 24;
    this.enemy.setFrame(8);
    this.enemy.moveAngle = 180;

    this.tanks.add(this.enemy);
    this.shootables.add(this.enemy);

    let width = this.game.canvas.width;
    let height = this.game.canvas.height;

    let hDivider = this.add.sprite(width / 2, height / 2, 'tileset').setTint(0x000000).setScale(width / 16, 1);
    let vDivider = this.add.sprite(width / 2, height / 2, 'tileset').setTint(0x000000).setScale(1, height / 16);

    this.camera1 = this.cameras.add(0, 0, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(3 * width / 4, 3 * height / 4)
      .ignore(this.enemy)
      .ignore(hDivider)
      .ignore(vDivider)

    this.camera2 = this.cameras.add(width / 2 + 8, height / 2 + 8, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(1 * width / 4, 1 * height / 4)
      .ignore(this.walls)
      .ignore(hDivider)
      .ignore(vDivider)

    this.camera3 = this.cameras.add(0, height / 2 + 8, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(3 * width / 4, 1 * height / 4)
      .ignore(this.player)
      .ignore(hDivider)
      .ignore(vDivider)

    this.camera4 = this.cameras.add(width / 2 + 8, 0, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(1 * width / 4, 3 * height / 4)
      .ignore(hDivider)
      .ignore(vDivider);

    this.camera1.visible = false;
    this.camera2.visible = false;
    this.camera3.visible = false;
    this.camera4.visible = false;

    this.title = "RASHOMON";
    this.explanation = "...";
    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.camera1.visible = true;
    this.camera2.visible = true;
    this.camera3.visible = true;
    this.camera4.visible = true;

    this.events.addListener("DEATH", (tank) => {
      if (this.gameOverTimer) return;
      this.events.removeListener("DEATH");
      this.gameOverTimer = setTimeout(() => {
        this.camera1.visible = false;
        this.camera2.visible = false;
        this.camera3.visible = false;
        this.camera4.visible = false;
        this.showGameOver("WAIT... THAT'S NOT WHAT HAPPENED...?");
      }, 5000);
    });

  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.playing) return;

    this.enemy.update();

    if (!this.enemy.dead && Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y) < 400) {
      this.enemy.shoot(this.shootables);
    }
  }
}