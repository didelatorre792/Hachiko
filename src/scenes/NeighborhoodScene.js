export default class NeighborhoodScene extends Phaser.Scene {
  constructor () {
    super('NeighborhoodScene');
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    //camera
    this.scrollCam = this.cameras.main.setBounds(0, 0, 1547, 300);
    this.scrollCam.scrollX = 0;

    //background
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();

    // neighborhood platforms
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

    //player
    this.player = this.physics.add.sprite(50, 500, "player").setScale(.3);
    this.player.setCollideWorldBounds(true);
    this.player.setActive(true);

    //gun
    this.nerf = this.add.sprite(100 ,520, "nerf");
    this.nerf.setScale(.03);
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
    console.log(this.player.x);
    if (this.player.x > 1545) {
      this.position = this.player.x;
      this.scene.start('AlleyScene', {health: this.health, itemsCollected: this.itemsCollected, scoreFormated: this.scoreFormated, position: this.position});
      console.log("scene switch")
      console.log("player x in scene 1: ", this.player.x)
    }

    this.healthLabel = this.add.text(this.scrollCam.worldView.x, 5,"SCORE: " + this.scoreFormated);

    //Space bar to shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot(this.gunDir);
    }

    //Scrolling screen
    this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 4800, 550);
    this.scrollCam.scrollX += 1.25;

    //If player is off screen. LOSE condition
    if(this.player.x < this.scrollCam.worldView.x - 75){
      this.condition = 'Lose';
      this.scene.start('EndScene', {condition: this.condition, itemsCollected: this.itemsCollected});
      console.log("death by scroll")
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

  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
  dogItem.disableBody(true, true);
  this.itemsCollected += 1;
  console.log(this.itemsCollected);
  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
}
