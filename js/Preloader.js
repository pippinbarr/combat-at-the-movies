let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader() {
    Phaser.Scene.call(this, {
      key: 'preloader'
    });
  },

  preload: function() {

  },

  create: function() {
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 100);
  },
});