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
    this.cameras.main.setBackgroundColor('#000');
    this.player = new Tank(this, 100 / SCALE, 240 / SCALE, `tank`, true);
    this.add.existing(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy = new Tank(this, 200 / SCALE, 240 / SCALE, `tank`, true);
    this.add.existing(this.enemy);
  },

  update: function() {
    this.handleInput();

    // this.physics.velocityFromRotation(this.player.rotation, this.player.speed, this.player.body.velocity);

    if (this.game.getFrame() % 12 === 0) {
      this.player.update();
    }

    this.physics.collide(this.player, this.enemy, (a, b) => {
      a.undo();
    });
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