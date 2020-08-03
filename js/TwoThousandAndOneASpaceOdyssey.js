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

    this.monolith = this.map.createDynamicLayer("monolith", this.tileset, 0, 0);

    this.monolith.forEachTile((tile) => {
      tile.tint = 0x000000;
    });
    this.monolith.touches = 0;
    this.monolith.collider = this.physics.add.collider(this.tanks, this.monolith, (tank, monolith) => {
      this.monolithTouch(tank, monolith);
    });

    this.setMonolithActive(false);

    this.enemyBlocker = this.map.createDynamicLayer("enemy_blocker", this.tileset, 0, 0);
    this.enemyBlocker.setCollisionByProperty({
      collides: true
    });
    this.enemyBlocker.visible = false;
    this.physics.add.collider(this.enemy, this.enemyBlocker, (tank, wall) => {
      tank.hit(wall);
    });

    this.showInstruction("EVOLVE");

    this.timeout = setTimeout(() => {
      this.showGameOver("YOU DIDN'T EVOLVE");
    }, 30000);

    setTimeout(() => {
      this.setMonolithActive(true);
      let dx = 155 - this.player.x;
      let dy = 210 - this.player.y;

      console.log(dx, dy, this.monolith.width / 2, this.monolith.height / 2);

      if (Math.abs(dx) < this.monolith.width / 2 && Math.abs(dy) < this.monolith.height / 2) {
        this.player.x = 155;
        this.player.y = 300;
      }
    }, 6000);
  }

  setMonolithActive(active) {
    this.monolith.visible = active;
    this.monolith.setCollisionByProperty({
      collides: active
    });
    if (!active) {
      this.physics.world.removeCollider(this.monolith.collider);
    }
  }

  monolithTouch(tank, monolith) {
    if (tank === this.player) {
      if (this.monolith.touches < 1) {
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
    this.enemy.update();
  }

  shoot() {
    if (!this.player.canShoot) return;

    let bullet = this.player.shoot(this.walls);

    this.physics.add.overlap(bullet, this.enemy, (bullet, target) => {
      if (target === bullet.owner) {
        return;
      }
      if (target instanceof Tank) {
        if (!target.dead) {
          target.die(bullet);

          clearTimeout(this.timeout);
          this.gameOverTimer = setTimeout(() => {
            this.showGameOver("YOU EVOLVED");
          }, 5000);

        }
      }
      else if (target.index === 1) {
        bullet.owner.shooting = false;
        bullet.destroy();
      }
    });

  }
}