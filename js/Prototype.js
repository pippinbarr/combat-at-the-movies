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
    this.player = new Tank(this, 100, 240 / SCALE, `tank`, true);
    this.add.existing(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy = new Tank(this, 200, 240 / SCALE, `tank`, true);
    this.add.existing(this.enemy);

    console.log(this.textures);
  },

  update: function() {
    this.handleInput();

    if (this.game.getFrame() % 12 === 0) {
      this.player.update();
    }

    let playerAlpha = this.textures.getPixel(0, 0, `tank`, this.player.frame.name).a;
    // console.log(playerAlpha);

    this.player.setTint(0xffffff);

    this.physics.overlap(this.player, this.enemy, (player, enemy) => {

      let playerFrame = player.frame.name;
      let playerTL = player.getTopLeft();

      let enemyFrame = enemy.frame.name;
      let enemyTL = enemy.getTopLeft();

      let dx = Math.round((playerTL.x - enemyTL.x) / SCALE);
      let dy = Math.round((playerTL.y - enemyTL.y) / SCALE);

      let hit = false;
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          let playerAlpha = this.textures.getPixel(x, y, `tank`, playerFrame).a;
          if (playerAlpha !== 255) continue;
          // We found an opaque pixel, so let's check the matching pixel on the enemy
          // if there is one
          let enemyX = x + dx;
          let enemyY = y + dy;

          if (enemyX < 0 || enemyX >= 8 || enemyY < 0 || enemyY >= 8) continue;
          let enemyAlpha = this.textures.getPixel(enemyX, enemyY, `tank`, enemyFrame).a;
          if (enemyAlpha === 255) {
            // It's a hit!
            hit = true;
            break;
          }
        }
        if (hit) break;
      }
      if (hit) {
        player.undo();
        enemy.undo();
      }
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