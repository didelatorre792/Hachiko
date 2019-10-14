export default class MasterFile extends Phaser.Scene {
  constructor () {
    super('MasterFile');
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    //camera

    this.scrollCam = this.cameras.main.setBounds(0, 0, 4700, 300);

    //this.scrollCam = this.cameras.main.setBounds(0,0, 3000, 300);
    this.scrollCam.scrollX = 0;

    //background
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)


    //building the scene
    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();
    // neighborhood
    //this.car1 = this.add.image(240, 540, "car1").setScale(2);
    //this.box1 = this.platforms.create(220, 530, "box"); this.box1.alpha = 0;
    this.mailbox1 = this.add.image(442, 475, "mailbox").setScale(.08);
    this.box2 = this.platforms.create(437, 440, "box").setSize(40,10); this.box2.alpha = 0;
    this.lamppost1 = this.add.image(550, 408, "lamppost").setScale(.085);
    this.box3 = this.platforms.create(492, 300, "box").setSize(18, 8); this.box3.alpha = 0;
    this.box4 = this.platforms.create(610, 300, "box").setSize(18, 8); this.box4.alpha = 0;
    this.car2 = this.add.image(900, 530, "car2").setScale(.4);
    this.box5 = this.platforms.create(940, 494, "box").setSize(135); this.box5.alpha = 0;
    this.mailbox2 = this.add.image(1067, 475, "mailbox").setScale(.08);
    this.box6 = this.platforms.create(1062, 440, "box").setSize(40, 10); this.box6.alpha = 0;
    this.lamppost2 = this.add.image(1400, 408, "lamppost").setScale(.085);
    this.box7 = this.platforms.create(1342, 300, "box").setSize(18, 8); this.box7.alpha = 0;
    this.box8 = this.platforms.create(1460, 300, "box").setSize(18, 8); this.box8.alpha = 0;
    this.collectables.create(1436, 188, "dogBone").setScale(.2).setSize(42, 15).setPosition(1350, 150);
    this.mailbox3 = this.add.image(1517, 485, "mailbox").setScale(.062);
    this.box9 = this.platforms.create(1515, 457, "box").setSize(30, 10); this.box9.alpha = 0;

    // alley
    this.trashcan1 = this.add.image(1650, 540, "trashcan").setScale(.08);
    this.box10 = this.platforms.create(1650, 540, "box").setSize(40, 60); this.box10.alpha = 0;
    this.trashcan2 = this.add.image(1720, 520, "trashcan").setScale(.12);
    this.box11 = this.platforms.create(1720, 520, "box").setSize(60, 90); this.box11.alpha = 0;

    this.sign1 = this.add.image(1850, 350, "sign1").setScale(.1);
    this.box12 = this.platforms.create(1850, 364, "box").setSize(70, 30); this.box12.alpha = 0;
    this.collectables.create(1700, 250, "dogBowl").setScale(.2).setSize(42, 25).setPosition(1610, 160);
    this.collectables.create(2092, 244, "dogCollar").setScale(.1).setSize(45, 30).setPosition(2010, 160);
    this.dumpster = this.add.image(2200, 480, "dumpster").setScale(.26);
    this.box13 = this.platforms.create(2200, 520, "box").setSize(150, 110); this.box13.alpha = 0;
    this.box14 = this.platforms.create(2200, 417, "box").setSize(110, 60); this.box14.alpha = 0;
    this.trashcan3 = this.add.image(2450, 540, "trashcan").setScale(.08);
    this.box15 = this.platforms.create(2450, 540, "box").setSize(40, 60); this.box15.alpha = 0;
    this.sign2 = this.add.image(2630, 444, "sign2").setScale(.08);
    this.box16 = this.platforms.create(2630, 455, "box").setSize(60, 20); this.box16.alpha = 0;
    this.makeEnemy(2440, 525, "thug", .08);
    // this.tweens.add({
    //    targets: e1,
    //    x: 2400,
    //    y: 525,
    //    ease: "Linear",
    //    delay: 400,
    //    duration: 2000,
    //    yoyo: true,
    //    repeat: -1
    this.makeEnemy(2100, 510, "thug", .1);
    // this.tweens.add({
    //     targets: e2,
    //     x: 2100,
    //     y: 510,
    //     ease: "Linear",
    //     delay: 400,
    //     duration: 2000,
    //     yoyo: true,
    //     repeat: -1
    this.makeEnemy(2850, 505, "thug", .11);
    // this.tweens.add({
    //     targets: e3,
    //     x: 2850,
    //     y: 505,
    //     ease: "Linear",
    //     delay: 400,
    //     duration: 2000,
    //     yoyo: true,
    //     repeat: -1
    this.trashcan4 = this.add.image(3450, 540, "trashcan").setScale(.08);
    this.box16 = this.platforms.create(3450, 540, "box").setSize(40, 60); this.box16.alpha = 0;
    this.collectables.create(3800, 777, "dogToy").setScale(.04).setSize(26, 35).setPosition(3320, 260);

    // park

    this.collectables.create(3997, 575, "dogPicture").setScale(0.07).setSize(50, 70).setPosition(3660, 100);
    this.trashcan4 = this.add.image(3650, 545, "trashcan").setScale(.12);
    this.box17 = this.platforms.create(3650, 543, "box").setSize(60, 90); this.box17.alpha = 0;
    this.lamppost3 = this.add.image(3800, 463, "lamppost").setScale(.097);
    this.box18 = this.platforms.create(3733, 340, "box").setSize(22, 9); this.box18.alpha = 0;
    this.box19 = this.platforms.create(3868, 340, "box").setSize(22, 9); this.box19.alpha = 0;
    //this.dogPicture =     this.collectables.create(3997, 575, "dogPicture").setScale(0.07).setSize(50, 70).setPosition(3660, 100);
    //this.trashcan4 = this.add.image(3650, 545, "trashcan").setScale(.5);
    //this.box17 = this.platforms.create(3650, 543, "box").setSize(60, 90); this.box17.alpha = 0;
    //this.lamppost3 = this.add.image(3800, 463, "lamppost").setScale(1.2);
    //this.box18 = this.platforms.create(3760, 342, "box").setSize(10,10); this.box18.alpha = 0;
    //this.box19 = this.platforms.create(3830, 345, "box").setSize(40, 10); this.box19.alpha = 0;
    this.bench = this.add.image(4000, 520, "bench").setScale(.8);
    this.box20 = this.platforms.create(3996, 490, "box").setSize(189, 5); this.box20.alpha = 0;
    this.tree = this.add.image(4300, 400, "tree").setScale(.5);
    this.box21 = this.platforms.create(4300, 390, "box").setSize(250, 5); this.box21.alpha = 0;
    // boss
    this.makeEnemy(4740, 470, "thug", .2);
    // this.tweens.add({
    //     targets: e4,
    //     x: 4740,
    //     y: 470,
    //     ease: "Linear",
    //     delay: 400,
    //     duration: 2000,
    //     yoyo: true,
    //     repeat: -1

    this.hachiko = this.physics.add.image(4700, 600, "hachiko").setScale(.14);
    this.hachiko.setCollideWorldBounds(true);

    //player
    this.player = this.physics.add.sprite(50, 500, "player").setScale(.3);
    this.player.setCollideWorldBounds(true);
    this.player.setActive(true);


    //this.hachiko = this.physics.add.image(4700, 590, "hachiko").setScale(.14);
    //this.hachiko.setCollideWorldBounds(true);

    //tweens
    // this.tweens.add({
    //    targets: e1,
    //    x: 500,
    //    y: 500,
    //    ease: "Linear",
    //    delay: 1000,
    //    duration: 1000,
    //    yoyo: true,
    //    repeat: -1

    // this.tweens.add({
    //     targets: e2,
    //     x: 500,
    //     y: 500,
    //     ease: "Linear",
    //     delay: 1000,
    //     duration: 1000,
    //     yoyo: true,
    //     repeat: -1

    // this.tweens.add({
    //     targets: e3,
    //     x: 500,
    //     y: 500,
    //     ease: "Linear",
    //     delay: 1000,
    //     duration: 1000,
    //     yoyo: true,
    //     repeat: -1

    // this.tweens.add({
    //     targets: e4,
    //     x: 500,
    //     y: 500,
    //     ease: "Linear",
    //     delay: 1000,
    //     duration: 1000,
    //     yoyo: true,
    //     repeat: -1






    //player
    //this.player = this.physics.add.sprite(60, 550, "alien");
    //this.player.setCollideWorldBounds(true);
    //gun
    this.nerf = this.add.sprite(100,520, "nerf");
    this.nerf.setScale(.03);
    //Gun and Bullets
    var bullets;
    var enemyBullets;

    this.nextFire = 0;
    this.fireRate = 200;
    this.speed = 1000;

    this.bullets = this.physics.add.group({
      defaultKey:"bullet",
      maxSize: 10
    });

    this.enemyBullets = this.physics.add.group({
      defaultKey:"bullet",
      maxSize: 10
    });

    //to shoot
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    // make platform and player collid
    this.physics.add.collider(this.player, this.platforms);

    //if hachiko and player touch
    this.physics.add.overlap(this.player, this.hachiko, this.gotHachiko, null, this);

    //collectables
    this.itemsCollected = 0;
    this.physics.add.overlap(this.player, this.collectables, this.collectDogItem, null, this);

    //conditions and health variables
    var condition;
    var gunDir;
    this.health = 500;
    var scoreFormated = this.zeroPad(this.health, 6);


  }

  update (time, delta) {




    this.healthLabel = this.add.text(this.scrollCam.worldView.x, 5,"SCORE: " + this.scoreFormated);

    // if player is on screen, enemy shoot

    //Space bar to shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot(this.gunDir);
    }

    //Scrolling screen
    this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 4700, 550);
    //this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 3000, 550);
    this.scrollCam.scrollX += 1.25;

    //If player is off screen. LOSE condition
    if(this.player.x < this.scrollCam.worldView.x - 75){
      this.condition = 'Lose';
      this.scene.start('EndScene', {condition: this.condition, itemsCollected: this.itemsCollected});
      //this.scene.start('EndScene', {condition: this.condition});
    }

    //If player has below 0 health. LOSE condition
    if (this.health < 0){
      this.condition = 'Lose';
      this.scene.start('EndScene', {condition: this.condition, itemsCollected: this.itemsCollected});

      //this.scene.start('EndScene', {condition: this.condition});

    }

    //Create cursor keys and assign events
    var cursors = this.input.keyboard.createCursorKeys();
    var velocity = -400;
    var stopped = 0;

    //moving with velocity and the gun
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
      this.nerf.y = this.player.y;
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(400);
      this.nerf.y = this.player.y;
    }
    if (cursors.up.isUp) {
      this.nerf.y = this.player.y;
    }
    if (this.nerf.x < this.scrollCam.worldView.x - 5){
      this.nerf.x = this.player.x + 10;
    }

    //enemy detection again player
    this.enemyGroup.children.each(
      function(e){
        if (e.active){
          this.physics.add.collider(
            e,
            this.player,
            this.takeDamage,
            null,
            this
          );
        }
      }.bind(this)//for can't read property 'physics' of undefined
    );



    //bullets detection
    this.bullets.children.each(
      function(b){
        if (b.active){
          this.physics.add.collider(
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

    this.enemyBullets.children.each(
      function(b){
        if (b.active){
          this.physics.add.collider(
            b,
            this.player,
            this.takeDamage,
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

    this.enemyGroup.children.each(
      function(e){
        if (e.active){
          if (Phaser.Math.Distance.Between(e.x,e.y,this.player.x,this.player.y) < 300){
            console.log("woo");
            this.enemyShoot(this.player.x, this.player.y, e);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined

    );
  }

  enemyShoot(playerX, playerY, e){
    var betweenPoints = Phaser.Math.Angle.BetweenPoints;
    var angle = betweenPoints(e, this.player);
    //var angle = betweenPoints(e,this.player);

    var velocityFromRotation = this.physics.velocityFromRotation;
    var velocity = new Phaser.Math.Vector2();
    velocityFromRotation(angle, -400, velocity);
    var bullet = this.enemyBullets.get();
    bullet.setAngle(Phaser.Math.RAD_TO_DEG * angle);
    //if (direction == 'Flip'){
    bullet//right
      .enableBody(true, e.x, e.y, true, true)
      .setVelocity(velocity.x, velocity.y);
  }

  //shooting the gun
  shoot(direction){
    var velocity = new Phaser.Math.Vector2();
    var bullet = this.bullets.get();
    if (direction == 'Flip'){
      bullet//right
        .enableBody(true, this.nerf.x, this.nerf.y, true, true)
        .setVelocity(velocity.x - 1000, velocity.y);
    }else if (direction == 'Reg') {
      bullet//left
        .enableBody(true, this.nerf.x, this.nerf.y, true, true)
        .setVelocity(velocity.x + 1000, velocity.y);
    }
  }

  //when hit by an enemy
  takeDamage(enemy, player){
    this.health -= 5;
    console.log(this.health, "health");
    //enemy.setImmovable();
    //enemy.setVelocity = -(player.velocity);
    //add a red tint later to indicate damage
  }

  //creating thugs
  makeEnemy(x, y, image, scale){
    this.thug = this.enemyGroup.create(x, y, image).setScale(scale).setCollideWorldBounds(true);
    var thug = this.thug;
    this.tweens.add({
        targets: thug,
        x: x,
        y: y,
        ease: "Linear",
        delay: 400,
        duration: 2000,
        yoyo: true,
        repeat: -1

  }

  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
  dogItem.disableBody(true, true);
  this.itemsCollected += 1;
  console.log(this.itemsCollected);
  }

  //winning condition
  gotHachiko(player, hachiko){
    this.condition = 'Win';
    this.scene.start('EndScene', {condition: this.condition, itemsCollected: this.itemsCollected});
    //this.scene.start('EndScene', {condition: this.condition});
  }

  //damaging the enemy
  hitEnemy (bullet, enemy) {
    //switch to health later
    console.log('hit');
    enemy.disableBody(true, true);
    bullet.disableBody(true, true);
  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

}
