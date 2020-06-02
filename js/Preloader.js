let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader() {
    Phaser.Scene.call(this, {
      key: 'preloader'
    });
  },

  preload: function() {
    // Load the atlas
    this.load.multiatlas('atlas', 'assets/atlas/atlas.json', 'assets/atlas');

    this.load.image(`tileset`, `assets/tilesets/tileset.png`)
    this.load.tilemapTiledJSON(`citizenkane-map`, `assets/tilemaps/citizenkane.json`);
    this.load.tilemapTiledJSON(`lavventura-map`, `assets/tilemaps/lavventura.json`);

    this.load.spritesheet('tank', 'assets/spritesheets/tank-spritesheet.png', {
      frameWidth: 8,
      frameHeight: 8,
      endFrame: 15
    });

    this.load.audio('idle', 'assets/sounds/idle.wav');
    this.load.audio('drive', 'assets/sounds/drive.wav');
    this.load.audio('shoot', 'assets/sounds/shoot.wav');
    this.load.audio('die', 'assets/sounds/die.wav');
    this.load.audio('rosebud', 'assets/sounds/rosebud.wav');
  },

  create: function() {
    setTimeout(() => {
      console.log(`Starting ${START_SCENE}`);
      this.scene.start(START_SCENE);
    }, 100);
  },
});