const DEBUG = false;
const START_SCENE = "prototype";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [
    Boot, Preloader, Prototype
  ],
  pixelArt: true,
  antialias: false,
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.BOTH,
    width: 800,
    height: 400
  }
};

let game = new Phaser.Game(config);