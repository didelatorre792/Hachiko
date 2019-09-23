export default class BootScene extends Phaser.Scene {

  preload () {
    // Preload assets
    this.load.image('logo', './assets/logo.png');
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
    this.load.image("dogBone", "./assets/images/bone.png");
    this.load.image("dogBowl", "./assets/images/dogBowl.png");
    this.load.image("dogCollar", "./assets/images/dogCollar.png");
    this.load.image("thug", "./assets/images/thug.png");

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

  }

  create (data) {
    //Create the scene
    var logo = this.add.image(this.centerX, this.centerY, 'logo');
    // whole scene shows
    //this.background = this.add.image(400, 294, "background");
    //this.background.setScale(0.34);
    this.cameras.main.setBounds(4000, 0);
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)

    // neighborhood
    this.car1 = this.add.image(240, 540, "car1");
    this.car1.setScale(2);
    this.car2 = this.add.image(800, 540, "car2");
    this.car2.setScale(.4);
    this.mailbox1 = this.add.image(450, 485, "mailbox");
    this.mailbox1.setScale(.15);
    this.lamppost1 = this.add.image (550, 395, "lamppost");
    this.lamppost1.setScale(1.2);
    this.mailbox2 = this.add.image(1070, 485, "mailbox");
    this.mailbox2.setScale(.15);
    this.lamppost2 = this.add.image (1240, 395, "lamppost");
    this.lamppost2.setScale(1.2);
    this.dogBone = this.add.image(1350, 200, "dogBone");
    this.dogBone.setScale(.2);
    this.mailbox3 = this.add.image (1520, 485, "mailbox");
    this.mailbox3.setScale(.15);

    // alley
    this.trashcan1 = this.add.image(1650, 540, "trashcan");
    this.trashcan1.setScale(.3);
    this.trashcan2 = this.add.image(1720, 520, "trashcan");
    this.trashcan2.setScale(.5);
    this.sign1 = this.add.image(1850, 350, "sign1");
    this.sign1.setScale(.4);
    this.dogBowl = this.add.image(1950, 270, "dogBowl");
    this.dogBowl.setScale(.2);
    this.dogCollar = this.add.image(2050, 550, "dogCollar");
    this.dogCollar.setScale(.25);
    this.dumpster = this.add.image(2200, 480, "dumpster");
    this.dumpster.setScale();
    this.trashcan3 = this.add.image(2450, 540, "trashcan");
    this.trashcan3.setScale(.3);
    this.sign2 = this.add.image(2630, 420, "sign2");
    this.sign2.setScale(.4);
    this.thug1 = this.add.image(2640, 525, "thug");
    this.thug1.setScale(.08);
    this.thug2 = this.add.image(3100, 510, "thug");
    this.thug2.setScale(.1);
    this.thug2 = this.add.image(3250, 505, "thug");
    this.thug2.setScale(.11);







  }

  update (time, delta) {

  }
}
