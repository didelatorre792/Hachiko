export default class BootScene extends Phaser.Scene {

  preload () {
    // assets

    this.load.image("board", "./assets/images/2.0/board.png");
    this.load.image("background", "./assets/images/2.0/finalbackground.png");
    this.load.image("neighborhood", "./assets/images/2.0/neighbourhood3.0.jpg");
    this.load.image("alley", "./assets/images/2.0/alley.png");
    this.load.image("park", "./assets/images/2.0/park3.0.png");
    this.load.image("toyShop", "./assets/images/toyShop.png")
    this.load.image("arrows", "./assets/images/arrows.png");
    this.load.image("car1", "./assets/images/carOutlined.png");
    this.load.image("car2", "./assets/images/car12Outlined.png");
    this.load.image("mailbox", "./assets/images/mailboxOutlined.png");
    this.load.image("lamppost", "./assets/images/lamppostOutlined.png");
    this.load.image("trashcan", "./assets/images/trashcanOutlined.png");
    this.load.image("dumpster", "./assets/images/dumpsterOutlined.png");
    this.load.image("sign1", "./assets/images/sign1Outlined.png");
    this.load.image("sign2", "./assets/images/sign2.png");
    this.load.image("sign3", "./assets/images/sign3Outlined.png");
    this.load.image("bench", "./assets/images/benchOutlined.png");
    this.load.image("tree", "./assets/images/tree.png");
    this.load.image("dogBone", "./assets/images/dogBoneOutlined.png");
    this.load.image("dogBowl", "./assets/images/dogBowlOutlined.png");
    this.load.image("dogCollar", "./assets/images/dogCollarOutlined.png");
    this.load.image("dogToy", "./assets/images/dogToyOutlined.png");
    this.load.image("dogToy2", "./assets/images/dogToy2Outlined.png");
    this.load.image("dogToy3", "./assets/images/dogToy3Outlined.png");
    this.load.image("dogToy4", "./assets/images/dogToy4.png");
    this.load.image("dogPicture", "./assets/images/dogPictureOutlined.png");
    this.load.image("thug", "./assets/images/ThugAlive.png");
    this.load.image("hachiko", "./assets/images/hachikogif.gif");
    this.load.image("nerf", "./assets/images/nerf.png");
    this.load.image("bullet", "./assets/images/bullet.png");
    this.load.image("bulletVertical", "/assets/images/bulletVertical.png");
    this.load.image("box", "./assets/images/box.png");
    this.load.image("boxCopy", "./assets/images/box2Outlined.png");
    this.load.image("boxCopy2", "./assets/images/box3Outlined.png");
    this.load.image("boxCopy3", "./assets/images/box4Outlined.png");
    this.load.image("boxCopy4", "./assets/images/box5Outlined.png");
    this.load.image("arrow1", "./assets/images/arrow1.png");
    this.load.image("arrow2", "./assets/images/arrow2.png");
    this.load.image("arrow3", "./assets/images/arrow3.png");
    this.load.image("blocks", "./assets/images/toyBlocksOutlined.png");
    this.load.image("heart", "./assets/images/heart.png");
    this.load.image("bossHeart", "./assets/images/bossHeart.png");
    this.load.image("lego", "./assets/images/legoOutlined.png");
    this.load.image("titlePic", "./assets/images/titlePic.png");

    this.load.image("spark", "./assets/images/spark.png");
    this.load.image("spark2", "./assets/images/spark2.png");

    // audio
    this.load.audio("collect", "./assets/sounds/collect.wav");
    this.load.audio("enemyGrunt", "./assets/sounds/enemyGrunt.wav");
    this.load.audio("girlOuch", "./assets/sounds/girlOuch.mp3");
    this.load.audio("mcGrunt", "./assets/sounds/mcGrunt.mp3");
    this.load.audio("neighborhoodBackgroundMusic", "./assets/sounds/neighborhoodBackground.wav");
    this.load.audio("nerfShoot", "./assets/sounds/nerfGunShot.wav");
    this.load.audio("jump", "./assets/sounds/jump.wav");
    this.load.audio("alleyBackgroundMusic", "./assets/sounds/alleyBackground.ogg");
    this.load.audio("parkBackgroundMusic", "./assets/sounds/parkMusic.wav");
    this.load.audio("toyShopBackgroundMusic", "./assets/sounds/toyShopBackground.wav");
    this.load.audio("carHorn", "./assets/sounds/carHorn.wav");
    this.load.audio("alarm", "./assets/sounds/alarm.wav");

    // spritesheets
    this.load.spritesheet("player", "./assets/spritesheet/playerSpriteSheet.png", {
      frameWidth:545/3,
      frameHeight: 790/3
    });
    this.load.spritesheet("playerDamage", "./assets/spritesheet/playerSpriteSheetwithDamage.png", {
      frameWidth:545/3,
      frameHeight: 790/3
    });
    this.load.spritesheet("movingCar", "./assets/spritesheet/movingCar.png", {
      frameWidth: 186,
      frameHeight: 304/4
    });
    this.load.spritesheet("movingCar2", "./assets/spritesheet/movingCar2.png", {
      frameWidth: 186,
      frameHeight: 304/4
    });
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
      key: "damage",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
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
    this.scene.start('TitleScene');
  }
}
