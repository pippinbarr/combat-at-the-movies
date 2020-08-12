class TheGodfather extends GameScene {
  constructor() {
    super({
      key: "thegodfather"
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
    this.player.hits = 0;

    this.enemy = new Tank(this, 100, 240, `tank`, 0x272AB0);
    this.enemy.x = 260;
    this.enemy.y = 350;
    this.enemy.setFrame(12);
    this.enemy.moveAngle = 270;
    this.enemy.visible = false;

    this.tanks.add(this.enemy);
    this.add.existing(this.enemy);

    this.shooting = false;

    this.title = "THE GODFATHER";
    this.explanation = "Those Barzinis are up to no good. Play as Sonny Corleone (James Caan) driving through the toll plaza and minding your own business. Experience the shock and horror of a surprise attack from a Barzini tank that wants you dead. Hold the Up Arrow to move forwards, the Left and Right Arrows to turn. Drive through the plaza to your assassination.";
    this.figureKey = 'fig-the-godfather';
    this.caption = 'Fig. G – Beware the toll plaza'
    this.showInstructions(() => {
      this.startGame();
    });
  }

  startGame() {
    this.timeout = setTimeout(() => {
      this.playing = false;
      this.gameOver();
    }, 10000);
  }

  update(time, delta) {
    super.update(time, delta);

    if (this.black.visible) return;
    if (!this.playing) return;

    if (this.player.x > 250 && !this.shooting) {
      this.enemy.visible = true;
      this.shooting = true;
    }

    if (this.shooting) {
      this.handleShooting();
    }

  }

  handleShooting() {
    // If the player's already dead then no need to shoot them
    if (this.player.dead) return;

    // Otherwise, shoot...
    let bullet = this.enemy.shoot();

    // And if you hit something...
    this.physics.add.overlap(bullet, this.player, (bullet, target) => {
      // If it's yourself, then don't worry
      if (target === bullet.owner) {
        return;
      }
      // If it's the player, then they got shot
      if (target === this.player && !this.player.dead) {
        this.player.body.velocity.x = bullet.body.velocity.x;
        this.player.body.velocity.y = bullet.body.velocity.y;
        bullet.owner.shooting = false;
        bullet.destroy();
        this.player.hits++;
        if (this.player.hits > 3) {
          this.player.dieSFX.play();
          this.player.driveSFX.stop();
          this.player.idleSFX.stop();
          this.player.dead = true;

          clearTimeout(this.timeout);
          this.gameOverTimer = setTimeout(() => {
            this.playing = false;
            this.gameOver();
          }, 5000);
        }
      }
      // If it's a wall, end of bullet
      else if (target.index === 1) {
        bullet.owner.shooting = false;
        bullet.destroy();
      }

      // Update
      this.enemy.update();

    });

  }

  shoot() {

  }
}