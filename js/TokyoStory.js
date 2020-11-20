class TokyoStory extends GameScene {
  constructor() {
    super({
      key: "tokyostory"
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
    this.player.maxSpeed = 100;
    this.player.updateRate = 24;

    this.enemyScore.visible = false;

    this.title = "TOKYO STORY";
    this.explanation = "Take on the role of Shūkichi Hirayama (Chishū Ryū), the recently bereaved widower of Tomi (Chieko Higashiyama) as you face the final act of your life alone. Hold the Up Arrow to move forwards, the Left and Right Arrows to turn, and press the Space Bar to shoot. But where is there to go and what is the value of shooting without Tomi?";
    this.figureKey = 'fig-tokyo-story';
    this.caption = 'Shūkichi is alone'

    this.showInstructions(this.startGame.bind(this));
  }

  startGame() {

  }

  roundOver() {
    super.roundOver();
    this.gameOver();
  }

  update(time, delta) {
    super.update(time, delta);
  }

  shutdown() {
    clearTimeout(this.timeout);
    super.shutdown();
  }
}