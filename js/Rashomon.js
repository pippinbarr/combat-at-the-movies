class Rashomon extends GameScene {
  constructor() {
    super({
      key: "rashomon"
    });
  }

  create() {
    let bgColor = 0xffffff;

    super.create({
      bgColor: 0xffffff,
      tileColor: 0x0000cc,
      playerColor: 0xcccccc
    });
    this.player.x = this.game.canvas.width / 2;
    this.player.y = this.game.canvas.height / 2;

    let width = this.game.canvas.width;
    let height = this.game.canvas.height;
    this.cameras.main.setSize(width / 2, height / 2)
      .centerOn(width / 2, height / 2)
      .ignore(this.player)

    let camera2 = this.cameras.add(width / 2, 0, width / 2, height / 2)
      .setBackgroundColor(bgColor)
      .centerOn(width / 4, height / 2)
      .ignore(this.walls)

    let camera3 = this.cameras.add(0, height / 2, width / 2, height / 2)
      .setBackgroundColor(bgColor)
      .centerOn(width / 2, height / 4)

    let camera4 = this.cameras.add(width / 2, height / 2, width / 2, height / 2)
      .setBackgroundColor(bgColor)
      .centerOn(width / 4, height / 4)

  }

  update(time, delta) {
    super.update(time, delta);
  }
}