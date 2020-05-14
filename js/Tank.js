class Tank extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture, tint) {
    super(scene, x, y, texture)
    scene.physics.world.enableBody(this);
    this.scene = scene;
    this.setFrame(0);
    this.setScale(SCALE);
    this.maxSpeed = 150;
    this.speed = 0;
    this.rotationStep = 90 / 4;
    this.rotationDirection = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.tint = tint;

    this.body.setBounce(1.25);
    this.body.setDrag(1000);

    this.bullet = null;
    this.bulletSpeed = 800;
  }

  create() {

  }

  update() {
    if (this.dead) {
      this.rotationDirection = 1;
      this.updateFrame();
      return;
    }

    // Make me immovable when I'm not moving
    this.body.immovable = (this.body.velocity.x === 0 && this.body.velocity.y === 0);

    if (this.scene.game.getFrame() % 12 !== 0) {
      return;
    }

    this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(this.moveAngle), this.speed, this.body.velocity);

    if (this.rotationDirection != 0) {
      this.moveAngle += this.rotationDirection * this.rotationStep;
      this.updateFrame();
    }
  }

  updateFrame() {
    let frame = this.frame.name;
    frame += this.rotationDirection;
    if (frame < 0) {
      frame = 15;
    }
    else if (frame > 15) {
      frame = 0;
    }
    this.setFrame(frame);
  }

  shoot(shootables) {
    if (this.bullet) return;

    this.bullet = this.scene.physics.add.sprite(this.x, this.y, `atlas`, `pixel.png`).setScale(4);
    this.bullet.setTint(this.tint);
    this.bullet.depth = -10;
    this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(this.moveAngle), this.bulletSpeed, this.bullet.body.velocity);
    this.scene.physics.add.overlap(this.bullet, shootables, (bullet, target) => {
      console.log(target);
      if (target === this) return;
      if (target instanceof Tank) {
        target.die();
        bullet.destroy();
        this.bullet = null;
      }
      if (target.index === 1) {
        bullet.destroy();
        this.bullet = null;
      }
    });

  }

  die() {
    this.dead = true;
  }

}