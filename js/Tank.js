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
    this.tintColor = tint;
    this.tint = tint;
    this.body.maxSpeed = 150;

    this.updateRate = 12;

    this.body.setBounce(1.25);
    this.body.setDrag(1000);

    this.shooting = false;
    this.bulletSpeed = 800;
    this.dead = false;
    this.active = true;

    this.score = 0;

    this.idleSFX = this.scene.sound.add('idle').setVolume(0.3).setLoop(true);
    this.driveSFX = this.scene.sound.add('drive').setVolume(1).setLoop(true);
    this.shootSFX = this.scene.sound.add('shoot');
    this.dieSFX = this.scene.sound.add('die');

    setTimeout(() => {
      this.idleSFX.play();
    }, Math.random() * 100);
  }

  create() {

  }

  update() {
    if (!this.active) return;

    if (this.dead) {
      this.rotationDirection = 1;
      this.updateFrame();
      return;
    }

    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      if (!this.idleSFX.isPlaying) {
        this.idleSFX.play();
        this.driveSFX.stop();
      }
    }
    else {
      if (!this.driveSFX.isPlaying) {
        this.driveSFX.play();
        this.idleSFX.stop();
      }
    }

    if (this.waiting) {
      return;
    }

    // Make me immovable when I'm not moving
    this.body.immovable = (this.body.velocity.x === 0 && this.body.velocity.y === 0);

    if (this.scene.game.getFrame() % this.updateRate !== 0) {
      return;
    }

    console.log("update")

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
    if (this.shooting) return false;

    this.shootSFX.play();

    this.shooting = true;
    let bullet = this.scene.physics.add.sprite(this.x, this.y, `atlas`, `pixel.png`).setScale(4);
    bullet.tint = this.tintColor;
    bullet.depth = -10;
    bullet.owner = this;
    this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(this.moveAngle), this.bulletSpeed, bullet.body.velocity);

    if (!bullet) {
      return;
    }

    this.scene.physics.add.overlap(bullet, shootables, (bullet, target) => {
      if (target === bullet.owner) {
        return;
      }
      if (target instanceof Tank) {
        if (!target.dead) {
          target.die(bullet);
        }
      }
      else if (target.index === 1) {
        bullet.owner.shooting = false;
        bullet.destroy();
      }
    });

    return bullet;
  }

  die(bullet) {
    this.dieSFX.play();
    this.driveSFX.stop();
    this.idleSFX.stop();
    this.dead = true;

    if (bullet) {
      // This is here to reset death, but that's not relevant in any of the games
      // setTimeout(() => {
      //   this.dead = false;
      //   this.rotationDirection = 0;
      // }, 2000);

      this.body.velocity.x = bullet.body.velocity.x * 7;
      this.body.velocity.y = bullet.body.velocity.y * 8;

      bullet.owner.shooting = false;
      bullet.destroy();
      bullet.owner.wait();
    }

    console.log("Emitting DEATH event.");
    this.scene.events.emit("DEATH", this);
  }

  wait() {
    this.waiting = true;
    // Wait forever
    // setTimeout(() => {
    //   this.waiting = false;
    // }, 2000);
  }

  hit(object) {
    // Ran into an object
  }
}