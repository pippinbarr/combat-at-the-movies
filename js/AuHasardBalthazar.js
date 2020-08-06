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
    this.balthazar.setFrame(8);
    this.balthazar.moveAngle = 180;


    this.tanks.add(this.balthazar);

    this.showInstruction("BALTHAZAR IS JUST A DONKEY");

    this.timeout = setTimeout(() => {
      this.showGameOver("LIFE GOES ON");
    }, 30000);
  }

  update(time, delta) {
    super.update(time, delta);

    if (this.black.visible) return;
    if (!this.playing) return;

    this.balthazar.update();
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
      clearTimeout(this.timeout);
      this.gameOverTimer = setTimeout(() => {
        this.showGameOver("YOU KILLED BALTHAZAR");
      }, 5000);
    });
  }
}