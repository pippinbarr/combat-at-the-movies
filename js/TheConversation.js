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
    this.husband.setFrame(10);
    this.husband.moveAngle = 225;
    this.husband.turnChance = 0.1;

    this.tanks.add(this.husband);
    this.shootables.add(this.husband);

    this.wife = new AITank(this, 100, 240, `tank`, 0xC04141, this.husband);
    this.add.existing(this.wife);
    this.wife.x = this.game.canvas.width / 10;
    this.wife.y = this.game.canvas.height / 2 + 24;
    this.wife.setFrame(1);
    this.wife.moveAngle = 22.5;
    this.wife.turnChance = 0.1;

    this.husband.enemy = this.wife;

    this.husband.active = false;
    this.wife.active = false;

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

    this.showInstructions(this.startGame.bind(this));
  }

  startGame() {
    clearTimeout(this.roundTimer);
    this.stopWarning();

    this.husband.active = true;
    this.wife.active = true;

    this.events.addListener("DEATH", (tank) => {
      if (!this.playing) return;

      tank.visible = true;

      this.events.removeListener("DEATH");
      this.playing = false;
      this.postDeathTimer = setTimeout(this.gameOver.bind(this), this.POST_DEATH_DELAY);
    });
  }

  roundOver() {
    // super.roundOver();
    // this.gameOver();
    // No round over because otherwise it's super unlikely they'll get to kill one another... unless I have no walls at all?
    // Which would be fair enough, there are COMBAT levels like that?
  }

  gameOver() {
    super.gameOver();

    this.husband.visible = false;
    this.wife.visible = false;

    this.wife.active = false;
    this.husband.active = false;
  }

  update(time, delta) {
    this.husband.update();
    this.wife.update();

    if (!this.playing) return;

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

  cyclePalette() {
    super.cyclePalette();

    let outerRGB = this.randomRGBColor();
    let outerHex = this.rgbToHex(`0x`, outerRGB);
    this.outer.forEachTile((tile) => {
      tile.tint = outerHex;
    });
  }

  shutdown() {
    clearTimeout(this.postDeathTimer);
    super.shutdown();
  }
}