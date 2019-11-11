export default class BootScene extends Phaser.Scene {

  preload () {
    // Preload assets
    this.load.image("background", "./assets/images/2.0/finalbackground.png");
    this.load.image("neighborhood", "./assets/images/2.0/neighbourhood3.0.jpg");
    this.load.image("alley", "./assets/images/2.0/alley3.0.png");
    this.load.image("park", "./assets/images/2.0/park3.0.png");
    this.load.image("toyShop", "./assets/images/toyShop.png")
    this.load.image("arrows", "./assets/images/arrows.png");
    //this.load.image("spacebar", "./assets/images/spacebar.png");
    this.load.image("car1", "./assets/images/car11.png");
    this.load.image("car2", "./assets/images/car12.png");
    this.load.image("mailbox", "./assets/images/mailbox.png");
    this.load.image("lamppost", "./assets/images/lamppost.png");
    this.load.image("trashcan", "./assets/images/trashcan.png");
    this.load.image("dumpster", "./assets/images/dumpster.png");
    this.load.image("sign1", "./assets/images/sign1.png");
    this.load.image("sign2", "./assets/images/sign2.png");
    this.load.image("sign3", "./assets/images/sign3.png");
    this.load.image("bench", "./assets/images/bench.png");
    this.load.image("tree", "./assets/images/tree.png");
    this.load.image("dogBone", "./assets/images/dogBone.png");
    this.load.image("dogBowl", "./assets/images/dogBowl.png");
    this.load.image("dogCollar", "./assets/images/dogCollar.png");
    this.load.image("dogToy", "./assets/images/dogToy.png");
    this.load.image("dogToy2", "./assets/images/dogToy2.png");
    this.load.image("dogToy3", "./assets/images/dogToy3.png");
    this.load.image("dogPicture", "./assets/images/dogPicture.png");
    this.load.image("thug", "./assets/images/ThugAlive.png");
    this.load.image("hachiko", "./assets/images/hachikogif.gif");
    this.load.image("nerf", "./assets/images/nerf.png");
    this.load.image("bullet", "./assets/images/bullet.png");
    this.load.image("box", "./assets/sprites/box.png");
    this.load.image("arrow1", "./assets/images/arrow1.png");
    this.load.image("arrow2", "./assets/images/arrow2.png");
    this.load.image("arrow3", "./assets/images/arrow3.png");

    //this.load.video("titleVideo", "./assets/images/titleVideo.mp4");

    this.load.spritesheet("player", "./assets/spritesheet/playerSpriteSheetwithCrouch.png", {
      frameWidth:545/3,
      frameHeight: 790/3
    });
    this.load.spritesheet("movingCar", "./assets/spritesheet/movingCar.png", {
      frameWidth: 200,
      frameHeight: 150
    });
    this.load.spritesheet("movingCar2", "./assets/spritesheet/movingCar2.png", {
      frameWidth: 200,
      frameHeight: 150
    });

    this.load.audio("collect", "./assets/sounds/collect.wav");
    this.load.audio("enemyGrunt", "./assets/sounds/enemyGrunt.wav");
    this.load.audio("girlOuch", "./assets/sounds/girlOuch.mp3");
    this.load.audio("mcGrunt", "./assets/sounds/mcGrunt.mp3");
    this.load.audio("neighborhoodBackgroundMusic", "./assets/sounds/neighborhoodBackground.wav");
    this.load.audio("nerfShoot", "./assets/sounds/nerfGunShot.wav");
    this.load.audio("jump", "./assets/sounds/jump.wav");
    this.load.audio("alleyBackgroundMusic", "./assets/sounds/alleyBackground.ogg");
    this.load.audio("parkBackgroundMusic", "./assets/sounds/parkMusic.wav");
  }


  create (data) {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 3 }),
      frameRate: 13,
      repeat: -1
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 20,
    });
    this.anims.create({
      key: "crouch",
      frames: this.anims.generateFrameNumbers("player", {start: 7, end: 9 }),
      frameRate: 3,
    });

    this.anims.create({
      key: "drive",
      frames: this.anims.generateFrameNumbers("movingCar", {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "drive2",
      frames: this.anims.generateFrameNumbers("movingCar2", {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.scene.start('NeighborhoodScene');

  }
}
