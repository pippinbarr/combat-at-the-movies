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
      tileColor: 0xF1B275,
      playerColor: 0xC04141
    });
    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;

    this.enemy = new Tank(this, 100, 240, `tank`, 0x272AB0);
    this.add.existing(this.enemy);
    this.enemy.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.enemy.y = this.game.canvas.height / 2 + 24;
    this.enemy.setFrame(8);
    this.enemy.moveAngle = 180;


    let width = this.game.canvas.width;
    let height = this.game.canvas.height;

    let hDivider = this.add.sprite(width / 2, height / 2, 'tileset').setTint(0x000000).setScale(width / 16, 1);
    let vDivider = this.add.sprite(width / 2, height / 2, 'tileset').setTint(0x000000).setScale(1, height / 16);

    let camera1 = this.cameras.add(0, 0, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(3 * width / 4, 3 * height / 4)
      .ignore(this.enemy)
      .ignore(hDivider)
      .ignore(vDivider)

    let camera2 = this.cameras.add(width / 2 + 8, height / 2 + 8, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(1 * width / 4, 1 * height / 4)
      .ignore(this.walls)
      .ignore(hDivider)
      .ignore(vDivider)

    let camera3 = this.cameras.add(0, height / 2 + 8, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(3 * width / 4, 1 * height / 4)
      .ignore(this.player)
      .ignore(hDivider)
      .ignore(vDivider)

    let camera4 = this.cameras.add(width / 2 + 8, 0, width / 2 - 8, height / 2 - 8)
      .setBackgroundColor(bgColor)
      .centerOn(1 * width / 4, 3 * height / 4)
      .ignore(hDivider)
      .ignore(vDivider)


  }

  update(time, delta) {
    super.update(time, delta);
  }
}