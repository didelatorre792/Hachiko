export default class NeighborhoodScene extends Phaser.Scene {
  constructor () {
    super('NeighborhoodScene');
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    this.neighborhoodMusic = this.sound.add("neighborhoodBackgroundMusic", {volume: 0.5});
    this.neighborhoodMusicConfig = {
      loop: true
    };
    this.neighborhoodMusic.play(this.neighborhoodMusicConfig);
    this.nerfShootSound = this.sound.add("nerfShoot");
    this.nerfShootSound.addMarker({
      name: 'nerfShootSound',
      start: 0.185,
      duration: 0.2
    });
    this.collectSound = this.sound.add("collect");
    this.collectSound.addMarker({
      name: "collectSound",
      start: 0.1,
      duration: 0.2
    });
    this.jumpSound = this.sound.add("jump");
    this.jumpSound.addMarker({
      name: "jumpSound",
      start: 0.1,
      duration: 0.3
    });
    this.alarmSound = this.sound.add("alarm", {volume: 0.001});
    this.alarmSound.addMarker({
      name: "alarmSound",
      start: 0,
      duration: 0.5,
    });

    //camera
    this.scrollCam = this.cameras.main.setBounds(0, 0, 3500, 600);
    this.scrollCam.scrollX = 0;
    this.i = 0;

    //background
    this.background = this.add.image(1750, 300, "neighborhood");
    this.background.alpha = 0.5;

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();

    //tutorial
    this.add.text(400, 450, "Use         to move").setStyle({fontSize: "30px", color: "#fff"});
    this.add.image(538, 450, "arrows");

    this.add.text(1100, 350, "Jump on platforms").setStyle({fontSize: "23px", color: "#fff"});
    this.add.image(1250, 400, "arrow2").setScale(0.1);
    this.car1 = this.add.image(1300, 490, "car1").setScale(.45);
    this.box1 = this.platforms.create(1320, 490, "box").setSize(155); this.box1.alpha = 0;
    this.box11 = this.platforms.create(1320, 460, "box").setSize(120, 20); this.box11.alpha = 0;
    this.box111 = this.platforms.create(1320, 440, "box").setSize(70, 20); this.box111.alpha = 0;

    this.mailbox1 = this.add.image(1742, 475, "mailbox").setScale(.08);
    this.box2 = this.platforms.create(1737, 440, "box").setSize(40,10); this.box2.alpha = 0;
    this.add.text(1700, 150, "Collect Hachikō's memory").setStyle({fontSize: "23px", color: "#fff"});
    this.add.image(1850, 200, "arrow2").setScale(0.1);
    this.collectables.create(2182, 494, "dogCollar").setScale(.05).setSize(30, 25).setPosition(1910, 250);

    // neighborhood platforms
    this.lamppost1 = this.add.image(2450, 408, "lamppost").setScale(.085);
    this.box3 = this.platforms.create(2392, 300, "box").setSize(18, 8); this.box3.alpha = 0;
    this.box4 = this.platforms.create(2510, 300, "box").setSize(18, 8); this.box4.alpha = 0;
    this.car2 = this.add.image(2700, 490, "car2").setScale(.45);
    this.box5 = this.platforms.create(2720, 510, "box").setSize(155); this.box5.alpha = 0;
    this.box55 = this.platforms.create(2720, 480, "box").setSize(120, 20); this.box55.alpha = 0;
    this.box555 = this.platforms.create(2720, 460, "box").setSize(70, 20); this.box555.alpha = 0;
    this.mailbox2 = this.add.image(2867, 475, "mailbox").setScale(.08);
    this.box6 = this.platforms.create(2862, 440, "box").setSize(40, 10); this.box6.alpha = 0;
    this.lamppost2 = this.add.image(3000, 408, "lamppost").setScale(.085);
    this.box7 = this.platforms.create(2942, 300, "box").setSize(18, 8); this.box7.alpha = 0;
    this.box8 = this.platforms.create(3060, 300, "box").setSize(18, 8); this.box8.alpha = 0;
    this.collectables.create(2766, 120, "dogBone").setScale(.2).setSize(42, 15).setPosition(2670, 50);
    this.mailbox3 = this.add.image(3317, 485, "mailbox").setScale(.062);
    this.box9 = this.platforms.create(3315, 457, "box").setSize(30, 10); this.box9.alpha = 0;
    this.add.text(3390, 400, "This way").setStyle({fontSize: "20px", color: "#fff"});
    this.add.image(3450, 450, "arrow3").setScale(.08);

    // bullet display
    this.bullet10 = this.add.image(718, 40, "bulletVertical").setScrollFactor(0);
    this.bullet9 = this.add.image(726, 40, "bulletVertical").setScrollFactor(0);
    this.bullet8 = this.add.image(734, 40, "bulletVertical").setScrollFactor(0);
    this.bullet7 = this.add.image(742, 40, "bulletVertical").setScrollFactor(0);
    this.bullet6 = this.add.image(750, 40, "bulletVertical").setScrollFactor(0);
    this.bullet5 = this.add.image(758, 40, "bulletVertical").setScrollFactor(0);
    this.bullet4 = this.add.image(766, 40, "bulletVertical").setScrollFactor(0);
    this.bullet3 = this.add.image(774, 40, "bulletVertical").setScrollFactor(0);
    this.bullet2 = this.add.image(782, 40, "bulletVertical").setScrollFactor(0);
    this.bullet1 = this.add.image(790, 40, "bulletVertical").setScrollFactor(0);

    // heart display
    this.heart9 = this.add.image(654, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart8 = this.add.image(671, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart7 = this.add.image(688, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart6 = this.add.image(705, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart5 = this.add.image(722, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart4 = this.add.image(739, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart3 = this.add.image(756, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart2 = this.add.image(773, 15, "heart").setScale(0.06).setScrollFactor(0);
    this.heart1 = this.add.image(790, 15, "heart").setScale(0.06).setScrollFactor(0);

    //player
    this.player = this.physics.add.sprite(350, 550, "player").setScale(.3);
    this.player.setCollideWorldBounds(true).setActive(true);

    //gun
    this.nerf = this.add.sprite(380, 560, "nerf");
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

    //health variables
    var gunDir;
    this.health = 10;
    // var scoreFormated = this.zeroPad(this.health, 3);
    // this.healthLabel = this.add.text(5, 5,"Health: " + scoreFormated);
    // this.healthLabel.setScrollFactor(0);
    this.add.image(200, 20, "dogCollar").setScale(.05).setScrollFactor(0).setTint(0);
    this.add.image(250, 15, "dogBone").setScale(.2).setScrollFactor(0).setTint(0);
    this.add.image(300, 20, "dogToy").setScale(.04).setScrollFactor(0).setTint(0);
    this.add.image(350, 20, "dogBowl").setScale(.18).setScrollFactor(0).setTint(0);
    this.add.image(410, 25, "dogToy3").setScale(0.3).setScrollFactor(0).setTint(0);
    this.add.image(455, 20, "dogToy2").setScale(0.3).setScrollFactor(0).setTint(0);
    this.add.image(500, 25, "dogPicture").setScale(0.1).setScrollFactor(0).setTint(0);
    this.add.image(550, 25, "dogToy4").setScale(0.02).setScrollFactor(0).setTint(0);

    this.bulletCount = 10;
  }

  update (time, delta) {
    // bullet display
    if (this.bulletCount == 9) {this.bullet10.destroy();}
    if (this.bulletCount == 8) {this.bullet9.destroy();}
    if (this.bulletCount == 7) {this.bullet8.destroy();}
    if (this.bulletCount == 6) {this.bullet7.destroy();}
    if (this.bulletCount == 5) {this.bullet6.destroy();}
    if (this.bulletCount == 4) {this.bullet5.destroy();}
    if (this.bulletCount == 3) {this.bullet4.destroy();}
    if (this.bulletCount == 2) {this.bullet3.destroy();}
    if (this.bulletCount == 1) {this.bullet2.destroy();}
    if (this.bulletCount == 0) {this.bullet1.destroy();}

    //Space bar to shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.bulletCount <= 0){
        console.log("no more bullets");
      }
      else{
        this.shoot(this.gunDir);
        this.nerfShootSound.play("nerfShootSound");
      }
    }
    //Scrolling screen
    this.physics.world.setBounds(0, 0, this.scrollCam.scrollX + 800, 550);
    this.scrollCam.scrollX += 2;


    // warning for player is going off screen
    if (this.i == 0 && (this.player.x < this.scrollCam.scrollX + 60) && (this.player.x > this.scrollCam.scrollX + 58)) {
      this.i += 1;
      this.alarmSound.play("alarmSound");
      // this.flashCamera = this.cameras.add(0, 0, 800, 600);
      // this.flashCamera.flash(1000, 50, 10, 10, 10, 10);
      this.text2 = this.add.text(this.scrollCam.scrollX + 300, 300, "MOVE RIGHT").setStyle({fontSize: "50px", color: "#f44A48"});
      this.time.addEvent({delay:200, callback: this.warning, callbackScope: this}); // destroy text
      // so the warning only happens every so often
      this.time.addEvent({
        delay:450,
        callback: this.removei,
        callbackScope: this,
      });
    };

    //If player is off screen
    if(this.player.x < this.scrollCam.scrollX - 10){
      this.neighborhoodMusic.stop(this.neighborhoodMusicConfig);
      this.alarmSound.stop();
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected});
      //console.log("death by scroll")
    }

    //Create cursor keys and assign events
    var cursors = this.input.keyboard.createCursorKeys();
    var velocity = -400;
    var stopped = 0;

    //moving with velocity and the gun
     if (cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.nerf.x = this.player.x - 35;
      this.player.anims.play("walk", true);
      this.player.flipX = true;
      this.nerf.flipX = true;
      this.gunDir = "Flip";
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.nerf.x = this.player.x + 35;
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
      this.jumpSound.play("jumpSound");
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(400);
      this.nerf.y = this.player.y + 35;
      this.player.anims.play("crouch", true);

    }
    if (cursors.up.isUp) {
      this.nerf.y = this.player.y + 15;
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
            //console.log("woo");
            this.enemyShoot(this.player.x, this.player.y, e);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined
    );
    if (this.player.x > 3450) {
      this.position = this.player.x;
      // alarm stop, screen normal
      this.neighborhoodMusic.stop(this.neighborhoodMusicConfig);
      this.y = this.player.y;
      this.scene.start('AlleyScene', {health: this.health, itemsCollected: this.itemsCollected, dogCollarCollect: this.dogCollarCollect, dogBoneCollect: this.dogBoneCollect, y: this.y});
      //console.log("scene switch")
      //console.log("player x in scene 1: ", this.player.x)
    }
  }

  //shooting the gun
  shoot(direction){
    this.bulletCount -= 1;
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
    //this.collectedText.text = "Memories: " + this.itemsCollected;
    console.log(this.player.x)
    if (this.player.x < 1900 && this.player.x > 1800) {
      this.add.image(200, 20, "dogCollar").setScale(.05).setScrollFactor(0);
      this.dogCollarCollect = true;
    } if (this.player.x < 2700 && this.player.x > 2600) {
      this.add.image(250, 15, "dogBone").setScale(.2).setScrollFactor(0);
      this.dogBoneCollect = true;
    }
    this.collectSound.play("collectSound");
  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  warning() {
    this.text2.destroy();
  }
  removei() {
    this.i -= 1;
  }
}
