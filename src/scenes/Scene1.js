/*globals Phaser*/
//import * as ChangeScene from './ChangeScene.js';
export default class Scene1 extends Phaser.Scene {
  constructor () {
    super('Scene1');
  }

  preload() {
    this.load.spritesheet("alien", "./assets/spritesheet/player.png", {
      frameWidth: 65,
      frameHeight: 95
    });
      //Dessert background from https://www.gameart2d.com/free-desert-platformer-tileset.html
      this.load.image("dessert", "./assets/images/background.png");

      // Declare variables for center of the scene
      this.centerX = this.cameras.main.width / 2;
      this.centerY = this.cameras.main.height / 2;
  }


  create() {
    //Add change scene event listeners

    //this.player;
    this.add.sprite(1280/2, 960/2,"dessert")
    //Add player sprite with arcade physics and boundaries
    this.player = this.physics.add.sprite(100, 800, "alien");
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, 0, 1280, 960);
    //Create annimations from spriteSheet
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });

    //Set main camera's bounraries and tell it follow the player
    this.cameras.main.setBounds(0, 0, 1280, 960);
    this.cameras.main.startFollow(this.player);

    //  Collide the player and the stars with the platforms
    //this.physics.add.collider(this.player, platforms);


  }

  update (time, delta) {
    // Update the scene

    //Set speed of player
    var speed = 6;

    //Create cursor keys and assign events
    var cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.player.x -= speed;
      this.player.anims.play("walk", true);
      this.player.flipX = true;
    } else if (cursors.right.isDown) {
      this.player.x += speed;
      this.player.anims.play("walk", true);
      this.player.flipX = false;
    } else {
      this.player.anims.play("idle", true);
    }
    if (cursors.up.isDown) {
      this.player.y -= speed;
    } else if (cursors.down.isDown) {
      this.player.y += speed;
    }
  }
}
