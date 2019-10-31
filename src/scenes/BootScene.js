export default class BootScene extends Phaser.Scene {

  preload () {
    // Preload assets
    this.load.image("background", "./assets/images/background.png");
    this.load.image("neighborhood", "./assets/images/neighborhood.png");
    this.load.image("alley", "./assets/images/alley.png");
    this.load.image("park", "./assets/images/park.png");
    this.load.image("tutorial", "./assets/images/hachiko backdrop.png");
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
    this.load.image("dogPicture", "./assets/images/dogPicture.png");
    this.load.image("thug", "./assets/images/ThugAlive.png");
    this.load.image("hachiko", "./assets/images/hachikogif.gif");
    this.load.image("nerf", "./assets/images/nerf.png");
    this.load.image("bullet", "./assets/images/bullet.png");
    this.load.image("box", "./assets/sprites/box.png");
    this.load.image("arrow", "./assets/images/arrow.png");
    this.load.spritesheet("player", "./assets/spritesheet/playerSpriteSheetwithCrouch.png", {
      frameWidth:545/3,
      frameHeight: 790/3
    });
    this.load.audio("collect", "./assets/sounds/collect.wav");
    this.load.audio("enemyGrunt", "./assets/sounds/enemyGrunt.wav");
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

    this.scene.start('PreGameScene');

  }
}
