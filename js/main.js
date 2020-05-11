const DEBUG = false;
const START_SCENE = "prototype";
const SCALE = 1;

let config = {
  type: Phaser.AUTO,
  width: 640 / SCALE,
  height: 480 / SCALE,
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
    width: 640 / SCALE,
    height: 480 / SCALE,
  }
};

let game = new Phaser.Game(config);