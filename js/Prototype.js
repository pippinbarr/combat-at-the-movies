const PLAYER_ROTATION_STEP = 90 / 4;
const PLAYER_SPEED = 5;

let Prototype = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Prototype() {
    Phaser.Scene.call(this, {
      key: 'prototype'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#BEC86D');

    const map = this.make.tilemap({
      key: "prototype-map"
    });
    const tileset = map.addTilesetImage("prototype", "prototype-tiles");
    const walls = map.createDynamicLayer("walls", tileset, 0, 0);
    walls.setCollisionByProperty({
      collides: true
    });
    walls.forEachTile((tile) => {
      tile.tint = 0xF1B275;
    })


    this.player = new Tank(this, 100, 240, `tank`, 0xC04141);
    this.add.existing(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy = new Tank(this, 200, 240, `tank`, 0x272AB0);
    this.add.existing(this.enemy);

    this.physics.add.collider(this.player, walls);

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
  },

  update: function(time, delta) {
    this.handleInput();

    // Only update the player every 12 frames (to get the rotation effect)
    this.player.update();
    this.enemy.update();

    this.physics.collide(this.player, this.enemy);
  },

  handleInput: function() {
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
  }
});