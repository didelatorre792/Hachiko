export default class ToyShopScene extends Phaser.Scene {
  constructor () {
    super('ToyShopScene');
  }
  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.health = data.health;
    this.itemsCollected = data.itemsCollected;
    this.dogCollarCollect = data.dogCollarCollect;
    this.dogBoneCollect = data.dogBoneCollect;
    this.dogToyCollect = data.dogToyCollect;
    this.dogBowlCollect = data.dogBowlCollect;
  }

  create(){
    //music
    /*this.toyShopMusic = this.sound.add("toyShopBackgroundMusic");
    this.toyShopMusic.addMarker({
      start: 0,
      duration: 20
    });
    this.toyShopMusicConfig = {
      loop: true
    };
    this.toyShopMusic.play(this.toyShopMusicConfig);*/
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

    //camera
    this.scrollCam = this.cameras.main.setBounds(0, 0, 3500, 600);
    this.scrollCam.scrollX = 0;

    //background
    this.background = this.add.image(1750, 300, "toyShop");
    this.background.alpha = 0.5;

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();

    // assets
    this.collectables.create(635, 365, "dogToy3").setScale(.3).setSize(35, 35).setPosition(565, 315);
    this.platforms.create(1740, 500, "boxCopy2");
    this.platforms.create(1870, 390, "boxCopy");
    this.platforms.create(1970, 300, "boxCopy");
    this.box2 = this.platforms.create(2340, 235, "box").setSize(550, 10); this.box2.alpha = 0;
    this.collectables.create(2385, 410, "dogToy2").setScale(.3).setSize(15, 25).setPosition(2350, 375);

    // display collectables
    this.add.image(200, 20, "dogCollar").setScale(.05).setScrollFactor(0).setTint(0);
    this.add.image(250, 15, "dogBone").setScale(.2).setScrollFactor(0).setTint(0);
    this.add.image(300, 20, "dogToy").setScale(.04).setScrollFactor(0).setTint(0);
    this.add.image(350, 20, "dogBowl").setScale(.18).setScrollFactor(0).setTint(0);
    this.add.image(410, 25, "dogToy3").setScale(0.3).setScrollFactor(0).setTint(0);
    this.add.image(455, 20, "dogToy2").setScale(0.3).setScrollFactor(0).setTint(0);
    this.add.image(500, 25, "dogPicture").setScale(0.1).setScrollFactor(0).setTint(0);
    if (this.dogCollarCollect == true) {
      this.add.image(200, 20, "dogCollar").setScale(.05).setScrollFactor(0);
    } if (this.dogBoneCollect == true) {
      this.add.image(250, 15, "dogBone").setScale(.2).setScrollFactor(0);
    } if (this.dogToyCollect == true) {
      this.add.image(300, 20, "dogToy").setScale(.05).setScrollFactor(0);
    } if (this.dogBowlCollect == true) {
      this.add.image(350, 20, "dogBowl").setScale(.2).setScrollFactor(0);
    };

    //player
    this.player = this.physics.add.sprite(0, 550, "player").setScale(.3);
    this.player.setCollideWorldBounds(true).setActive(true).setDepth(1);

    //moving car
    this.movingCar = this.physics.add.sprite(1900, 500, "movingCar");
    this.movingCar.setActive(true).setDepth(1).setGravity(0, -400);
    this.movingCar2 = this.physics.add.sprite(4500, 500, "movingCar2");
    this.movingCar2.setActive(true).setDepth(1).setScale(.7).setGravity(0, -400);

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
      maxSize: 100
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

    //health variables
    var gunDir;
    var scoreFormatted = this.zeroPad(this.health, 6);
    this.healthLabel = this.add.text(5, 5, "Health: " + scoreFormatted);
    this.healthLabel.setScrollFactor(0);

    //this.collectedText = this.add.text(5, 25,"Memories: " + this.itemsCollected).setScrollFactor(0);
  }

  update (time, delta) {
    //Space bar to shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot(this.gunDir);
      this.nerfShootSound.play("nerfShootSound");
    }

    //Scrolling screen
    this.physics.world.setBounds(0, 0, this.scrollCam.scrollX + 800, 550);
    this.time.addEvent({
      delay: 300,
      callback: this.delay,
      callbackScope: this,
      loop: false,
    });

    //moving car
    this.movingCar.setVelocityX(-300);
    this.movingCar.anims.play("drive", true);

    this.movingCar2.setVelocityX(-500);
    this.movingCar2.anims.play("drive2", true);

    this.physics.add.collider(
      this.movingCar,
      this.player,
      this.takeDamage,
      null,
      this
    );
    this.physics.add.collider(
      this.movingCar2,
      this.player,
      this.takeDamage,
      null,
      this
    );

    //If player has below 0 health
    if (this.health < 0){
      ////console.log("Negative health");
      //this.toyShopMusic.stop(this.toyShopMusicConfig);
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected});
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

    this.enemyGroup.children.each(
      function(e){
        if (e.active){
          if (Phaser.Math.Distance.Between(e.x,e.y,this.player.x,this.player.y) < 300){
            this.enemyShoot(this.player.x, this.player.y, e);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined

    );
    if (this.player.x > 3400) {
      //this.toyShopMusic.stop(this.toyShopMusicConfig);
      this.scene.start('ParkScene', {health: this.health, itemsCollected: this.itemsCollected, dogCollarCollect: this.dogCollarCollect, dogBoneCollect: this.dogBoneCollect, dogToyCollect: this.dogToyCollect, dogToy2Collect: this.dogToy2Collect, dogToy3Collect: this.dogToy3Collect, dogBowlCollect: this.dogBowlCollect});
      //console.log("scene switch 2")
    };
  }

  delay(){
    this.scrollCam.scrollX += 2.5;
    if(this.player.x < this.scrollCam.scrollX - 75){
      //console.log("Out of bounds", this.scrollCam.scrollX, this.player.x);
      //this.toyShopMusic.stop(this.toyShopMusicConfig);
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected});
    }
  }

  enemyShoot(playerX, playerY, e){
    var betweenPoints = Phaser.Math.Angle.BetweenPoints;
    var angle = betweenPoints(e, this.player);
    var velocityFromRotation = this.physics.velocityFromRotation;
    var velocity = new Phaser.Math.Vector2();
    velocityFromRotation(angle, 400, velocity);
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
    } else if (direction == 'Reg') {
      bullet//left
        .enableBody(true, this.nerf.x, this.nerf.y, true, true)
        .setVelocity(velocity.x + 1000, velocity.y);
    }
  }

  //when hit by an enemy
  takeDamage(enemy, player){
    this.health -= 5;
    this.girlOuch.play("girlOuch");
    this.player.setTint(0xf44A48);
    this.time.addEvent({
      delay:400,
      callback: this.normalColor,
      callbackScope: this,
    });
    this.healthLabel.text = "Health: " + this.scoreFormatted;


  }

  takeDamageFromEnemyBullets(bullet, player){
    this.health -= 10;
    this.girlOuch.play("girlOuch");
    bullet.disableBody(true, true);
    var scoreFormatted = this.zeroPad(this.health, 6);
    this.healthLabel.text = "Health: " + scoreFormatted;
    this.player.setTint(0xf44A48);
    this.time.addEvent({
      delay:400,
      callback: this.normalColor,
      callbackScope: this,
    });
    bullet.disableBody(true, true);
  }

  //creating thugs
  makeEnemy(x, y, scale){
    this.thug = this.enemyGroup.create(x, y, "thug").setScale(scale).setCollideWorldBounds(true).setActive(true);
    //console.log("enemy coordinates:", x, y);
    var thug = this.thug;
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
  this.collectSound.play("collectSound");
  console.log(this.player.x)
  if (this.player.x < 1000 && this.player.x > 500) {
    this.dogToy3Collect = true;
    this.add.image(410, 25, "dogToy3").setScale(.3).setScrollFactor(0);
  } if (this.player.x < 2700 && this.player.x > 2600) {
    this.dogToy2Collect = true;
    this.add.image(455, 20, "dogToy2").setScale(.3).setScrollFactor(0);
  }
  }

  //damaging the enemy
  hitEnemy (bullet, enemy) {
    bullet.disableBody(true, true);
    //only kill them if they are on screen
    if (bullet.x < this.scrollCam.scrollX + 800) {
      // //console.log("true hit", bullet.x, this.scrollCam.scrollX + 800);
      enemy.disableBody(true, true);
      this.enemyGrunt.play();
    };
  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  normalColor(){this.player.clearTint();}

}
