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

  }

  update(time, delta) {
    if (this.black.visible) return;

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

    if (this.cursors.space.isDown) {
      this.shoot();
    }
  }

  shoot() {
    this.player.shoot(this.shootables);
  }

  showInstruction(text, callback) {
    // What to do when the game ends: display the text and then go back to the menu
    this.black.visible = true;
    this.interstitialText.visible = true;
    this.interstitialText.text = text;
    setTimeout(() => {
      this.black.visible = false;
      this.interstitialText.visible = false;
      callback();
    }, 2000);
  }

  showGameOver(text) {
    // What to do when the game ends: display the text and then go back to the menu
    this.black.visible = true;
    this.interstitialText.visible = true;
    this.interstitialText.text = text;
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 2000);
  }
}