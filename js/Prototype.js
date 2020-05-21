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

    this.physics.world.setBounds(0, 16 * 6, this.game.canvas.width, this.game.canvas.height - 16 * 6);

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
    });
    console.log(walls);

    this.player = new Tank(this, 100, 240, `tank`, 0xC04141);
    this.add.existing(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy = new Tank(this, 200, 220, `tank`, 0x272AB0);
    this.add.existing(this.enemy);

    this.tanks = this.add.group();
    this.tanks.add(this.player);
    this.tanks.add(this.enemy);

    this.physics.add.collider(this.tanks, walls);
    this.physics.add.collider(this.tanks, this.tanks);
    this.physics.add.overlap(this.tanks, walls, (a, b) => {
      // To resolve being shot into a wall
      if (b.index === 1) {
        a.body.x += a.body.velocity.x / 100;
        a.body.y += a.body.velocity.y / 100;
      }
    });


    this.shootables = this.add.group();
    this.shootables.add(this.player);
    this.shootables.add(this.enemy);
    this.shootables.add(walls)

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
  },

  update: function(time, delta) {
    this.handleInput();

    this.player.update();
    this.enemy.update();

    this.physics.world.wrap(this.tanks);
  },

  handleInput: function() {
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
      let bullet = this.player.shoot();
      if (!bullet) {
        return;
      }
      this.physics.add.overlap(bullet, this.shootables, (bullet, target) => {
        if (target === bullet.owner) {
          return;
        }
        if (target instanceof Tank) {
          target.die(bullet);
        }
        else if (target.index === 1) {
          bullet.owner.shooting = false;
          bullet.destroy();
        }
      });
    }
  }
});