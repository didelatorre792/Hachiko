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
    this.scrollCam = this.cameras.main.setBounds(0, 0, 9390, 600);
    this.scrollCam.scrollX = 9390;


    //building the scene
    this.background = this.add.image(4695, 300, "background");
    this.background.alpha = 0.5;
    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.staticGroup();
    // neighborhood
    this.car1 = this.add.image(1200, 490, "car1").setScale(.45);
    this.box1 = this.platforms.create(1220, 494, "box").setSize(135); this.box1.alpha = 0;
    this.mailbox1 = this.add.image(1842, 475, "mailbox").setScale(.08);
    this.box2 = this.platforms.create(1837, 440, "box").setSize(40,10); this.box2.alpha = 0;
    this.lamppost1 = this.add.image(2050, 408, "lamppost").setScale(.085);
    this.box3 = this.platforms.create(1992, 300, "box").setSize(18, 8); this.box3.alpha = 0;
    this.box4 = this.platforms.create(2110, 300, "box").setSize(18, 8); this.box4.alpha = 0;
    this.car2 = this.add.image(2700, 490, "car2").setScale(.45);
    this.box5 = this.platforms.create(2720, 494, "box").setSize(135); this.box5.alpha = 0;
    this.mailbox2 = this.add.image(2867, 475, "mailbox").setScale(.08);
    this.box6 = this.platforms.create(2862, 440, "box").setSize(40, 10); this.box6.alpha = 0;
    this.lamppost2 = this.add.image(3000, 408, "lamppost").setScale(.085);
    this.box7 = this.platforms.create(2942, 300, "box").setSize(18, 8); this.box7.alpha = 0;
    this.box8 = this.platforms.create(3060, 300, "box").setSize(18, 8); this.box8.alpha = 0;
    this.collectables.create(2766, 120, "dogBone").setScale(.2).setSize(42, 15).setPosition(2670, 50);
    this.mailbox3 = this.add.image(3317, 485, "mailbox").setScale(.062);
    this.box9 = this.platforms.create(3315, 457, "box").setSize(30, 10); this.box9.alpha = 0;

    // alley
    this.trashcan1 = this.add.image(5150, 540, "trashcan").setScale(.08);
    this.box10 = this.platforms.create(5150, 540, "box").setSize(40, 60); this.box10.alpha = 0;
    this.trashcan2 = this.add.image(5220, 520, "trashcan").setScale(.12);
    this.box11 = this.platforms.create(5220, 520, "box").setSize(60, 90); this.box11.alpha = 0;
    this.sign1 = this.add.image(5350, 350, "sign1").setScale(.1);
    this.box12 = this.platforms.create(5350, 364, "box").setSize(70, 30); this.box12.alpha = 0;
    this.collectables.create(5882, 344, "dogCollar").setScale(.05).setSize(30, 25).setPosition(5610, 100);
    this.collectables.create(6300, 1048, "dogToy").setScale(.04).setSize(29, 35).setPosition(5820, 530);
    this.dumpster = this.add.image(5700, 480, "dumpster").setScale(.26);
    this.box13 = this.platforms.create(5700, 520, "box").setSize(155, 110); this.box13.alpha = 0;
    this.box14 = this.platforms.create(5700, 417, "box").setSize(120, 50); this.box14.alpha = 0;
    this.trashcan3 = this.add.image(5950, 540, "trashcan").setScale(.08);
    this.box15 = this.platforms.create(5950, 540, "box").setSize(40, 60); this.box15.alpha = 0;
    this.sign2 = this.add.image(6130, 444, "sign2").setScale(.08);
    this.box16 = this.platforms.create(6130, 455, "box").setSize(60, 20); this.box16.alpha = 0;
    this.sign3 = this.add.image(6450, 270, "sign3").setScale(.1);
    this.box17 = this.platforms.create(6450, 270, "box").setSize(100, 25); this.box17.alpha = 0;
    this.collectables.create(6840, 105, "dogBowl").setScale(.2).setSize(42, 25).setPosition(6750, 15);
    this.makeEnemy(5600, 530, .3);
    this.makeEnemy(5890, 525, .3);
    this.makeEnemy(6350, 505, .3);

    // park
    this.collectables.create(7817, 525, "dogPicture").setScale(0.07).setSize(50, 70).setPosition(7480, 50);
    this.trashcan4 = this.add.image(7550, 545, "trashcan").setScale(.12);
    this.box17 = this.platforms.create(7550, 543, "box").setSize(60, 90); this.box17.alpha = 0;
    this.lamppost3 = this.add.image(7700, 463, "lamppost").setScale(.097);
    this.box18 = this.platforms.create(7633, 340, "box").setSize(22, 9); this.box18.alpha = 0;
    this.box19 = this.platforms.create(7768, 340, "box").setSize(22, 9); this.box19.alpha = 0;
    this.bench = this.add.image(7900, 470, "bench").setScale(.5);
    this.box20 = this.platforms.create(7896, 470, "box").setSize(202, 5); this.box20.alpha = 0;
    this.tree = this.add.image(8200, 350, "tree").setScale(.35);
    this.box21 = this.platforms.create(8200, 340, "box").setSize(250, 5); this.box21.alpha = 0;

    // boss
    this.makeEnemy(8950, 470, .7);

    this.hachiko = this.add.image(9000, 540, "hachiko").setScale(.2);

    //player
    this.player = this.add.sprite(250, 510, "player").setScale(.3);

    //gun
    this.nerf = this.add.sprite(280, 520, "nerf");
    this.nerf.setScale(.03);

    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

  }

  update (time, delta) {
    //Scrolling screen
    this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 9390, 550);
    //this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 3000, 550);

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
      delay:13000,
      callback:this.story,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:14000,
      callback:this.story1,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:15000,
      callback:this.story2,
      callbackScope: this,
    });

    this.time.addEvent({
      delay:16000,
      callback:this.story3,
      callbackScope: this,
    });

    var cursors = this.input.keyboard.createCursorKeys();
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('NeighborhoodScene')
    }


  }

  text1(){
    this.add.text(9000, 400, "Hachikō").setStyle({fontSize: "30px", color: "#000"});
    this.add.image(9040, 475, "arrow1").setScale(.2);
  }

  text2(){
    this.add.text(8735, 290, "Leader of thugs holding \nHachikō captive").setStyle({fontSize: "20px", color: "#000"});
    this.add.image(8860, 375, "arrow2").setScale(.2);
  }

  story(){
    this.add.text(120, 250, "Hachikō has been taken by thugs!").setStyle({fontSize: "30px", color: "#000"});
  }

  story1(){
    this.add.text(190, 300, "He has forgotten his past.").setStyle({fontSize: "30px", color: "#000"});
  }

  story2(){
    this.add.text(10, 350, "Collect all of his memories so he remembers you.").setStyle({fontSize: "27px", color: "#000"});
  }

  story3(){
    this.add.text(250, 400, "Press enter to start.").setStyle({fontSize: "20px", color: "#000"});
  }

  //sceneChange(){
  //  this.scene.start('NeighborhoodScene');
  //}

  delay(){
    this.scrollCam.scrollX -= 35;
  }

  //creating thugs
  makeEnemy(x, y, scale){
    this.thug = this.enemyGroup.create(x, y, "thug").setScale(scale);
  }
}
