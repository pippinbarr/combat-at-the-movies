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
    this.monolith.setCollisionByProperty({
      collides: true
    });
    this.monolith.forEachTile((tile) => {
      tile.tint = 0x000000;
    });


    this.player.x = this.game.canvas.width / 10;
    this.player.y = this.game.canvas.height / 2 + 24;
    this.player.hits = 0;

    // this.enemies = this.add.group();
    // const numTanksInRow = 4;
    // const upperY = 190;
    // const lowerY = this.game.canvas.height - upperY;
    // const startX = 180;
    // const width = 150;
    // const spacing = width / numTanksInRow;
    // for (let i = 0; i < numTanksInRow; i++) {
    //   let topEnemy = new Tank(this, startX + i * spacing, upperY - Math.random() * 20, `tank`, 0x272AB0);
    //   topEnemy.moveAngle = 90;
    //   topEnemy.setFrame(4);
    //   topEnemy.updateFrame();
    //   topEnemy.direction = 1;
    //   this.add.existing(topEnemy);
    //   this.enemies.add(topEnemy);
    //
    //   let bottomEnemy = new Tank(this, startX + i * spacing, lowerY + Math.random() * 20, `tank`, 0x272AB0);
    //   bottomEnemy.moveAngle = 270;
    //   bottomEnemy.setFrame(12);
    //   bottomEnemy.updateFrame();
    //   bottomEnemy.direction = -1;
    //   this.add.existing(bottomEnemy);
    //   this.enemies.add(bottomEnemy);
    //
    //   topEnemy.visible = false;
    //   bottomEnemy.visible = false;
    //
    // }
  }

  update(time, delta) {
    super.update(time, delta);
  }

  shoot() {

  }
}