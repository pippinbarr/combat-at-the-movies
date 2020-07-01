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

    this.enemies = this.add.group();
    const numTanksInRow = 4;
    const upperY = 190;
    const lowerY = this.game.canvas.height - upperY;
    const startX = 180;
    const width = 150;
    const spacing = width / numTanksInRow;
    for (let i = 0; i < numTanksInRow; i++) {
      let topEnemy = new Tank(this, startX + i * spacing, upperY - Math.random() * 20, `tank`, 0x272AB0);
      topEnemy.moveAngle = 90;
      topEnemy.setFrame(4);
      topEnemy.updateFrame();
      topEnemy.direction = 1;
      this.add.existing(topEnemy);
      this.enemies.add(topEnemy);

      let bottomEnemy = new Tank(this, startX + i * spacing, lowerY + Math.random() * 20, `tank`, 0x272AB0);
      bottomEnemy.moveAngle = 270;
      bottomEnemy.setFrame(12);
      bottomEnemy.updateFrame();
      bottomEnemy.direction = -1;
      this.add.existing(bottomEnemy);
      this.enemies.add(bottomEnemy);

      topEnemy.visible = false;
      bottomEnemy.visible = false;

    }

    this.shooting = false;
  }

  update(time, delta) {
    super.update(time, delta);

    if (this.player.x > 240 && !this.shooting) {
      this.enemies.children.each((enemy) => {
        enemy.visible = true;
      });
      this.shooting = true;
    }

    if (this.shooting) {
      this.handleShooting();
    }

  }

  handleShooting() {
    this.enemies.children.each((enemy) => {
      // If the player's already dead then no need to shoot them
      if (this.player.dead) return;

      // Otherwise, shoot...
      let bullet = enemy.shoot();

      // And if you hit something...
      this.physics.add.overlap(bullet, this.shootables, (bullet, target) => {
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
          if (this.player.hits > 50) {
            this.player.dieSFX.play();
            this.player.driveSFX.stop();
            this.player.idleSFX.stop();
            this.player.dead = true;
          }
        }
        // If it's a wall, end of bullet
        else if (target.index === 1) {
          bullet.owner.shooting = false;
          bullet.destroy();
        }
      });
      // Update
      enemy.update();
    });

  }

  shoot() {

  }
}