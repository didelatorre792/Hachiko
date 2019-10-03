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
    this.load.image("bullet", "./assets/images/bullet.png");

    this.load.spritesheet("alien", "./assets/spritesheet/player.png", {
      frameWidth: 65,
      frameHeight: 95
    });

    // Declare variables for center of the scene


  }

  create (data) {
    //Create the scene
    var logo = this.add.image(this.centerX, this.centerY, 'logo');
    // whole scene shows
    //this.background = this.add.image(400, 294, "background");
    //this.background.setScale(0.34);

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

    this.scene.start('GameJam');



  }

  update (time, delta) {

  }
}
