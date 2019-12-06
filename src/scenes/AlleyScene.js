export default class AlleyScene extends Phaser.Scene {
  constructor () {
    super('AlleyScene');
  }
  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.itemsCollected = data.itemsCollected;
    this.dogCollarCollect = data.dogCollarCollect;
    this.dogBoneCollect = data.dogBoneCollect;
    this.y = data.y;
  }

  create(){
    this.health = 10;
    console.log("enter create");
    //music
    this.alleyMusic = this.sound.add("alleyBackgroundMusic");
    this.alleyMusic.addMarker({
      start: 0,
      duration: 20
    });
    this.alleyMusicConfig = {
      loop: true
    };
    this.alleyMusic.play(this.alleyMusicConfig);
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
    this.enemyGrunt = this.sound.add("enemyGrunt");
    this.girlOuch = this.sound.add("girlOuch");
    this.girlOuch.addMarker({
      name: "girlOuch",
      start: 3,
      duration: 1
    });
    this.alarmSound = this.sound.add("alarm", {volume: 0.05});
    this.alarmSound.addMarker({
      name: "alarmSound",
      start: 0,
      duration: 0.5,
      volume: 0.05
    });

    //camera
    this.scrollCam = this.cameras.main.setBounds(0, 0, 3400, 600);
    this.scrollCam.scrollX = 0;

    //background
    this.background = this.add.image(1700, 300, "alley");
    this.background.alpha = 0.5;

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.staticGroup();

    // Tutorial
    this.makeEnemy(1100, 600, .3, 50, 100, 1000, 500);
    this.add.text(300, 370, "Press space to shoot").setStyle({fontSize: "30px", color: "#fff"});
    // this.add.image(630, 450, "spacebar"); can't find one lol

    // alley platforms
    this.trashcan1 = this.add.image(1450, 540, "trashcan").setScale(.08);
    this.box10 = this.platforms.create(1450, 540, "box").setSize(40, 60); this.box10.alpha = 0;
    this.trashcan2 = this.add.image(1520, 520, "trashcan").setScale(.12);
    this.box11 = this.platforms.create(1520, 520, "box").setSize(60, 90); this.box11.alpha = 0;
    this.sign1 = this.add.image(1650, 350, "sign1").setScale(.1);
    this.box12 = this.platforms.create(1650, 364, "box").setSize(70, 30); this.box12.alpha = 0;
    this.collectables.create(2600, 1000, "dogToy").setScale(.04).setSize(29, 35).setPosition(2120, 530);
    this.dumpster = this.add.image(2000, 480, "dumpster").setScale(.26);
    this.box13 = this.platforms.create(2000, 520, "box").setSize(155, 110); this.box13.alpha = 0;
    this.box14 = this.platforms.create(2000, 417, "box").setSize(120, 50); this.box14.alpha = 0;
    this.trashcan3 = this.add.image(2250, 540, "trashcan").setScale(.08);
    this.box15 = this.platforms.create(2250, 540, "box").setSize(40, 60); this.box15.alpha = 0;
    this.sign2 = this.add.image(2430, 444, "sign2").setScale(.08);
    this.box16 = this.platforms.create(2430, 455, "box").setSize(60, 20); this.box16.alpha = 0;
    this.sign3 = this.add.image(2750, 370, "sign3").setScale(.1);
    this.box17 = this.platforms.create(2750, 370, "box").setSize(100, 25); this.box17.alpha = 0;
    this.collectables.create(3140, 305, "dogBowl").setScale(.2).setSize(42, 25).setPosition(3050, 240);

    // display collectables
    this.add.image(200, 20, "dogCollar").setScale(.05).setScrollFactor(0).setTint(0);
    this.add.image(250, 15, "dogBone").setScale(.2).setScrollFactor(0).setTint(0);
    this.add.image(300, 20, "dogToy").setScale(.04).setScrollFactor(0).setTint(0);
    this.add.image(350, 20, "dogBowl").setScale(.18).setScrollFactor(0).setTint(0);
    this.add.image(410, 25, "dogToy3").setScale(0.3).setScrollFactor(0).setTint(0);
    this.add.image(455, 20, "dogToy2").setScale(0.3).setScrollFactor(0).setTint(0);
    this.add.image(500, 25, "dogPicture").setScale(0.1).setScrollFactor(0).setTint(0);
    this.add.image(550, 25, "dogToy4").setScale(0.02).setScrollFactor(0).setTint(0);
    if (this.dogCollarCollect == true) {
      this.add.image(200, 20, "dogCollar").setScale(.05).setScrollFactor(0);
    }
    if (this.dogBoneCollect == true) {
      this.add.image(250, 15, "dogBone").setScale(.2).setScrollFactor(0);
    };

    //player
    this.player = this.physics.add.sprite(0, this.y, "player").setScale(.3);
    this.player.setCollideWorldBounds(true).setActive(true).setDepth(1);

    // enemies
    this.makeEnemy(1700, 630, .3, 50, 100, 1600, 530);
    this.makeEnemy(2200, 630, .3, 50, 100, 2100, 530);
    this.makeEnemy(2490, 615, .3, 50, 100, 2390, 515);
    this.makeEnemy(2950, 605, .3, 50, 100, 2850, 505);
    this.makeEnemy(3200, 605, .3, 50, 100, 3100, 505);

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

    //gun
    this.nerf = this.add.sprite(this.player.x + 10, 520, "nerf");
    this.nerf.setScale(.03);

    //bullets
    var bullets;
    var enemyBullets;
    this.nextFire = 0;
    this.fireRate = 200;
    this.speed = 1000;
    this.bullets = this.physics.add.group({
      defaultKey:"bullet",
      maxSize: 20
    });
    this.enemyBullets = this.physics.add.group({
      defaultKey:"bullet",
      maxSize: 100
    });

    //to shoot
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // make platform and player collid
    this.physics.add.collider(this.player, this.platforms);

    //if hachiko and player touch
    this.physics.add.overlap(this.player, this.hachiko, this.gotHachiko, null, this);

    //collectables
    this.physics.add.overlap(this.player, this.collectables, this.collectDogItem, null, this);

    var gunDir;
    this.bulletCount = 10;
    var deathScene;
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

    // heart display
    if (this.health == 9) {this.heart9.destroy();};
    if (this.health == 8) {this.heart8.destroy();};
    if (this.health == 7) {this.heart7.destroy();};
    if (this.health == 6) {this.heart6.destroy();};
    if (this.health == 5) {this.heart5.destroy();};
    if (this.health == 4) {this.heart4.destroy();};
    if (this.health == 3) {this.heart3.destroy();};
    if (this.health == 2) {this.heart2.destroy();};
    if (this.health == 1) {this.heart1.destroy();};

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
    this.time.addEvent({
      delay: 300,
      callback: this.delay,
      callbackScope: this,
      loop: false,
    });

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

    //If player has below 0 health
    if (this.health < 0){
      ////console.log("Negative health");
      this.alleyMusic.stop(this.alleyMusicConfig);
      this.alarmSound.stop();
      this.deathScene = "Alley";
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected, deathScene: this.deathScene});
    }

    //Create cursor keys and assign events
    var cursors = this.input.keyboard.createCursorKeys();

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
      this.jumpSound.play("jumpSound");
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(400);
      this.nerf.y = this.player.y + 30;
      this.player.anims.play("crouch", true);
    }
    if (cursors.up.isUp) {
      this.nerf.y = this.player.y;
    }
    //if (this.nerf.x < this.scrollCam.worldView.x - 5){
    //  this.nerf.x = this.player.x + 10;
   // }

   // console.log("Middle of update");
   // this.enemyGroup.children.each(
   //   function(b){
   //     if (b.active){
   //       console.log(b.x);
   //     }
   //   }.bind(this)//for can't read property 'physics' of undefined
   // );

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
          }else if(b.x < 0){
            b.setActive(false);
          }else if (b.x > this.scrollCam.scrollX + 800) {
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
            this.takeDamageFromEnemyBullets,
            null,
            this
          );
          if (b.y < 0){
            b.setActive(false);
          }else if (b.y > this.cameras.main.height) {
            b.setActive(false);
          }else if(b.x <0){
            b.setActive(false);
          }else if (b.x > this.scrollCam.scrollX) {
            b.setActive(false);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined
    );

    //enemy hits player
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

    this.enemyGroup.children.each(
      function(e){
        if (e.active){
          if (Phaser.Math.Distance.Between(e.x,e.y,this.player.x,this.player.y) < 300){
            this.enemyShoot(this.player.x, this.player.y, e);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined
    );
    if (this.player.x > 3350) {
      this.alleyMusic.stop(this.alleyMusicConfig);
      this.alarmSound.stop();
      this.y = this.player.y;
      this.scene.start('ToyShopScene', {health: this.health, itemsCollected: this.itemsCollected, dogCollarCollect: this.dogCollarCollect, dogBoneCollect: this.dogBoneCollect, dogToyCollect: this.dogToyCollect, dogBowlCollect: this.dogBowlCollect, y: this.y});
      //console.log("scene switch 2")
    };

    // console.log("Exiting update");
    // this.enemyGroup.children.each(
    //   function(b){
    //     if (b.active){
    //       console.log(b.x);
    //     }
    //   }.bind(this)//for can't read property 'physics' of undefined
    // );
  }

  delay(){
    console.log("enter delay");
    this.scrollCam.scrollX +=2;
    if(this.player.x < this.scrollCam.scrollX - 75){
      //console.log("Out of bounds", this.scrollCam.scrollX, this.player.x);
      this.alleyMusic.stop(this.alleyMusicConfig)
      this.deathScene = "Alley";
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected, deathScene: this.deathScene});
    }
  }

  enemyShoot(playerX, playerY, e){
    console.log("enter enemyShoot");
    var betweenPoints = Phaser.Math.Angle.BetweenPoints;
    var angle = betweenPoints(e, this.player);
    var velocityFromRotation = this.physics.velocityFromRotation;
    var velocity = new Phaser.Math.Vector2();
    velocityFromRotation(angle, 500, velocity);
    var bullet = this.enemyBullets.get();
    bullet.setAngle(Phaser.Math.RAD_TO_DEG * angle);
    //if (direction == 'Flip'){
    bullet//right
      .enableBody(true, e.x, e.y, true, true)
      .setVelocity(velocity.x, velocity.y);
  }

  //shooting the gun
  shoot(direction){
    console.log("enter shoot");
    this.bulletCount -= 1;
    var velocity = new Phaser.Math.Vector2();
    var bullet = this.bullets.get();
    if (direction == 'Flip'){
      bullet//right
        .enableBody(true, this.nerf.x, this.nerf.y, true, true)
        .setVelocity(velocity.x - 1000, velocity.y);
    } else if (direction == 'Reg') {
      bullet//left
        .enableBody(true, this.nerf.x, this.nerf.y, true, true)
        .setVelocity(velocity.x + 1000, velocity.y);
    }
  }

  //when hit by an enemy
  takeDamage(enemy, player){
    console.log("enter takeDamage");
    this.health -= 1;
    this.girlOuch.play("girlOuch");
    this.player.setTint(0xf44A48);
    this.time.addEvent({
      delay:400,
      callback: this.normalColor,
      callbackScope: this,
    });
    // var scoreFormatted = this.zeroPad(this.health, 3);
    // this.healthLabel.text = "Health: " + scoreFormatted;


  }

  takeDamageFromEnemyBullets(bullet, player){
    console.log("enter takeDamageFromEnemyBullets");
    this.health -= 1;
    this.girlOuch.play("girlOuch");
    this.player.setTint(0xf44A48);
    this.time.addEvent({
      delay:400,
      callback: this.normalColor,
      callbackScope: this,
    });
    bullet.disableBody(true, true);
    // var scoreFormatted = this.zeroPad(this.health, 3);
    // this.healthLabel.text = "Health: " + scoreFormatted;
    //console.log(this.health, "is current health");
    bullet.disableBody(true, true);
  }

  //creating thugs
  makeEnemy(x, y, scale, sizeX, sizeY, posX, posY){
    console.log("enter makeEnemy");
    this.thug = this.enemyGroup.create(x, y, "thug").setScale(scale).setActive(true).setSize(sizeX, sizeY).setPosition(posX, posY);
    //this.thug = this.enemyGroup.create(x, y, "thug").setScale(scale).setCollideWorldBounds(true).setActive(true);

    //console.log("enemy coordinates:", x, y);
    // var thug = this.thug;
    // this.tweens.add({
    //     targets: thug,
    //     x: x-50,
    //     y: y,
    //     ease: "Linear",
    //     delay: 2000,
    //     duration: 1500,
    //     yoyo: true,
    //     repeat: -1
    //   });
  }


  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
  dogItem.disableBody(true, true);
  this.itemsCollected += 1;
  //this.collectedText.text = "Memories: " + this.itemsCollected;
  console.log(this.player.x)
  if (this.player.x > 2100 && this.player.x < 2200) {
    this.add.image(300, 20, "dogToy").setScale(.04).setScrollFactor(0);
    this.dogToyCollect = true;
  } if (this.player.x > 2950 && this.player.x < 3050) {
    this.add.image(350, 20, "dogBowl").setScale(.18).setScrollFactor(0);
    this.dogBowlCollect = true;
  }
  this.collectSound.play("collectSound");
  }
//console.log
  //damaging the enemy
  hitEnemy (bullet, enemy) {
    console.log("enter hitEnemy");
    bullet.disableBody(true, true);
    //only kill them if they are on screen
    if (bullet.x < this.scrollCam.scrollX + 800) {
      // //console.log("true hit", bullet.x, this.scrollCam.scrollX + 800);
      enemy.disableBody(true, true);
      this.enemyGrunt.play();
    };
  }

  zeroPad(number, size){
    console.log("enter zeroPad");
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  normalColor(){this.player.clearTint();}

}
