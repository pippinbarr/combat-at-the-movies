let Prototyping = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Prototyping() {
    Phaser.Scene.call(this, {
      key: 'prototype'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#000');
  },

  update: function() {

  },

});