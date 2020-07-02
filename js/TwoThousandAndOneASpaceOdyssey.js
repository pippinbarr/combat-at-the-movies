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

    this.monolith = this.map.createDynamicLayer("monolith", this.tileset, 0, 0);

    this.monolith.forEachTile((tile) => {
      tile.tint = 0x000000;
    });
    this.monolith.touches = 0;
    this.monolith.collider = this.physics.add.collider(this.tanks, this.monolith, (tank, monolith) => {
      this.monolithTouch(tank, monolith);
    });

    this.setMonolithActive(true);

    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;
    this.player.canShoot = false;

    this.enemy = new Tank(this, 100, 240, `tank`, 0x272AB0);
    this.add.existing(this.enemy);
    this.enemy.x = this.game.canvas.width - this.game.canvas.width / 10;
    this.enemy.y = this.game.canvas.height / 2 + 24;
    this.enemy.setFrame(8);
    this.enemy.moveAngle = 180;
    this.tanks.add(this.enemy);
    this.shootables.add(this.enemy);
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
      if (this.monolith.touches < 10) {
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
    if (this.player.canShoot) {
      super.shoot();
    }
  }
}