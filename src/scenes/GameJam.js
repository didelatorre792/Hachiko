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
    //this.cameras.main.setBounds(0, 0);
    this.scrollCam = this.cameras.main.setBounds(0,0, 3000, 300);
    this.scrollCam.scrollX = 0;
    //this.scrollCam.setBoundsCollision();

    // this.physics.world.setBounds(this.scrollCam.worldView.x, this.scrollCam.worldView.y, this.scrollCam.worldView.x + 800, this.scrollCam.worldView.y + 550);
    // console.log(this.scrollCam.worldView.x, this.scrollCam.worldView.y);

    //background
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)

    //building the scene
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    // neighborhood
    this.car1 = this.add.image(240, 540, "car1").setScale(2);
    this.box1 = this.platforms.create(220, 530, "box"); this.box1.alpha = 0;
    this.mailbox1 = this.add.image(445, 475, "mailbox").setScale(.2);
    this.box2 = this.platforms.create(437, 440, "box").setSize(40,10); this.box2.alpha = 0;
    this.lamppost1 = this.add.image(550, 408, "lamppost").setScale(1.1);
    this.box3 = this.platforms.create(514, 295, "box").setSize(10,10); this.box3.alpha = 0;
    this.box4 = this.platforms.create(580, 300, "box").setSize(40, 10); this.box4.alpha = 0;
    this.car2 = this.add.image(800, 540, "car2").setScale(.4);
    this.box5 = this.platforms.create(840, 504, "box").setSize(135); this.box5.alpha = 0;
    this.mailbox2 = this.add.image(1070, 475, "mailbox").setScale(.2);
    this.box6 = this.platforms.create(1062, 440, "box").setSize(40, 10); this.box6.alpha = 0;
    this.lamppost2 = this.add.image(1240, 408, "lamppost").setScale(1.1);
    this.box7 = this.platforms.create(1204, 298, "box").setSize(10,10); this.box7.alpha = 0;
    this.box8 = this.platforms.create(1270, 300, "box").setSize(40, 10); this.box8.alpha = 0;
    this.collectables.create(1436, 188, "dogBone").setScale(.2).setSize(42, 15).setPosition(1350, 150);
    this.mailbox3 = this.add.image(1520, 485, "mailbox").setScale(.15);
    this.box9 = this.platforms.create(1515, 457, "box").setSize(30, 10); this.box9.alpha = 0;

    // alley
    this.trashcan1 = this.add.image(1650, 540, "trashcan").setScale(.3);
    this.box10 = this.platforms.create(1650, 540, "box").setSize(40, 60); this.box10.alpha = 0;
    this.trashcan2 = this.add.image(1720, 520, "trashcan").setScale(.5);
    this.box11 = this.platforms.create(1720, 520, "box").setSize(60, 90); this.box11.alpha = 0;
    this.sign1 = this.add.image(1850, 350, "sign1").setScale(.4);
    this.box12 = this.platforms.create(1850, 358, "box").setSize(70, 42); this.box12.alpha = 0;
    this.collectables.create(1700, 250, "dogBowl").setScale(.2).setSize(42, 25).setPosition(1610, 160);
    this.collectables.create(2092, 244, "dogCollar").setScale(.25).setSize(35, 30).setPosition(2010, 160);
    this.dumpster = this.add.image(2200, 480, "dumpster");
    this.box13 = this.platforms.create(2200, 520, "box").setSize(150, 110); this.box13.alpha = 0;
    this.box14 = this.platforms.create(2200, 417, "box").setSize(110, 60); this.box14.alpha = 0;
    this.trashcan3 = this.add.image(2450, 540, "trashcan").setScale(.3);
    this.box15 = this.platforms.create(2450, 540, "box").setSize(40, 60); this.box15.alpha = 0;
    this.sign2 = this.add.image(2630, 420, "sign2").setScale(.4);
    this.box16 = this.platforms.create(2630, 430, "box").setSize(40, 30); this.box16.alpha = 0;
    // this.thug1 = this.platforms.create(2640, 525, "thug").setScale(.08);
    //this.thug2 = this.platforms.create(3100, 510, "thug").setScale(.1);
    //this.thug3 = this.platforms.create(3250, 505, "thug").setScale(.11);
    this.trashcan4 = this.add.image(3450, 540, "trashcan").setScale(.3);
    this.box16 = this.platforms.create(3450, 540, "box").setSize(40, 60); this.box16.alpha = 0;
    this.collectables.create(3800, 777, "dogToy").setScale(.04).setSize(26, 35).setPosition(3320, 260);

    // park
    this.dogPicture =     this.collectables.create(3997, 575, "dogPicture").setScale(0.07).setSize(50, 70).setPosition(3660, 100);
    this.trashcan4 = this.add.image(3650, 545, "trashcan").setScale(.5);
    this.box17 = this.platforms.create(3650, 543, "box").setSize(60, 90); this.box17.alpha = 0;
    this.lamppost3 = this.add.image(3800, 463, "lamppost").setScale(1.2);
    this.box18 = this.platforms.create(3760, 342, "box").setSize(10,10); this.box18.alpha = 0;
    this.box19 = this.platforms.create(3830, 345, "box").setSize(40, 10); this.box19.alpha = 0;
    this.bench = this.add.image(4000, 520, "bench").setScale(.8);
    this.box20 = this.platforms.create(3996, 490, "box").setSize(189, 5); this.box20.alpha = 0;
    this.tree = this.add.image(4300, 400, "tree").setScale(1.7);
    this.box21 = this.platforms.create(4300, 390, "box").setSize(250, 5); this.box21.alpha = 0;
    // boss
    //this.bigThug = this.platforms.create(4740, 470, "thug").setScale(.2);
    this.hachiko = this.physics.add.image(4700, 590, "hachiko").setScale(.14);
    this.hachiko.setCollideWorldBounds(true);




    //player
    this.player = this.physics.add.sprite(60, 550, "alien");
    this.player.setCollideWorldBounds(true);
    //this.player.onWorldBounds = true;
    //this.player.setBounds(this.scrollCam.worldView.x, this.scrollCam.worldView.y);

    this.nerf = this.add.sprite(100,520, "nerf");
    this.nerf.setScale(.1);

    //Gun and Bullets
    var bullets;

    this.nextFire = 0;
    this.fireRate = 200;
    this.speed = 1000;

    this.bullets = this.physics.add.group({
      defaultKey:"bullet",
      maxSize: 10
    });


    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    // make platform and player collid
    this.physics.add.collider(this.player, this.platforms);

    //if hachiko and player touch
    this.physics.add.overlap(this.player, this.hachiko, this.gotHachiko, null, this);


    //collectables
    this.itemsCollected = 0;
    this.physics.add.overlap(this.player, this.collectables, this.collectDogItem, null, this);


    var condition;
    var gunDir;
  }

  update (time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot(this.gunDir);
    }

    this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 3000, 550);
    //console.log(this.scrollCam.worldView.x, this.scrollCam.worldView.y);

    this.scrollCam.scrollX += .5;

    //If player is off screen
    if(this.player.x < this.scrollCam.worldView.x - 75){
      this.condition = 'Lose';
      this.scene.start('EndScene', {condition: this.condition});
    }

    var speed = 4;

    //Create cursor keys and assign events
    var cursors = this.input.keyboard.createCursorKeys();

    var velocity = -400;
    var stopped = 0;
    //Create cursor keys and assign events

    if (cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.nerf.x = this.player.x - 40;
      this.player.anims.play("walk", true);
      this.player.flipX = true;
      this.nerf.flipX = true;
      this.gunDir = "Flip";
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.nerf.x = this.player.x + 40;
      this.player.anims.play("walk", true);
      this.player.flipX = false;
      this.nerf.flipX = false;
      this.gunDir = "Reg";
    } else {
      this.player.anims.play("idle", true);
      this.player.setVelocityX(0);
    }
    if (cursors.up.isDown){
      this.nerf.y = this.player.y;
    }
    if (cursors.up.isDown && this.player.body.onFloor())  {
      this.player.setVelocityY(-400);

      //this.player.setVelocityY(400);

      this.nerf.y = this.player.y;
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(400);
      this.nerf.y = this.player.y;
    }
    //Always move nerf to player's y position
    if (cursors.up.isUp) {
      this.nerf.y = this.player.y;
    }
    if (this.nerf.x < this.scrollCam.worldView.x - 5){
      this.nerf.x = this.player.x + 10;
    }

    // if (cursors.left.isDown) {
    //   this.player.x -= speed;
    //   this.nerf.x -= speed;
    //   this.player.anims.play("walk", true);
    //   this.player.flipX = true;
    //   this.nerf.flipX = true;
    //   this.gunDir = "Flip";
    // } else if (cursors.right.isDown) {
    //   this.player.x += speed;
    //   this.nerf.x += speed;
    //   this.player.anims.play("walk", true);
    //   this.player.flipX = false;
    //   this.nerf.flipX = false;
    //   this.gunDir = "Reg";
    // } else {
    //   this.player.anims.play("idle", true);
    // }
    // if (cursors.up.isDown) {
    //   this.player.y -= speed;
    //   this.nerf.y = this.player.y;//do if the button is let go
    // } else if (cursors.down.isDown) {
    //   this.player.y += speed;
    //   this.nerf.y = this.player.y;
    // }
    // if (cursors.up.isUp) {
    //   this.nerf.y = this.player.y;
    // }
    // if (this.nerf.x < this.scrollCam.worldView.x - 5){
    //   this.nerf.x = this.player.x + 10;
    // }


    //shooting
    this.bullets.children.each(
      function(b){
        if (b.active){
          this.physics.add.overlap(
            b,
            this.enemyGroup,
            this.hitEnemy,
            null,
            this
          );
          if (b.y < 0){
            b.setActive(false);
          }else if (b.y > this.cameras.main.height) {
            b.setActive(false);
          }else if(b.x <0){
            b.setActive(false);
          }else if (b.x > this.cameras.main.width) {
            b.setActive(false);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined
    );

  }

  shoot(direction){
    var velocity = new Phaser.Math.Vector2();
    var bullet = this.bullets.get();
    if (direction == 'Flip'){
      bullet//get nerf direction and + or - 1000
        .enableBody(true, this.nerf.x, this.nerf.y, true, true)
        .setVelocity(velocity.x - 1000, velocity.y);
    }else if (direction == 'Reg') {
      bullet//get nerf direction and + or - 1000
        .enableBody(true, this.nerf.x, this.nerf.y, true, true)
        .setVelocity(velocity.x + 1000, velocity.y);
    }

    // this.bullet.angle = this.bullet.body.angle;
  }


  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
  dogItem.disableBody(true, true);
  this.itemsCollected += 1;
  console.log(this.itemsCollected);
  }

  gotHachiko(player, hachiko){
    this.condition = 'Win';
    this.scene.start('EndScene', {condition: this.condition});
  }


}
