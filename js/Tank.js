class Tank extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    scene.physics.world.enableBody(this);
    this.scene = scene;
    this.setFrame(0);
    this.setScale(SCALE);
    this.maxSpeed = SCALE * 2;
    this.speed = 0;
    this.rotationStep = 90 / 4;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
  }

  create() {

  }

  update() {
    this.x += this.speed * Math.cos(Phaser.Math.DegToRad(this.moveAngle));
    this.y += this.speed * Math.sin(Phaser.Math.DegToRad(this.moveAngle));

    // this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(this.moveAngle), this.speed, this.body.velocity);

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

  undo() {
    this.x -= 2 * this.speed * Math.cos(Phaser.Math.DegToRad(this.moveAngle));
    this.y -= 2 * this.speed * Math.sin(Phaser.Math.DegToRad(this.moveAngle));
  }


}