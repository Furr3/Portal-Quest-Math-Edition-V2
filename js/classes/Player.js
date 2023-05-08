class Player extends Sprite {
  constructor({
    collisionBlocks = [],
    imageSrc,
    frameRate,
    animations,
    frameBuffer,
    loop,
  }) {
    super({ imageSrc, frameRate, animations, frameBuffer, loop });
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 0.35;

    this.collisionBlocks = collisionBlocks;
  }
  // för att göra att koden ser mer strukturerad ut har jag gjort en ny method för varje function.
  update() {
    this.checkForPlayerCollisionBox();

    this.playerPositionUpdate();

    this.updateHitbox();

    this.checkForHorizontalCollisions();

    this.checkForGravity();

    this.updateHitbox();

    //Denna kod är för att visa collisionbox för player
    /*
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
    */

    this.checkForVerticalCollisions();
    this.checkForAboveBottomOfCanvas();
  }

  handleInput(keys) {
    if (this.preventInput) return;
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = 6;
      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");
      this.velocity.x = -6;
      this.lastDirection = "left";
    } else if (this.lastDirection === "left") {
      this.switchSprite("idleLeft");
    } else this.switchSprite("idleRight");
  }
  //Kollade på 
  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }
  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 60,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  checkForPlayerCollisionBox() {
    //c.fillStyle = "rgba(0, 0, 255, 1)";
    //c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  playerPositionUpdate() {
    this.position.x += this.velocity.x;
  }
  checkForHorizontalCollisions() {
    //checks for horizontal collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      //if collision exists
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        //collision on x axis till vänster sida av väggen
        if (this.velocity.x < -0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  checkForGravity() {
    //apply gravitation
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;
  }

  checkForVerticalCollisions() {
    //check for vertical collision

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      //if collision exists
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  checkForAboveBottomOfCanvas() {
    //above bottom of canvas
    if (this.sides.bottom + this.velocity.y < canvas.height) {
    } else this.velocity.y = 0;
  }
}
