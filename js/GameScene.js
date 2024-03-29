const PLAYER_ROTATION_STEP = 90 / 4;
const PLAYER_SPEED = 5;

class GameScene extends Phaser.Scene {

  constructor(config) {
    super(config);
    this.key = config.key;
  }

  create({
    bgColor = 0xBEC86D,
    tileColor = 0xF1B275,
    playerColor = 0xC04141
  }) {

    this.POST_DEATH_DELAY = 5000; // How long to spin before triggering palette cycle
    this.ROUND_TIME = 30000; // Should match Combat?
    this.ROUND_WARNING_TIME = this.ROUND_TIME - 10000;

    this.cameras.main.setBackgroundColor(bgColor);

    this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.map = this.make.tilemap({
      key: `${this.key}-map`
    });
    this.tileset = this.map.addTilesetImage(`${this.key}-tileset`, `tileset`);
    this.walls = this.map.createDynamicLayer("walls", this.tileset, 0, 0);
    this.walls.setCollisionByProperty({
      collides: true
    });
    this.walls.forEachTile((tile) => {
      tile.tint = tileColor;
    });

    this.player = new Tank(this, 100, 240, `tank`, playerColor);
    this.add.existing(this.player);
    this.player.setCollideWorldBounds(true)

    this.cursors = this.input.keyboard.createCursorKeys();

    this.tanks = this.add.group();
    this.tanks.add(this.player);

    this.physics.add.collider(this.tanks, this.walls, (tank, wall) => {
      tank.hit(wall);
    });
    this.physics.add.collider(this.tanks, this.tanks, (tank1, tank2) => {
      tank1.hit(tank2);
      tank2.hit(tank1);
    });
    this.physics.add.overlap(this.tanks, this.walls, (tank, wall) => {
      // To resolve being shot into a wall
      if (wall.index === 1) {
        tank.body.x += tank.body.velocity.x / 100;
        tank.body.y += tank.body.velocity.y / 100;
      }
    });

    this.shootables = this.add.group();
    this.shootables.add(this.player);
    this.shootables.add(this.walls);

    this.playerScore = this.add.text(this.game.canvas.width / 5, 0, "0", {
      fontFamily: 'Square',
      fontSize: "48px",
      color: "#C04141"
    }).setOrigin(1, 0);

    this.enemyScore = this.add.text(this.game.canvas.width - this.game.canvas.width / 5, 0, "0", {
      fontFamily: 'Square',
      fontSize: "48px",
      color: "#272AB0"
    });

    this.interstitialText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, "TEXT", {
      fontFamily: "Square",
      fontSize: "24px",
      color: "#C04141"
    });
    this.interstitialText.setOrigin(0.5, 0.5);
    this.interstitialText.visible = false;
    this.interstitialText.depth = 10001;

    this.sound.setMute(true);

    this.input.keyboard.on('keydown-' + 'ESC', () => {
      this.shutdown();
    });

    this.playing = false;
    this.gameIsOver = false;
  }

  update(time, delta) {
    if (this.gameIsOver) return;

    this.handleInput();

    this.player.update();
  }

  handleInput() {
    if (!this.playing || this.gameIsOver || this.player.waiting || this.player.dead) return;

    if (this.cursors.left.isDown) {
      this.player.rotationDirection = -1;
    }
    else if (this.cursors.right.isDown) {
      this.player.rotationDirection = 1;
    }
    else {
      this.player.rotationDirection = 0;
    }

    if (this.cursors.up.isDown) {
      this.player.speed = this.player.maxSpeed;
    }
    else {
      this.player.speed = 0;
    }

    if (Phaser.Input.Keyboard.DownDuration(this.cursors.space)) {
      this.shoot();
    }
  }

  shoot() {
    this.player.shoot(this.shootables);
  }

  roundOver() {
    this.gameOver();
  }

  gameOver() {
    if (!this.gameIsOver) {
      this.gameIsOver = true;

      this.stopWarning();

      this.game.sound.stopAll();
      this.cycleInterval = setInterval(() => {
        this.cyclePalette();
      }, 1000);

      this.shutdownTimer = setTimeout(() => {
        this.shutdown();
      }, 10000);
    }
  }

  stopWarning() {
    clearInterval(this.roundWarningInterval);
    clearTimeout(this.roundWarningTimer);
    this.playerScore.alpha = 1;
    this.enemyScore.alpha = 1;
  }

  showInstructions(callback) {
    // this.cameras.main.setBackgroundColor(0xcccccc);
    this.instructions = this.add.group();

    this.pageInset = 100;
    this.pageWidth = this.game.canvas.width - 2 * this.pageInset;
    this.pageMargin = 32;
    this.textWidth = this.pageWidth - 2 * this.pageMargin;

    this.titleStyle = {
      font: "bold 24px sans-serif",
      color: "#000",
      padding: {
        top: 5,
        bottom: 5,
      },
      align: "center",
      fixedWidth: this.textWidth,
      backgroundColor: "#eb4034",
    };
    this.standardBoldStyle = {
      font: "bold 12px sans-serif",
      color: "#000",
      padding: {
        top: 0,
        bottom: 0,
      },
      align: "left",
      fixedWidth: this.textWidth,
      wordWrap: {
        width: this.textWidth
      }
    };
    this.standardStyle = {
      font: "12px sans-serif",
      color: "#000",
      padding: {
        top: 0,
        bottom: 0,
      },
      align: "left",
      fixedWidth: this.textWidth,
      wordWrap: {
        width: this.textWidth
      }
    };

    this.displayPage();
    this.displayTitle();
    this.displayInstruction();
    this.displayFigure();

    // Switch from instructions to play
    this.cursors.space.once('down', () => {
      this.page.destroy();
      this.titleText.destroy();
      this.instructionText.destroy();
      this.explanationText.destroy();
      this.continueText.destroy();
      this.background.destroy();
      this.figure.destroy();
      this.captionText.destroy();
      this.sound.setMute(false);

      this.startTimout = setTimeout(() => {
        this.playing = true;
        console.log("Set playing true")
      }, 100);

      this.roundWarningTimer = setTimeout(this.roundWarning.bind(this), this.ROUND_WARNING_TIME);

      this.roundTimer = setTimeout(this.roundOver.bind(this), this.ROUND_TIME);

      callback();
    });
  }

  roundWarning() {
    this.roundWarningInterval = setInterval(this.flashScores.bind(this), 500);
  }

  flashScores() {
    this.playerScore.alpha = 1 - this.playerScore.alpha;
    this.enemyScore.alpha = 1 - this.enemyScore.alpha;
  }

  roundOver() {
    this.playing = false;
    this.stopWarning();
  }

  displayPage() {
    this.background = this.add.sprite(0, 0, 'atlas', 'pixel.png')
      .setTint(0x000000)
      .setScale(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0, 0);

    this.page = this.add.sprite(this.pageInset, 0, 'atlas', 'pixel.png')
      .setTint(0xfafaf4)
      .setScale(this.pageWidth, this.game.canvas.height)
      .setOrigin(0, 0);
  }

  displayTitle() {
    this.titleText = this.add.text(this.pageInset + this.pageMargin, this.pageMargin, this.title, this.titleStyle);
  }

  displayInstruction() {
    this.instructionText = this.add.text(this.pageInset + this.pageMargin, this.titleText.y + this.titleText.height + 10, "Use the Arrow Keys and Space Bar with this Game Program.", this.standardBoldStyle);
    this.explanationText = this.add.text(this.pageInset + this.pageMargin, this.instructionText.y + 20, this.explanation, this.standardStyle);
    this.continueText = this.add.text(this.pageInset + this.pageMargin, 0, "Press the Space Bar to continue. Press Escape during play to return to the menu.", this.standardBoldStyle);
    this.continueText.y = this.game.canvas.height - this.continueText.height - 20;
  }

  displayFigure() {

    this.figure = this.add.sprite(this.game.canvas.width / 2, 0, 'atlas', `figures/${this.figureKey}.jpg`)
      .setOrigin(0.5, 0)
      .setScale(0.6);
    this.figure.y = this.explanationText.y + this.explanationText.height + 20;
    this.captionText = this.add.text(this.pageInset + this.pageMargin, this.figure.y + this.figure.height * 0.6 + 10, `Fig. ${this.figureLabel} – ${this.caption}`, this.standardBoldStyle);
  }

  cyclePalette() {
    let playerScoreRGB = this.randomRGBColor();
    let playerScoreHex = this.rgbToHex(`#`, playerScoreRGB);
    this.playerScore.setColor(playerScoreHex);

    let enemyScoreRGB = this.randomRGBColor();
    let enemyScoreHex = this.rgbToHex(`#`, enemyScoreRGB);
    this.enemyScore.setColor(enemyScoreHex);

    let playerRGB = this.randomRGBColor();
    let playerHex = this.rgbToHex(`0x`, playerRGB);
    this.player.setTint(playerHex);

    let bgColor = this.randomRGBColor();
    this.cameras.main.setBackgroundColor(bgColor);

    let wallRGB = this.randomRGBColor();
    let wallHex = this.rgbToHex(`0x`, wallRGB);
    this.walls.forEachTile((tile) => {
      tile.tint = wallHex;
    });
  }

  randomRGBColor() {
    let h = Math.floor(Math.random() * 16) / 16;
    let s = Math.random() < 1 / 16 ? 0 : 0.75;
    let v = Math.floor(Math.random() * 8) / 8;
    let color = Phaser.Display.Color.HSVToRGB(h, s, v);
    return color;
  }

  rgbToHex(prefix, rgb) {
    let r = Phaser.Display.Color.ComponentToHex(rgb.r);
    let g = Phaser.Display.Color.ComponentToHex(rgb.g);
    let b = Phaser.Display.Color.ComponentToHex(rgb.b);
    return `${prefix}${r}${g}${b}`;
  }

  shutdown() {
    this.game.sound.stopAll();
    clearInterval(this.cycleInterval);
    clearTimeout(this.shutdownTimer);
    clearTimeout(this.startTimout);
    clearTimeout(this.roundTimer);
    this.stopWarning();

    this.scene.start('menu');
  }
}