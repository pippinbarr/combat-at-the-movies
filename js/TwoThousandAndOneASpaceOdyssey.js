class TwoThousandAndOneASpaceOdyssey extends GameScene {
  constructor() {
    super({
      key: "twothousandandoneaspaceodyssey"
    });
  }

  create() {
    super.create({
      // bgColor: 0xBEC86D,
      // tileColor: 0xF1B275,
      // playerColor: 0xC04141
    });

    this.TIME_TO_SUNRISE = 2000;
    this.TIME_TO_MONOLITH = 6000;

    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;
    this.player.canShoot = false;

    this.enemy = new AITank(this, 100, 240, `tank`, 0x272AB0);
    this.add.existing(this.enemy);
    this.enemy.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.enemy.y = this.game.canvas.height / 2 + 24;
    this.enemy.setFrame(8);
    this.enemy.moveAngle = 180;
    this.tanks.add(this.enemy);
    this.shootables.add(this.enemy);

    this.monolith = this.physics.add.sprite(8 * 16, 9 * 16 + 4 * 16, 'atlas', 'pixel.png')
      .setImmovable(true)
      .setScale(5 * 16, 8 * 16)
      .setTint(0x000000);

    this.monolith.touches = 0;


    this.setMonolithActive(false);

    this.enemyBlocker = this.map.createDynamicLayer("enemy_blocker", this.tileset, 0, 0);
    this.enemyBlocker.setCollisionByProperty({
      collides: true
    });
    this.enemyBlocker.visible = false;
    this.physics.add.collider(this.enemy, this.enemyBlocker, (tank, wall) => {
      tank.hit(wall);
    });

    this.clickSFX = this.sound.add('click');
    this.sunriseMusic = this.sound.add('sunrise');

    this.title = "2001: A SPACE ODYSSEY";
    this.explanation = "Start out as a tank without firepower, low on the foodchain. When it appears, use the power of the monolith to upgrade your canon and eliminate the competition. Hold the Up Arrow to move forwards, the Left and Right Arrows to turn, and press the Space Bar to shoot once enabled. Evolve.";
    this.figureKey = 'fig-2001-a-space-odyssey';
    this.caption = 'The monolith arrives'
    this.showInstructions(this.startGame.bind(this));

    this.canClick = true;
  }

  startGame() {
    this.sunriseTimer = setTimeout(() => {
      this.sunriseMusic.play();
      this.monolithTimer = setTimeout(() => {
        this.setMonolithActive(true);
      }, this.TIME_TO_MONOLITH);
    }, this.TIME_TO_SUNRISE);
  }

  roundOver() {
    clearTimeout(this.sunriseTimer);
    clearTimeout(this.monolithTimer);

    super.roundOver();
    this.player.active = false;
    this.enemy.active = false;
    this.gameOver();
  }

  gameOver() {
    super.gameOver();
    this.enemy.active = false;
  }

  setMonolithActive(active) {
    this.monolith.visible = active;
    if (active) {
      this.monolith.collider = this.physics.add.collider(this.tanks, this.monolith, (tank, monolith) => {
        this.monolithTouch(tank, monolith);
      });
    }
    if (!active) {
      this.physics.world.removeCollider(this.monolith.collider);
    }
  }

  monolithTouch(tank, monolith) {
    if (tank === this.player) {
      if (this.physics.overlap(tank, monolith)) {
        this.player.x = this.monolith.x;
        this.player.y = this.monolith.y + this.monolith.body.height / 2 + this.player.body.height;
        return;
      }
      if (this.monolith.touches < 2) {
        this.monolith.touches++;
      }
      else {
        this.setMonolithActive(false);
        this.player.canShoot = true;
      }
    }
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.playing) return;

    this.enemy.update();
  }

  shoot() {
    if (!this.player.canShoot) {
      if (this.canClick) {
        this.clickSFX.play();
        this.canClick = false;
        this.canClickTimer = setTimeout(() => {
          this.canClick = true;
        }, 500);
      }
      return;
    }

    let bullet = this.player.shoot(this.walls);

    this.physics.add.overlap(bullet, this.enemy, (bullet, target) => {
      if (target === bullet.owner) {
        return;
      }
      if (target instanceof Tank) {
        if (!target.dead) {
          target.die(bullet);
          this.player.score++;
          this.playerScore.text = this.player.score;

          clearTimeout(this.roundTimer);
          this.stopWarning();

          this.postDeathTimer = setTimeout(this.gameOver.bind(this), this.POST_DEATH_DELAY);
        }
      }
      else if (target.index === 1) {
        bullet.owner.shooting = false;
        bullet.destroy();
      }
    });
  }

  shutdown() {
    clearTimeout(this.monolithTimer);
    clearTimeout(this.sunriseTimer);
    clearTimeout(this.postDeathTimer);
    clearTimeout(this.canClickTimer);

    super.shutdown();
  }
}