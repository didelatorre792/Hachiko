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

    //camera
    this.scrollCam = this.cameras.main.setBounds(0, 0, 3500, 600);
    this.scrollCam.scrollX = 0;

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
    this.box1 = this.platforms.create(1300, 494, "box").setSize(135); this.box1.alpha = 0;

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
    this.box5 = this.platforms.create(2720, 494, "box").setSize(135); this.box5.alpha = 0;
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

    //player
    this.player = this.physics.add.sprite(250, 550, "player").setScale(.3);
    this.player.setCollideWorldBounds(true).setActive(true);

    //gun
    this.nerf = this.add.sprite(280, 560, "nerf");
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
    this.health = 300;
    var scoreFormated = this.zeroPad(this.health, 6);
    this.healthLabel = this.add.text(5, 5,"Health: " + scoreFormated);
    this.healthLabel.setScrollFactor(0);

    this.collectedText = this.add.text(5, 25,"Memories: " + this.itemsCollected).setScrollFactor(0);
    this.add.image(200, 20, "dogCollar").setScale(.05).setScrollFactor(0).setTint(0);
    this.add.image(250, 15, "dogBone").setScale(.2).setScrollFactor(0).setTint(0);
    this.add.image(300, 20, "dogToy").setScale(.04).setScrollFactor(0).setTint(0);
    this.add.image(350, 20, "dogBowl").setScale(.18).setScrollFactor(0).setTint(0);
    this.add.image(410, 25, "dogPicture").setScale(0.05).setScrollFactor(0).setTint(0);
  }

  update (time, delta) {
    //Space bar to shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot(this.gunDir);
      this.nerfShootSound.play("nerfShootSound");
    }

    //Scrolling screen
    this.physics.world.setBounds(0, 0, this.scrollCam.scrollX + 800, 550);
    this.scrollCam.scrollX += 1.5;

    //If player is off screen
    if(this.player.x < this.scrollCam.scrollX){
      this.neighborhoodMusic.stop(this.neighborhoodMusicConfig);
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
      this.neighborhoodMusic.stop(this.neighborhoodMusicConfig);
      this.scene.start('AlleyScene', {health: this.health, itemsCollected: this.itemsCollected});
      //console.log("scene switch")
      //console.log("player x in scene 1: ", this.player.x)
    }
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
    this.collectedText.text = "Memories: " + this.itemsCollected;
    //console.log("number of items collected is " + this.itemsCollected);
    this.collectSound.play("collectSound");
  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
}
