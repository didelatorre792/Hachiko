export default class GameJam extends Phaser.Scene {
  constructor () {
    super('GameJam');
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    //camera
    this.cameras.main.setBounds(0, 0);

    //background
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)

    //building the scene
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
    this.trashcan4 = this.add.image(3450, 540, "trashcan");
    this.trashcan4.setScale(.3);
    this.dogToy = this.add.image(3320, 350, "dogToy");
    this.dogToy.setScale(.04);

    // park
    this.dogPicture = this.add.image(3660, 250, "dogPicture");
    this.dogPicture.setScale(.07);
    this.lamppost3 = this.add.image(3800, 463, "lamppost");
    this.lamppost3.setScale(1.2);
    this.bench = this.add.image(4000, 520, "bench");
    this.bench.setScale(.8);
    this.tree = this.add.image(4300, 400, "tree");
    this.tree.setScale(1.7);

    // boss
    this.bigThug = this.add.image(4740, 470, "thug");
    this.bigThug.setScale(.2);
    this.hachiko = this.add.image(4690, 550, "hachiko");
    this.hachiko.setScale(.14);
  }



}
