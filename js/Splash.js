class Splash extends Phaser.Scene {

  constructor(config) {
    super({
      key: "splash"
    });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);

    this.splash = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, `splash`);

    this.standardStyle = {
      font: "18px sans-serif",
      color: "#fff",
      backgroundColor: "#000",
      padding: {
        top: 0,
        bottom: 0,
      },
      align: "right",
    };

    this.nextTimeout = setTimeout(() => {
      this.nextText = this.add.text(290, 440, "Press Space Bar to begin.", this.standardStyle);
      this.flashInterval = setInterval(() => {
        this.nextText.visible = !this.nextText.visible;
      }, 1000);
    }, 1000);

    // setTimeout(() => {
    //   this.scene.start(`menu`);
    // }, 3000);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      clearInterval(this.flashInterval);
      clearTimeout(this.nextTimeout);
      this.scene.start(`menu`);
    }
  }
}