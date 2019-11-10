export default class AlleyScene extends Phaser.Scene {
  constructor () {
    super('AlleyScene');
  }
  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.health = data.health;
    this.itemsCollected = data.itemsCollected;
  }

  create(){
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

    //camera
    this.scrollCam = this.cameras.main.setBounds(0, 0, 3400, 600);
    this.scrollCam.scrollX = 0;

    //background
    this.background = this.add.image(1700, 300, "alley");
    this.background.alpha = 0.5;

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();

    // Tutorial
    this.makeEnemy(1000, 530, .3);
    this.add.text(300, 400, "Press space to shoot").setStyle({fontSize: "23px", color: "#fff"});
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
    this.sign3 = this.add.image(2750, 270, "sign3").setScale(.1);
    this.box17 = this.platforms.create(2750, 270, "box").setSize(100, 25); this.box17.alpha = 0;
    this.collectables.create(3140, 105, "dogBowl").setScale(.2).setSize(42, 25).setPosition(3050, 40);
    this.add.text(3290, 400, "This way").setStyle({fontSize: "20px", color: "#fff"});
    this.add.image(3350, 450, "arrow3").setScale(.08);

    //player
    this.player = this.physics.add.sprite(0, 550, "player").setScale(.3);
    this.player.setCollideWorldBounds(true).setActive(true).setDepth(1);
    ////console.log("player x in scene 2: ", this.player.x);

    this.makeEnemy(1600, 530, .3);
    this.makeEnemy(2100, 530, .3);
    this.makeEnemy(2390, 525, .3);
    this.makeEnemy(2850, 505, .3);
    this.makeEnemy(3100, 505, .3);

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

    this.collectedText = this.add.text(5, 25,"Memories: " + this.itemsCollected).setScrollFactor(0);
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

    //If player has below 0 health
    if (this.health < 0){
      ////console.log("Negative health");
      this.alleyMusic.stop(this.alleyMusicConfig);
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
    if (this.player.x > 3350) {
      this.alleyMusic.stop(this.alleyMusicConfig);
      this.scene.start('ToyShopScene', {health: this.health, itemsCollected: this.itemsCollected});
      //console.log("scene switch 2")
    };
  }

  delay(){
    this.scrollCam.scrollX += 1.5;
    if(this.player.x < this.scrollCam.scrollX - 75){
      //console.log("Out of bounds", this.scrollCam.scrollX, this.player.x);
      this.alleyMusic.stop(this.alleyMusicConfig)
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
    //console.log(this.health, "health");
    this.healthLabel.text = "Health: " + this.scoreFormatted;


  }

  takeDamageFromEnemyBullets(bullet, player){
    this.health -= 10;
    this.girlOuch.play("girlOuch");
    bullet.disableBody(true, true);
    var scoreFormatted = this.zeroPad(this.health, 6);
    this.healthLabel.text = "Health: " + scoreFormatted;
    //console.log(this.health, "is current health");
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
  this.collectedText.text = "Memories: " + this.itemsCollected;
  //console.log("number of items collected is " + this.itemsCollected);
  this.collectSound.play("collectSound");
  }
//console.log
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

}
