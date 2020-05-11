let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader() {
    Phaser.Scene.call(this, {
      key: 'preloader'
    });
  },

  preload: function() {
    // Load the atlas
    // this.load.multiatlas('atlas', 'assets/atlas/atlas.json', 'assets/atlas');

    this.load.spritesheet('tank', 'assets/spritesheets/tank-spritesheet.png', {
      frameWidth: 8,
      frameHeight: 8,
      endFrame: 3
    });
  },

  create: function() {
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 100);
  },
});