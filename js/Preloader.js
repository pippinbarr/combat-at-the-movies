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

    this.load.image(`prototype-tiles`, `assets/tilesets/prototype.png`)
    this.load.tilemapTiledJSON(`prototype-map`, `assets/tilemaps/prototype.json`);

    this.load.spritesheet('tank', 'assets/spritesheets/tank-spritesheet.png', {
      frameWidth: 8,
      frameHeight: 8,
      endFrame: 15
    });
  },

  create: function() {
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 100);
  },
});