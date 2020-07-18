class AITank extends Tank {

  constructor(scene, x, y, texture, tint) {
    super(scene, x, y, texture, tint)
  }

  create() {

  }

  update() {
    if (this.hitDX) {
      this.avoidanceMovement();
    }
    else {
      this.randomMovement();
    }

    super.update();
  }

  avoidanceMovement() {
    // this.rotationDirection = Math.random() < 0.5 ? -1 : 1;
    this.rotationDirection = -1;
    this.speed = this.maxSpeed;
    this.hitDX = undefined;
    this.hitDY = undefined;
  }

  randomMovement() {
    let turn = Math.random();
    if (turn < 0.2) {
      this.rotationDirection = -1;
    }
    else if (turn < 0.4) {
      this.rotationDirection = 1;
    }
    else {
      this.rotationDirection = 0;
    }

    let speed = Math.random();

    if (speed < 0.1) {
      this.speed = 0;
    }
    else {
      this.speed = this.maxSpeed;
    }
  }

  hit(object) {
    // Ran into an object
    this.hitDX = this.x - (object.pixelX ? object.pixelX : object.x);
    this.hitDY = this.y - (object.pixelY ? object.pixelY : object.y);
  }
}