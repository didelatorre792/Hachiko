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
// NEED TO FIX
    this.load.image("player", "./assets/images/player.png")
    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

  }

  create (data) {
    this.itemsCollected = 0;

    // whole scene shows
    //this.background = this.add.image(400, 294, "background");
    //this.background.setScale(0.34);

    this.cameras.main.setBounds(0, 0);
    this.background = this.add.image(2400, 300, "background").setScale(2);
    this.platforms = this.physics.add.staticGroup();
    // neighborhood
    this.car1 = this.platforms.create(240, 540, "car1").setScale(2);
    this.car2 = this.platforms.create(800, 540, "car2").setScale(.4);
    this.mailbox1 = this.platforms.create(450, 485, "mailbox").setScale(.15);
    this.lamppost1 = this.platforms.create(550, 395, "lamppost").setScale(1.2);
    this.mailbox2 = this.platforms.create(1070, 485, "mailbox").setScale(.15);
    this.lamppost2 = this.platforms.create(1240, 395, "lamppost").setScale(1.2);
    this.dogBone = this.add.image(1350, 200, "dogBone").setScale(.2);
    this.mailbox3 = this.platforms.create(1520, 485, "mailbox").setScale(.15);

    // alley
    this.trashcan1 = this.platforms.create(1650, 540, "trashcan").setScale(.3);
    this.trashcan2 = this.platforms.create(1720, 520, "trashcan").setScale(.5);
    this.sign1 = this.platforms.create(1850, 350, "sign1").setScale(.4);
    this.dogBowl = this.add.image(1950, 270, "dogBowl").setScale(.2);
    this.dogCollar = this.add.image(2050, 550, "dogCollar").setScale(.25);
    this.dumpster = this.platforms.create(2200, 480, "dumpster").setScale();
    this.trashcan3 = this.platforms.create(2450, 540, "trashcan").setScale(.3);
    this.sign2 = this.platforms.create(2630, 420, "sign2").setScale(.4);
    this.thug1 = this.platforms.create(2640, 525, "thug").setScale(.08);
    this.thug2 = this.platforms.create(3100, 510, "thug").setScale(.1);
    this.thug2 = this.platforms.create(3250, 505, "thug").setScale(.11);
    this.trashcan4 = this.platforms.create(3450, 540, "trashcan").setScale(.3);
    this.dogToy = this.add.image(3320, 350, "dogToy").setScale(.04);
    // park
    this.dogPicture = this.add.image(3660, 250, "dogPicture").setScale(.07);
    this.trashcan4 = this.platforms.create(3650, 545, "trashcan").setScale(.5);
    this.lamppost3 = this.platforms.create(3800, 463, "lamppost").setScale(1.2);
    this.bench = this.platforms.create(4000, 520, "bench").setScale(.8);
    this.tree = this.platforms.create(4300, 400, "tree").setScale(1.7);
    // boss
    this.bigThug = this.add.image(4740, 470, "thug").setScale(.2);
    this.hachiko = this.add.image(4690, 550, "hachiko").setScale(.14);

    //< NEED TO MAKE THIS.PLAYER >
    this.player = this.physics.add.sprite(200, 200, "player");
    this.player.setCollideWorldBounds(true);

    // make platform and player collid
    this.physics.add.collider(this.player, this.platforms);

    // make dog items collectable
    this.physics.add.overlap(
      this.player,
      this.dogBone,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogBowl,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogCollar,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogToy,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogPicture,
      this.collectDogItem,
      null,
      this
    );
  }

  update (time, delta) {

  }
  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
    dogItem.disableBody(true, true);
    this.itemsCollected += 1;
  }
}
