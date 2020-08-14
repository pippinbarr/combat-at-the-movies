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

    // this.player.x = this.game.canvas.width / 10;
    // this.player.y = 10;
    this.player.destroy();

    this.husband = new AITank(this, 100, 240, `tank`, 0x272AB0);
    this.add.existing(this.husband);
    this.husband.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.husband.y = this.game.canvas.height / 2 + 24;
    this.husband.setFrame(8);
    this.husband.moveAngle = 180;

    this.tanks.add(this.husband);
    this.shootables.add(this.husband);

    this.wife = new AITank(this, 100, 240, `tank`, 0xC04141, this.husband);
    this.add.existing(this.wife);
    this.wife.x = this.game.canvas.width / 10;
    this.wife.y = this.game.canvas.height / 2 + 24;

    this.husband.enemy = this.wife;

    this.tanks.add(this.wife);
    this.shootables.add(this.wife);

    this.walls.visible = false;
    this.husband.visible = false;
    this.wife.visible = false;

    this.playerScore.visible = false;
    this.enemyScore.visible = false;

    this.title = "THE CONVERSATION";
    this.explanation = "Become Harry Caul (Gene Hackman) as you listen through the hotel wall to an argument between husband tank and wife tank. Use your Ears to try to figure out what is happening and, when it turns deadly, who killed who.";
    this.figureKey = 'fig-the-conversation';
    this.caption = 'Listening through the wall'

    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.events.addListener("DEATH", (tank) => {
      if (this.gameOverTimer) return;
      this.playing = false;
      this.events.removeListener("DEATH");
      this.gameOverTimer = setTimeout(() => {
        this.gameOverTimer = undefined;
        this.gameOver();
      }, 5000);
    });
  }

  update(time, delta) {
    if (!this.playing) return;
    if (this.black.visible) return;

    this.husband.update();
    this.wife.update();

    if (Phaser.Math.Distance.Between(this.husband.x, this.husband.y, this.wife.x, this.wife.y) < 400) {
      let bullet1 = this.husband.shoot(this.shootables);
      let bullet2 = this.wife.shoot(this.shootables);

      if (bullet1) bullet1.visible = false;
      if (bullet2) bullet2.visible = false;
    }
  }

  handleInput() {

  }

  shoot() {

  }
}