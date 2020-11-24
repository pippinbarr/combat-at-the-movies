class AITank extends Tank {

  constructor(scene, x, y, texture, tint, enemy) {
    super(scene, x, y, texture, tint);

    this.hitDX = 0;
    this.enemy = enemy;
    this.turnChance = 0.01;
  }

  create() {

  }

  update() {
    if (this.hitDX !== 0) {
      this.avoidanceMovement();
    }
    else {
      this.randomMovement();
    }

    super.update();
  }

  avoidanceMovement() {
    if (this.avoidTimer) return;

    this.rotationDirection = Math.random() < 0.5 ? -1 : 1;
    this.speed = this.maxSpeed;

    this.avoidTimer = setTimeout(() => {
      this.rotationDirection = 0;
      this.avoidTimer = setTimeout(() => {
        this.avoidTimer = undefined;
        this.hitDX = 0;
      }, 1000);
    }, 1000);
  }

  randomMovement() {

    let turn = Math.random();
    console.log(turn);
    if (turn < this.turnChance) {
      this.rotationDirection = -1;
    }
    else if (turn < this.turnChance * 2) {
      this.rotationDirection = 1;
    }
    else {
      this.rotationDirection = 0;
    }

    this.speed = Math.random() < 0.1 ? 0 : this.maxSpeed;
  }

  hit(object) {
    // Ran into an object
    this.hitDX = this.x - (object.pixelX ? object.pixelX : object.x);
    this.hitDY = this.y - (object.pixelY ? object.pixelY : object.y);
  }

  shoot(shootables) {
    if (Math.random() < 0.02) return super.shoot(shootables);
  }
}