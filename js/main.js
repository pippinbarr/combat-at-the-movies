const DEBUG = false;
const START_SCENE = "prototype";

let config = {
  type: Phaser.AUTO,
  width: 640 / 5,
  height: 480 / 5,
  scene: [
    Boot, Preloader, Prototype
  ],
  render: {
    antialias: false,
    pixelArt: true,
    antialiasGL: false
  },
  pixelArt: true,
  antialias: false,
  antialiasGL: false,
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.BOTH,
    width: 640 / 5,
    height: 480 / 5,
  }
};

let game = new Phaser.Game(config);