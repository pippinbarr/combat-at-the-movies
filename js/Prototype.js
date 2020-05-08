const PLAYER_ROTATION_STEP = 90 / 4;
const PLAYER_SPEED = 2;

let Prototype = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Prototype() {
    Phaser.Scene.call(this, {
      key: 'prototype'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#000');
    this.player = this.physics.add.sprite(10, 10, `atlas`, `tank.png`);
    this.player.speed = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function() {
    this.handleInput();

    // this.physics.velocityFromRotation(this.player.rotation, this.player.speed, this.player.body.velocity);

    if (this.game.getFrame() % 12 === 0) {
      this.player.x += this.player.speed * Math.cos(Phaser.Math.DegToRad(this.player.angle));
      this.player.y += this.player.speed * Math.sin(Phaser.Math.DegToRad(this.player.angle));
      this.player.angle += PLAYER_ROTATION_STEP * this.player.rotationDirection;
    }
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
      this.player.speed = PLAYER_SPEED;
    }
    else {
      this.player.speed = 0;
    }
  }
});