export default class BootScene extends Phaser.Scene {

  preload () {
    // Preload assets
    this.load.image("background", "./assets/images/background.png");
    this.load.image("car1", "./assets/images/car1.png");
    this.load.image("car2", "./assets/images/car2.png");
    this.load.image("mailbox", "./assets/images/mailbox.png");
    this.load.image("lamppost", "./assets/images/lamppost.png");
    this.load.image("trashcan", "./assets/images/trashcan.png");
    this.load.image("dumpster", "./assets/images/dumpster.png");
    this.load.image("sign1", "./assets/images/sign1.png");
    this.load.image("sign2", "./assets/images/sign2.png");
    this.load.image("bench", "./assets/images/bench.png");
    this.load.image("tree", "./assets/images/tree.png");
    this.load.image("dogBone", "./assets/images/dogBone.png");
    this.load.image("dogBowl", "./assets/images/dogBowl.png");
    this.load.image("dogCollar", "./assets/images/dogCollar.png");
    this.load.image("dogToy", "./assets/images/dogToy.png");
    this.load.image("dogPicture", "./assets/images/dogPicture.png");
    this.load.image("thug", "./assets/images/thug.png");
    this.load.image("hachiko", "./assets/images/hachiko.png");
    this.load.image("nerf", "./assets/images/nerf.png");
    this.load.image("bullet", "./assets/images/bullet.jpg");
    this.load.image("box", "./assets/sprites/box.png");

    this.load.spritesheet("player", "./assets/spritesheet/playerSpriteSheet1.png", {
      frameWidth: 65,
      frameHeight: 95
    });

    // Declare variables for center of the scene


  }

  create (data) {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.start('GameJam');

  }

  update (time, delta) {

  }
}
