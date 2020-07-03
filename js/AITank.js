class AITank extends Tank {

  constructor(scene, x, y, texture, tint) {
    super(scene, x, y, texture, tint)
  }

  create() {

  }

  update() {
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

    super.update();
  }
}