class Tank extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    scene.physics.world.enableBody(this);
    this.setScale(5);
    this.scene = scene;
    this.setFrame(0);
    this.maxSpeed = 10;
    this.speed = this.maxSpeed;
    this.rotationStep = 90 / 4;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
  }

  create() {

  }

  update() {
    this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(this.moveAngle), this.speed, this.body.velocity);

    if (this.rotationDirection != 0) {
      this.moveAngle += this.rotationDirection * this.rotationStep;
      let frame = this.frame.name;
      frame += this.rotationDirection;
      if (frame < 0) {
        frame = 3;
        this.angle -= 90;
      }
      else if (frame > 3) {
        frame = 0;
        this.angle += 90;
      }
      this.setFrame(frame);
    }
  }

  undo() {
    // this.x -= 2 * this.maxSpeed * Math.cos(Phaser.Math.DegToRad(this.moveAngle));
    // this.y -= 2 * this.maxSpeed * Math.sin(Phaser.Math.DegToRad(this.moveAngle));
  }


}