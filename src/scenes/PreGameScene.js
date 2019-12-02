export default class PreGameScene extends Phaser.Scene {
  constructor () {
    super('PreGameScene');
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    //camera
    this.scrollCam = this.cameras.main.setBounds(0, 0, 12890, 600);
    this.scrollCam.scrollX = 12890;


    //building the scene, before 4695
    this.neighborhood = this.add.image(1750, 300, "neighborhood"); //3500 wide
    //this.neighbrohood.alpha = 0.5;
    this.alley = this.add.image(5200, 300, "alley"); //3400 wide
    //this.alley.alpha = 0.5;
    this.toyShop = this.add.image(8650, 300, "toyShop"); //3500 wide
    //this.toyShop.alpha = 0.5;
    this.park = this.add.image(11645, 300, "park"); //2490 wide
    //this.park.alpha = 0.5;

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.staticGroup();

    // neighborhood
    this.lamppost1 = this.add.image(2450, 408, "lamppost").setScale(.085);
    this.car2 = this.add.image(2700, 490, "car2").setScale(.45);
    this.mailbox2 = this.add.image(2867, 475, "mailbox").setScale(.08);
    this.lamppost2 = this.add.image(3000, 408, "lamppost").setScale(.085);
    this.collectables.create(2766, 120, "dogBone").setScale(.2).setSize(42, 15).setPosition(2670, 50);
    this.mailbox3 = this.add.image(3317, 485, "mailbox").setScale(.062);

    // alley
    this.trashcan1 = this.add.image(4950, 540, "trashcan").setScale(.08);
    this.trashcan2 = this.add.image(5020, 520, "trashcan").setScale(.12);
    this.sign1 = this.add.image(5150, 350, "sign1").setScale(.1);
    this.collectables.create(5100, 1000, "dogToy").setScale(.04).setSize(29, 35).setPosition(5620, 530);
    this.dumpster = this.add.image(5500, 480, "dumpster").setScale(.26);
    this.trashcan3 = this.add.image(5750, 540, "trashcan").setScale(.08);
    this.sign2 = this.add.image(5930, 444, "sign2").setScale(.08);
    this.sign3 = this.add.image(6250, 370, "sign3").setScale(.1);
    this.collectables.create(6640, 305, "dogBowl").setScale(.2).setSize(42, 25).setPosition(3050, 240);
    this.makeEnemy(5100, 530, .3);
    this.makeEnemy(5600, 530, .3);
    this.makeEnemy(5890, 515, .3);
    this.makeEnemy(6350, 505, .3);
    this.makeEnemy(6600, 505, .3);

    // toy shop scene
    this.collectables.create(7535, 365, "dogToy3").setScale(.3).setSize(35, 35).setPosition(7465, 315);
    this.add.image(8690, 490, "blocks").setScale(0.1);
    this.add.image(8870, 350, "lego").setScale(.07);
    this.platforms.create(9240, 235, "boxCopy3")
    this.collectables.create(9285, 410, "dogToy2").setScale(.3).setSize(15, 25).setPosition(9250, 375);

    // park
    this.collectables.create(11032, 250, "dogPicture").setScale(0.1).setSize(35, 45).setPosition(10880, 50);
    this.trashcan4 = this.add.image(10850, 485, "trashcan").setScale(.12);
    this.lamppost3 = this.add.image(11000, 403, "lamppost").setScale(.097);
    this.bench = this.add.image(11600, 470, "bench").setScale(.5);
    this.tree = this.add.image(12100, 350, "tree").setScale(.35);
    this.platforms.create(12100, 340, "boxCopy4");
    this.collectables.create(12805, 600, "dogToy4").setScale(0.02).setSize(20, 20).setPosition(1900, 100);
    this.makeEnemy(11400, 490, .3);
    this.makeEnemy(12050, 290, .3);
    this.makeEnemy(12550, 490, .3);
    this.makeEnemy(12600, 430, .7);
    this.hachiko = this.add.image(12700, 520, "hachiko").setScale(.2);

    //player
    this.player = this.add.sprite(350, 550, "player").setScale(.3);

    //gun
    this.nerf = this.add.sprite(380, 560, "nerf");
    this.nerf.setScale(.03);

    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

  }

  update (time, delta) {
    //Scrolling screen
    this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 12890, 550);

    this.time.addEvent({
      delay:800,
      callback: this.text1,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:1800,
      callback: this.text2,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:3000,
      callback:this.delay,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:14000,
      callback:this.story1,
      callbackScope: this,
    });


    this.time.addEvent({
      delay:16000,
      callback:this.story2,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:17000,
      callback:this.story3,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:18000,
      callback:this.story4,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:19000,
      callback:this.story5,
      callbackScope: this,
    });

    var cursors = this.input.keyboard.createCursorKeys();
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('NeighborhoodScene')
    }


  }

  text1(){
    this.add.text(12720, 380, "Hachikō").setStyle({fontSize: "30px", color: "#fff"});
    this.add.image(12740, 455, "arrow1").setScale(.15);
  }

  text2(){
    this.add.text(12375, 270, "Leader of thugs holding \nHachikō captive").setStyle({fontSize: "20px", color: "#fff"});
    this.add.image(12500, 355, "arrow2").setScale(.15);
  }

  story1(){
    this.add.text(240, 450, "You").setStyle({fontSize: "23px", color: "#fff"});
    this.add.image(290, 500, "arrow2").setScale(.1);
  }

  story2(){
    this.add.text(150, 160, "Hachikō has been taken by thugs!").setStyle({fontSize: "27px", color: "#000"});
  }

  story3(){
    this.add.text(230, 210, "They wiped his memory.").setStyle({fontSize: "27px", color: "#000"});
  }

  story4(){
    this.add.text(10, 260, "Collect all of his memories so he remembers you.").setStyle({fontSize: "27px", color: "#000"});
  }

  story5(){
    this.add.text(270, 350, "Press enter to start.").setStyle({fontSize: "20px", color: "#fff"});
  }


  delay(){
    this.scrollCam.scrollX -= 40;
  }

  //creating thugs
  makeEnemy(x, y, scale){
    this.thug = this.enemyGroup.create(x, y, "thug").setScale(scale);
  }
}
