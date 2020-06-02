class Lavventura extends GameScene {
  constructor() {
    super({
      key: "lavventura"
    });
  }

  create() {
    super.create({
      bgColor: 0xffffff,
      tileColor: 0x0000cc,
      playerColor: 0xcccccc
    });
    this.player.x = this.game.canvas.width / 2;
    this.player.y = this.game.canvas.height / 2;
  }

  update(time, delta) {
    super.update(time, delta);
  }
}