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

    this.body.setBounce(1.25);
    this.body.setDrag(1000);

    this.setTint(tint);
  }

  create() {

  }

  update() {
    // Make me immovable when I'm not moving
    this.body.immovable = (this.body.velocity.x === 0 && this.body.velocity.y === 0);

    if (this.scene.game.getFrame() % 12 !== 0) {
      return;
    }

    this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(this.moveAngle), this.speed, this.body.velocity);

    if (this.rotationDirection != 0) {
      this.moveAngle += this.rotationDirection * this.rotationStep;
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
  }

  undo(delta) {
    console.log(delta);
    this.body.x -= this.body.velocity.x / delta;
    this.body.y -= this.body.velocity.y / delta;
  }

}