export default class AlleyScene extends Phaser.Scene {
  constructor () {
    super('AlleyScene');
  }
  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.health = data.health;
    this.itemsCollected = data.itemsCollected;
    this.scoreFormatted = data.scoreFormatted;
    this.neighborhoodMusic = data.neighborhoodMusic;
  }

  create(){
    this.neighborhoodMusic.stop();
    this.alleyMusic = this.sound.add("alleyBackgroundMusic");
    this.alleyMusic.addMarker({
      name: "alleyMusic",
      start: 0,
      duration: 16
    });
    this.alleyMusic.play("alleyMusic");
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

    //camera
    this.scrollCam = this.cameras.main.setBounds(1545, 0, 1720, 600);
    this.scrollCam.scrollX = 1545;

    //background
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();

    // alley platforms
    this.trashcan1 = this.add.image(1650, 540, "trashcan").setScale(.08);
    this.box10 = this.platforms.create(1650, 540, "box").setSize(40, 60); this.box10.alpha = 0;
    this.trashcan2 = this.add.image(1720, 520, "trashcan").setScale(.12);
    this.box11 = this.platforms.create(1720, 520, "box").setSize(60, 90); this.box11.alpha = 0;
    this.sign1 = this.add.image(1850, 350, "sign1").setScale(.1);
    this.box12 = this.platforms.create(1850, 364, "box").setSize(70, 30); this.box12.alpha = 0;
    this.collectables.create(2400, 250, "dogBowl").setScale(.2).setSize(42, 25).setPosition(2310, 160);
    this.collectables.create(2282, 404, "dogCollar").setScale(.05).setSize(30, 25).setPosition(2010, 160);
    this.dumpster = this.add.image(2200, 480, "dumpster").setScale(.26);
    this.box13 = this.platforms.create(2200, 520, "box").setSize(155, 110); this.box13.alpha = 0;
    this.box14 = this.platforms.create(2200, 417, "box").setSize(120, 50); this.box14.alpha = 0;
    this.trashcan3 = this.add.image(2450, 540, "trashcan").setScale(.08);
    this.box15 = this.platforms.create(2450, 540, "box").setSize(40, 60); this.box15.alpha = 0;
    this.sign2 = this.add.image(2630, 444, "sign2").setScale(.08);
    this.box16 = this.platforms.create(2630, 455, "box").setSize(60, 20); this.box16.alpha = 0;
    this.collectables.create(2850, 1027, "dogToy").setScale(.04).setSize(26, 335).setPosition(2320, 510);

    //player
    this.player = this.physics.add.sprite(1600, 300, "player").setScale(.3);
    this.player.setCollideWorldBounds(true);
    this.player.setActive(true);
    this.player.setDepth(1);
    console.log("player x in scene 2: ", this.player.x)
    console.log(this.cameras.main.width + ", " + this.cameras.main.height);

    this.makeEnemy(1600 + 500, 530, "thug", .3);
    this.makeEnemy(1600 + 790, 525, "thug", .3);
    this.makeEnemy(1600 + 1250, 505, "thug", .3);

    //gun
    this.nerf = this.add.sprite(this.player.x + 10, 520, "nerf");
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
    this.physics.add.overlap(this.player, this.hachiko, this.gotHachiko, null, this);

    //collectables
    this.physics.add.overlap(this.player, this.collectables, this.collectDogItem, null, this);

    //conditions and health variables
    var condition;
    var gunDir;
    var scoreFormatted = this.zeroPad(this.health, 6);
    this.healthLabel = this.add.text(5, 5, "Health: " + scoreFormatted);
    this.healthLabel.setScrollFactor(0);
  }

  update (time, delta) {
    //Space bar to shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot(this.gunDir);
      this.nerfShootSound.play("nerfShootSound");
    }

    //Scrolling screen
    this.physics.world.setBounds(1545, 0, 4800, 550);
    this.time.addEvent({
      delay:300,
      callback:this.delay,
      callbackScope: this,
      loop: false,
    });

    //If player has below 0 health. LOSE condition
    if (this.health < 0){
      this.condition = 'Lose';
      console.log("Negative health");
      this.scene.start('EndScene', {condition: this.condition, itemsCollected: this.itemsCollected});
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
            console.log("within shooting distance");
            this.enemyShoot(this.player.x, this.player.y, e);
          }
        }
      }.bind(this)//for can't read property 'physics' of undefined

    );
    if (this.player.x > 3250) {
      this.scene.start('ParkScene', {health: this.health, itemsCollected: this.itemsCollected, scoreFormatted: this.scoreFormatted, alleyMusic: this.alleyMusic});
      console.log("scene switch 2")
    };
  }

  delay(){
    this.scrollCam.scrollX += 1.25;
    if(this.player.x < this.scrollCam.scrollX - 75){
      console.log("Out of bounds", this.scrollCam.scrollX, this.player.x);
      this.condition = 'Lose';
      this.scene.start('EndScene', {condition: this.condition, itemsCollected: this.itemsCollected});
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
    this.healthLabel.text = "Health: " + this.scoreFormatted;
    //enemy.setImmovable();
    //enemy.setVelocity = -(player.velocity);
    //add a red tint later to indicate damage
  }

  takeDamageFromEnemyBullets(bullet, player){
    this.health -= 10;
    bullet.disableBody(true, true);
    var scoreFormatted = this.zeroPad(this.health, 6);
    this.healthLabel.text = "Health: " + this.scoreFormatted;
    console.log(this.health, "is current health");
  }

  //creating thugs
  makeEnemy(x, y, image, scale){
    this.thug = this.enemyGroup.create(x, y, image).setScale(scale).setCollideWorldBounds(true);
    console.log("enemy coordinates:", x, y);
    var thug = this.thug;
    this.tweens.add({
        targets: thug,
        x: x-100,
        y: y,
        ease: "Linear",
        delay: 500,
        duration: 500,
        yoyo: true,
        repeat: -1});
  }


  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
  dogItem.disableBody(true, true);
  this.itemsCollected += 1;
  console.log("number of items collected is " + this.itemsCollected);
  this.collectSound.play("collectSound");
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
