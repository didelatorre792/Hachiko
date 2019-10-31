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
    this.scrollCam = this.cameras.main.setBounds(0, 0, 7800, 600);
    this.scrollCam.scrollX = 7800;


    //building the scene
    this.background = this.add.image(3900, 300, "background");
    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.staticGroup();
    // neighborhood
    this.mailbox1 = this.add.image(842, 475, "mailbox").setScale(.08);
    this.box2 = this.platforms.create(837, 440, "box").setSize(40,10); this.box2.alpha = 0; //this.box2.setTint(#ed0e04);
    this.lamppost1 = this.add.image(1050, 408, "lamppost").setScale(.085);
    this.box3 = this.platforms.create(992, 300, "box").setSize(18, 8); this.box3.alpha = 0;
    this.box4 = this.platforms.create(1110, 300, "box").setSize(18, 8); this.box4.alpha = 0;
    this.car2 = this.add.image(1700, 490, "car2").setScale(.45);
    this.box5 = this.platforms.create(1720, 494, "box").setSize(135); this.box5.alpha = 0;
    this.mailbox2 = this.add.image(1867, 475, "mailbox").setScale(.08);
    this.box6 = this.platforms.create(1862, 440, "box").setSize(40, 10); this.box6.alpha = 0;
    this.lamppost2 = this.add.image(2000, 408, "lamppost").setScale(.085);
    this.box7 = this.platforms.create(1942, 300, "box").setSize(18, 8); this.box7.alpha = 0;
    this.box8 = this.platforms.create(2060, 300, "box").setSize(18, 8); this.box8.alpha = 0;
    this.collectables.create(1766, 120, "dogBone").setScale(.2).setSize(42, 15).setPosition(1670, 50);
    this.mailbox3 = this.add.image(2317, 485, "mailbox").setScale(.062);
    this.box9 = this.platforms.create(2315, 457, "box").setSize(30, 10); this.box9.alpha = 0;

    // alley
    this.trashcan1 = this.add.image(2950, 540, "trashcan").setScale(.08);
    this.box10 = this.platforms.create(2950, 540, "box").setSize(40, 60); this.box10.alpha = 0;
    this.trashcan2 = this.add.image(3020, 520, "trashcan").setScale(.12);
    this.box11 = this.platforms.create(3020, 520, "box").setSize(60, 90); this.box11.alpha = 0;
    this.sign1 = this.add.image(3150, 350, "sign1").setScale(.1);
    this.box12 = this.platforms.create(3150, 364, "box").setSize(70, 30); this.box12.alpha = 0;
    this.collectables.create(3682, 344, "dogCollar").setScale(.05).setSize(30, 25).setPosition(3410, 100);
    this.collectables.create(4100, 1048, "dogToy").setScale(.04).setSize(29, 35).setPosition(3620, 530);
    this.dumpster = this.add.image(3500, 480, "dumpster").setScale(.26);
    this.box13 = this.platforms.create(3500, 520, "box").setSize(155, 110); this.box13.alpha = 0;
    this.box14 = this.platforms.create(3500, 417, "box").setSize(120, 50); this.box14.alpha = 0;
    this.trashcan3 = this.add.image(3750, 540, "trashcan").setScale(.08);
    this.box15 = this.platforms.create(3750, 540, "box").setSize(40, 60); this.box15.alpha = 0;
    this.sign2 = this.add.image(3930, 444, "sign2").setScale(.08);
    this.box16 = this.platforms.create(3930, 455, "box").setSize(60, 20); this.box16.alpha = 0;
    this.sign3 = this.add.image(4250, 270, "sign3").setScale(.1);
    this.box17 = this.platforms.create(4250, 270, "box").setSize(100, 25); this.box17.alpha = 0;
    this.collectables.create(4640, 105, "dogBowl").setScale(.2).setSize(42, 25).setPosition(4550, 15);
    this.makeEnemy(3400, 515, "thug", .55);
    this.makeEnemy(3690, 500, "thug", .6);
    this.makeEnemy(4150, 495, "thug", .6);

    // park
    this.collectables.create(5917, 525, "dogPicture").setScale(0.07).setSize(50, 70).setPosition(5580, 50);
    this.trashcan4 = this.add.image(5650, 545, "trashcan").setScale(.12);
    this.box17 = this.platforms.create(5650, 543, "box").setSize(60, 90); this.box17.alpha = 0;
    this.lamppost3 = this.add.image(5800, 463, "lamppost").setScale(.097);
    this.box18 = this.platforms.create(5733, 340, "box").setSize(22, 9); this.box18.alpha = 0;
    this.box19 = this.platforms.create(5868, 340, "box").setSize(22, 9); this.box19.alpha = 0;
    this.bench = this.add.image(6000, 490, "bench").setScale(.5);
    this.box20 = this.platforms.create(5996, 490, "box").setSize(202, 5); this.box20.alpha = 0;
    this.tree = this.add.image(6300, 400, "tree").setScale(.5);
    this.box21 = this.platforms.create(6300, 390, "box").setSize(250, 5); this.box21.alpha = 0;
    // boss
    this.makeEnemy(7250, 470, "thug", .7);
    this.hachiko = this.add.image(7350, 550, "hachiko").setScale(.2);
    //player
    this.player = this.add.sprite(50, 500, "player").setScale(.3);
    //gun
    this.nerf = this.add.sprite(100,520, "nerf");
    this.nerf.setScale(.03);
  }

  update (time, delta) {
    //Scrolling screen
    this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 4700, 550);
    //this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 3000, 550);

    this.time.addEvent({
      delay:600,
      callback: this.text,
      callbackScope: this,
    })

    this.time.addEvent({
      delay:2000,
      callback:this.delay,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:7000,
      callback:this.story,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:8100,
      callback:this.story1,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:9000,
      callback:this.story2,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:13000,
      callback:this.sceneChange,
      callbackScope: this,
    });
  }

  story(){
    this.add.text(120, 250, "Hachikō has been taken by thugs!").setStyle({fontSize: "30px", color: "#000", align: "center"});
    //????new Phaser.Geom.Rectangle(50, 250, 400, 100);
  }

  story1(){
    this.add.text(190, 300, "He has forgotten his past.").setStyle({fontSize: "28px", color: "#000", align: "center"});
  }

  story2(){
    this.add.text(7, 350, "Collect all of his memories so he remebers you.").setStyle({fontSize: "28px", color: "#000", align: "center"});
  }

  text(){
    this.add.text(7380, 400, "Hachikō").setStyle({fontSize: "30px", color: "#000"});
    this.add.image(7385, 475, "arrow").setScale(.2);
  }

  sceneChange(){
    this.scene.start('TutorialScene');
  }

  delay(){
    this.scrollCam.scrollX -= 35;
  }

  //creating thugs
  makeEnemy(x, y, image, scale){
    this.thug = this.enemyGroup.create(x, y, image).setScale(scale);
  }
}
