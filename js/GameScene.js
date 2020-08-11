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

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    this.black = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'pixel.png')
      .setTint(0x000000)
      .setScale(this.game.canvas.width, this.game.canvas.height);
    this.black.visible = false;
    this.black.depth = 10000;

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
  }

  update(time, delta) {
    if (this.black.visible) return;
    if (!this.playing) return;

    this.handleInput();

    this.player.update();

    // this.physics.world.wrap(this.tanks);
  }

  handleInput() {
    if (this.player.waiting || this.player.dead) return;

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

  // showInstruction(text, callback) {
  //   // What to do when the game ends: display the text and then go back to the menu
  //   this.black.visible = true;
  //   this.interstitialText.visible = true;
  //   this.interstitialText.text = text;
  //   setTimeout(() => {
  //     this.black.visible = false;
  //     this.interstitialText.visible = false;
  //     this.playing = true;
  //     this.sound.setMute(false);
  //     if (callback) callback();
  //   }, 2000);
  // }

  // showGameOver(text) {
  //   // What to do when the game ends: display the text and then go back to the menu
  //   this.black.visible = true;
  //   this.interstitialText.visible = true;
  //   this.interstitialText.text = text;
  //   this.sound.removeAll();
  //   setTimeout(() => {
  //     this.scene.start(START_SCENE);
  //   }, 2000);
  // }

  gameOver() {
    this.playing = false;
    setTimeout(() => {
      this.shutdown();
    }, 3000);
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
      setTimeout(() => {
        this.playing = true;
      }, 100);
      callback();
    });
  }

  displayPage() {
    this.background = this.add.sprite(0, 0, 'atlas', 'pixel')
      .setTint(0x000000)
      .setScale(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0, 0);

    this.page = this.add.sprite(this.pageInset, 0, 'atlas', 'pixel')
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
    this.figure = this.add.sprite(this.game.canvas.width / 2, 0, this.figureKey).setOrigin(0.5, 0).setScale(0.6);
    this.figure.y = this.explanationText.y + this.explanationText.height + 20;
    this.captionText = this.add.text(this.pageInset + this.pageMargin, this.figure.y + this.figure.height * 0.6 + 10, this.caption, this.standardBoldStyle);
  }

  shutdown() {
    this.game.sound.stopAll();
    this.scene.start('menu');
  }
}