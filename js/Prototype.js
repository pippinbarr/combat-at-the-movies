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
    this.player = new Tank(this, 100, 240, `tank`, true);
    this.add.existing(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy = new Tank(this, 200, 240, `tank`, true);
    this.add.existing(this.enemy);
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