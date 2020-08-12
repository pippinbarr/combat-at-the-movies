class AuHasardBalthazar extends GameScene {
  constructor() {
    super({
      key: "auhasardbalthazar"
    });
  }

  create() {
    super.create({
      // bgColor: 0xBEC86D,
      // tileColor: 0xF1B275,
      // playerColor: 0xC04141
    });
    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;

    this.balthazar = new AITank(this, 100, 240, `tank`, 0x6e4926);
    this.add.existing(this.balthazar);
    this.balthazar.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.balthazar.y = this.game.canvas.height / 2 + 24;
    this.balthazar.setTexture('balthazar');
    this.balthazar.setFrame(0);
    this.balthazar.moveAngle = 180;
    this.orientBalthazar();

    this.tanks.add(this.balthazar);

    this.title = "AU HASARD BALTHAZAR";
    this.explanation = "Play your part in the circuitous and everyday life of a donkey called Balthazar. Watch as he wanders around the field of play, guileless and innocent. Use the Arrow Keys to move and press the Space Bar to shoot. Balthazar will surely die, but how?";
    this.figureKey = 'fig-au-hasard-balthazar';
    this.caption = 'Fig. E – Balthazar is just a donkey'
    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.timeout = setTimeout(() => {
      this.balthazar.die();
      this.player.active = false;
      clearTimeout(this.timeout);
      this.gameOverTimer = setTimeout(() => {
        this.gameOver();
      }, 5000);
    }, 20000);
  }

  update(time, delta) {
    super.update(time, delta);

    if (this.black.visible) return;
    if (!this.playing) return;

    this.balthazar.update();

    if (!this.balthazar.dead) {
      this.balthazar.setFrame(0);
      this.orientBalthazar();
    }

    //
    // if (this.balthazar.dead) {
    //   let frame = this.balthazar.frame.name;
    //   frame += 1;
    //   if (frame < 0) {
    //     frame = 15;
    //   }
    //   else if (frame > 15) {
    //     frame = 0;
    //   }
    //   this.balthazar.setFrame(frame);
    // }
  }

  shoot() {
    let bullet = this.player.shoot();
    if (!bullet) {
      return;
    }
    this.physics.add.overlap(bullet, this.walls, (bullet, target) => {
      if (target.index === 1) {
        bullet.owner.shooting = false;
        bullet.destroy();
      }
    });
    this.physics.add.overlap(bullet, this.balthazar, (bullet, target) => {
      bullet.destroy();
      this.balthazar.die();
      this.player.active = false;
      clearTimeout(this.timeout);
      this.gameOverTimer = setTimeout(() => {
        this.gameOver();
      }, 5000);
    });
  }

  orientBalthazar() {
    let angle = this.balthazar.moveAngle;
    angle = angle % 360;
    if (angle < 0) angle = angle + 360;
    if (angle > 90 && angle < 270) {
      this.balthazar.setFlip(true, false);
    }
    else {
      this.balthazar.setFlip(false, false);
    }
  }
}