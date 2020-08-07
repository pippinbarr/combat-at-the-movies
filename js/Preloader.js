let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader() {
    Phaser.Scene.call(this, {
      key: 'preloader'
    });
  },

  preload: function() {
    this.load.atlas('atlas', 'assets/atlas/atlas.png', 'assets/atlas/atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    this.load.image(`tileset`, `assets/tilesets/tileset.png`);

    this.load.image(`citizen-kane-figure`, `assets/figures/citizen-kane-figure.png`);


    this.load.tilemapTiledJSON(`citizenkane-map`, `assets/tilemaps/citizenkane.json`);
    this.load.tilemapTiledJSON(`lavventura-map`, `assets/tilemaps/lavventura.json`);
    this.load.tilemapTiledJSON(`rashomon-map`, `assets/tilemaps/rashomon.json`);
    this.load.tilemapTiledJSON(`auhasardbalthazar-map`, `assets/tilemaps/auhasardbalthazar.json`);
    this.load.tilemapTiledJSON(`taxidriver-map`, `assets/tilemaps/taxidriver.json`);
    this.load.tilemapTiledJSON(`somelikeithot-map`, `assets/tilemaps/somelikeithot.json`);
    this.load.tilemapTiledJSON(`thegodfather-map`, `assets/tilemaps/thegodfather.json`);
    this.load.tilemapTiledJSON(`twothousandandoneaspaceodyssey-map`, `assets/tilemaps/twothousandandoneaspaceodyssey.json`);
    this.load.tilemapTiledJSON(`beautravail-map`, `assets/tilemaps/beautravail.json`);
    this.load.tilemapTiledJSON(`theconversation-map`, `assets/tilemaps/theconversation.json`);

    this.load.spritesheet('tank', 'assets/spritesheets/tank-spritesheet.png', {
      frameWidth: 8,
      frameHeight: 8,
      endFrame: 15
    });
    this.load.spritesheet('balthazar', 'assets/spritesheets/balthazar-spritesheet.png', {
      frameWidth: 8,
      frameHeight: 8,
      endFrame: 15
    });

    this.load.audio('idle', 'assets/sounds/idle.wav');
    this.load.audio('drive', 'assets/sounds/drive.wav');
    this.load.audio('shoot', 'assets/sounds/shoot.wav');
    this.load.audio('click', 'assets/sounds/click.wav');
    this.load.audio('die', 'assets/sounds/die.wav');

    this.load.audio('you-talkin-to-me', 'assets/sounds/you-talkin-to-me.wav');
    this.load.audio('rosebud', 'assets/sounds/rosebud.wav');
    this.load.audio('sunrise', 'assets/sounds/sunrise.wav');
    this.load.audio('rhythm-of-the-night', 'assets/sounds/rhythm-of-the-night.mp3');
  },

  create: function() {
    // Absolutely hideous hack to avoid this font-loading problem: display invisible text in preloader for
    // a tiny amount of time before going to the menu, which seems to fix it.
    let style = {
      fontFamily: 'Square',
    };
    let title = this.add.text(0, 0, "123456", style);
    title.visible = false;

    setTimeout(() => {
      console.log(`Starting ${START_SCENE}`);
      this.scene.start(START_SCENE);
    }, 100);
  },
});