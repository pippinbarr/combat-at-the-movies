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
    this.player = this.physics.add.sprite(100, 240, `tank`).setScale(5);
    this.player.setFrame(0);
    this.player.speed = 0;
    this.player.moveAngle = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function() {
    this.handleInput();

    // this.physics.velocityFromRotation(this.player.rotation, this.player.speed, this.player.body.velocity);

    if (this.game.getFrame() % 12 === 0) {
      this.player.x += this.player.speed * Math.cos(Phaser.Math.DegToRad(this.player.moveAngle));
      this.player.y += this.player.speed * Math.sin(Phaser.Math.DegToRad(this.player.moveAngle));
      if (this.player.rotationDirection != 0) {
        this.player.moveAngle += this.player.rotationDirection * PLAYER_ROTATION_STEP;
        let frame = this.player.frame.name;
        frame += this.player.rotationDirection;
        if (frame < 0) {
          frame = 3;
          this.player.angle -= 90;
        }
        else if (frame > 3) {
          frame = 0;
          this.player.angle += 90;
        }
        this.player.setFrame(frame);
      }
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