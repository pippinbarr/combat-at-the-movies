class TheGodfather extends GameScene {
  constructor() {
    super({
      key: "thegodfather"
    });
  }

  create() {
    super.create({
      // bgColor: 0xBEC86D,
      // tileColor: 0xF1B275,
      // playerColor: 0xC04141
    });
    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;
  }

  update(time, delta) {
    super.update(time, delta);
  }

  shoot() {

  }
}