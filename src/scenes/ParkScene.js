export default class ParkScene extends Phaser.Scene {
  constructor () {
    super('ParkScene');
  }
  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.health = data.health;
    this.itemsCollected = data.itemsCollected;
    this.dogCollarCollect = data.dogCollarCollect;
    this.dogBoneCollect = data.dogBoneCollect;
    this.dogToyCollect = data.dogToyCollect;
    this.dogToy2Collect = data.dogToy2Collect;
    this.dogToy3Collect = data.dogToy3Collect;
    this.dogBowlCollect = data.dogBowlCollect;
  }

  create(){
    this.parkMusic = this.sound.add("parkBackgroundMusic");
    this.parkMusicConfig = {
      loop: true
    };
    this.parkMusic.play(this.parkMusicConfig);
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
    this.scrollCam = this.cameras.main.setBounds(0, 0, 2400, 600);
    this.scrollCam.scrollX = 0;

    //player
    this.player = this.physics.add.sprite(0, 530, "player").setScale(.3);
    this.player.setCollideWorldBounds(true).setActive(true).setDepth(1);
    //console.log("player x in scene 2: ", this.player.x)
    //console.log(this.cameras.main.width + ", " + this.cameras.main.height);


    //background
    this.background = this.add.image(1245, 300, "park");
    this.background.alpha = 0.5;

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.staticGroup();
    this.hachikoGroup = this.physics.add.staticGroup();

    //park
    this.collectables.create(632, 250, "dogPicture").setScale(0.1).setSize(35, 45).setPosition(480, 50);
    this.trashcan4 = this.add.image(450, 485, "trashcan").setScale(.12);
    this.box17 = this.platforms.create(450, 483, "box").setSize(60, 90); this.box17.alpha = 0;
    this.lamppost3 = this.add.image(600, 403, "lamppost").setScale(.097);
    this.box18 = this.platforms.create(533, 280, "box").setSize(22, 9); this.box18.alpha = 0;
    this.box19 = this.platforms.create(668, 280, "box").setSize(22, 9); this.box19.alpha = 0;
    this.bench = this.add.image(1200, 470, "bench").setScale(.5);
    this.box20 = this.platforms.create(1196, 475, "box").setSize(202, 5); this.box20.alpha = 0;
    this.tree = this.add.image(1700, 350, "tree").setScale(.35);
    this.box21 = this.platforms.create(1700, 340, "box").setSize(250, 5); this.box21.alpha = 0;

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
    }  if (this.dogBowlCollect == true) {
      this.add.image(350, 20, "dogBowl").setScale(.2).setScrollFactor(0);
    } if (this.dogToy2Collect == true) {
      this.add.image(455, 20, "dogToy2").setScale(.3).setScrollFactor(0);
    } if (this.dogToy3Collect == true) {
      this.add.image(410, 25, "dogToy3").setScale(.3).setScrollFactor(0);
    };


    // boss
    this.makeEnemy(1100, 590, .3, 50, 100, 1000, 490);
    this.makeEnemy(1750, 390, .3, 50, 100, 1650, 290);
    this.makeEnemy(2350, 590, .3, 50, 100, 2250, 490);
    this.makeEnemy(2400, 530, .7, 100, 200, 2350, 430);

    this.hachiko = this.add.image(2300, 520, "hachiko").setScale(.2);
    this.box22 = this.hachikoGroup.create(2300, 520, "box").setSize(22, 9); this.box22.alpha = 0;
    //this.hachiko.setCollideWorldBounds(true);

    //gun
    this.nerf = this.add.sprite(this.player.x + 10 ,520, "nerf");
    this.nerf.setScale(.03);
    //Gun and Bullets
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
    this.physics.add.overlap(this.player, this.box22, this.gotHachiko, null, this);

    //collectables
    this.physics.add.overlap(this.player, this.collectables, this.collectDogItem, null, this);

    //health variables
    var gunDir;
    var scoreFormatted = this.zeroPad(this.health, 3);
    this.healthLabel = this.add.text(5, 5,"Health: " + scoreFormatted);
    this.healthLabel.setScrollFactor(0);

    //this.collectedText = this.add.text(5, 25,"Memories: " + this.itemsCollected).setScrollFactor(0);

    this.bulletCount = 10;
    var displayBulletCount = this.zeroPad(this.bulletCount, 2);
    // var totalBullets = 10;
    this.bulletAmount = this.add.text(5, 45,"Ammo: " + displayBulletCount).setScrollFactor(0);

    var deathScene;
  }

  update (time, delta) {
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
    this.physics.world.setBounds(0, 0, this.scrollCam.scrollX + 800, 530);

    this.time.addEvent({
      delay:300,
      callback:this.delay,
      callbackScope: this,
      loop: false,
    });

    if(this.scrollCam.scrollX > 2490){
      //console.log("done scrolling!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      //this.scrollCam = this.cameras.main.setBounds(3050, 0, 4800, 300);
      this.scrollCam.scrollX -= 2;
    }

    //If player has below 0 health
    if (this.health < 0){
      //console.log("died by damage");
      this.parkMusic.stop(this.parkMusicConfig);
      this.deathScene = "Park";
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected, deathScene: this.deathScene});
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
      this.jumpSound.play("jumpSound");
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(400);
      this.nerf.y = this.player.y;
      this.player.anims.play("crouch", true);
    }
    if (cursors.up.isUp) {
      this.nerf.y = this.player.y;
    }
    /*if (this.nerf.x < this.scrollCam.worldView.x - 5){
      this.nerf.x = this.player.x + 10;
    }*/

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
          }else if (b.x > this.cameras.main.width) {
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
            //console.log("within shooting distance");
            this.enemyShoot(this.player.x, this.player.y, e);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined

    );
  }

  delay(){
    this.scrollCam.scrollX += 2;
    if(this.player.x < this.scrollCam.scrollX - 100){
      //console.log("Out of bounds", this.scrollCam.scrollX, this.player.x);
      this.parkMusic.stop(this.parkMusicConfig);
      this.deathScene = "Park";
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected, deathScene: this.deathScene});

    }
  }

  enemyShoot(playerX, playerY, e){
    var betweenPoints = Phaser.Math.Angle.BetweenPoints;
    var angle = betweenPoints(e, this.player);
    //var angle = betweenPoints(e,this.player);

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
    this.bulletCount -= 1;
    var displayBulletCount = this.zeroPad(this.bulletCount, 2);
    this.bulletAmount.text = "Ammo: " + displayBulletCount;
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
    var scoreformatted = this.zeroPad(this.health, 3);
    //console.log(this.health, "health");
    this.healthLabel.text = "Health:" + this.scoreformatted;
    this.girlOuch.play("girlOuch");
    this.player.setTint(0xf44A48);
    this.time.addEvent({
      delay:400,
      callback: this.normalColor,
      callbackScope: this,
    });
    //enemy.setImmovable();
    //enemy.setVelocity = -(player.velocity);
    //add a red tint later to indicate damage
  }

  takeDamageFromEnemyBullets(bullet, player){
    this.health -= 10;
    this.girlOuch.play("girlOuch");
    bullet.disableBody(true, true);
    var scoreformatted = this.zeroPad(this.health, 6);
    this.healthLabel.text = "SCORE " + this.scoreformatted;
    this.player.setTint(0xf44A48);
    this.time.addEvent({
      delay:400,
      callback: this.normalColor,
      callbackScope: this,
    });
    bullet.disableBody(true, true);
  }

  //creating thugs
  makeEnemy(x, y, scale, sizeX, sizeY, posX, posY){
    this.thug = this.enemyGroup.create(x, y, "thug").setScale(scale).setActive(true).setSize(sizeX, sizeY).setPosition(posX, posY);
    var thug = this.thug;
    // this.tweens.add({
    //     targets: thug,
    //     x: x+10,
    //     y: y,
    //     ease: "Linear",
    //     delay: 2000,
    //     duration: 1500,
    //     yoyo: true,
    //     repeat: -1});
  }

  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
  dogItem.disableBody(true, true);
  this.itemsCollected += 1;
  //this.collectedText.text = "Memories: " + this.itemsCollected;
  if (this.player.x < 500 && this.player.x > 450) {
    this.add.image(500, 25, "dogPicture").setScale(0.1).setScrollFactor(0);
  }
  this.collectSound.play("collectSound");
  }

  //winning condition
  gotHachiko(player, hachiko){
    //if (this.player.x > 7397 && this.player.x < 7403){
      this.parkMusic.stop();
      //console.log("got hachiko");
      this.scene.start('EndScene', {itemsCollected: this.itemsCollected});
    }
  //}

  //damaging the enemy
  hitEnemy (bullet, enemy) {
    bullet.disableBody(true, true);
    //only kill them if they are on screen
    if (bullet.x < this.scrollCam.scrollX + 800) {
      //console.log("true hit", bullet.x, this.scrollCam.scrollX + 800);
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
