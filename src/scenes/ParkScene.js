export default class ParkScene extends Phaser.Scene {
  constructor () {
    super('ParkScene');
  }
  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.health = data.health;
    this.itemsCollected = data.itemsCollected;
    this.scoreFormated = data.scoreFormated;
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    //player
    this.player = this.physics.add.sprite(3080, 500, "player").setScale(.3);
    this.player.setCollideWorldBounds(true);
    this.player.setActive(true);

    //camera
    this.scrollCam = this.cameras.main.setBounds(3050, 0, 4800, 300);
    this.scrollCam.scrollX = 0;

    //background
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)

    //groups
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();

    //park
    this.collectables.create(3997, 575, "dogPicture").setScale(0.07).setSize(50, 70).setPosition(3660, 100);
    this.trashcan4 = this.add.image(3650, 545, "trashcan").setScale(.12);
    this.box17 = this.platforms.create(3650, 543, "box").setSize(60, 90); this.box17.alpha = 0;
    this.lamppost3 = this.add.image(3800, 463, "lamppost").setScale(.097);
    this.box18 = this.platforms.create(3733, 340, "box").setSize(22, 9); this.box18.alpha = 0;
    this.box19 = this.platforms.create(3868, 340, "box").setSize(22, 9); this.box19.alpha = 0;
    this.bench = this.add.image(4000, 520, "bench").setScale(.8);
    this.box20 = this.platforms.create(3996, 490, "box").setSize(189, 5); this.box20.alpha = 0;
    this.tree = this.add.image(4300, 400, "tree").setScale(.5);
    this.box21 = this.platforms.create(4300, 390, "box").setSize(250, 5); this.box21.alpha = 0;

    // boss
    this.makeEnemy(4750, 470, "thug", .7);

    this.hachiko = this.physics.add.image(4700, 600, "hachiko").setScale(.14);
    this.hachiko.setCollideWorldBounds(true);

    //gun
    this.nerf = this.add.sprite(100 ,520, "nerf");
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
    this.physics.add.overlap(this.player, this.collectables, this.collectDogItem, null, this);

    //conditions and health variables
    var condition;
    var gunDir;
    var scoreFormated = this.zeroPad(this.health, 6);
  }

  update (time, delta) {
    console.log(this.player.x);
    this.player.setDepth(1);
    this.healthLabel = this.add.text(this.scrollCam.worldView.x, 5,"SCORE: " + this.scoreFormated);

    //Space bar to shoot
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot(this.gunDir);
    }

    //Scrolling screen
    this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 4800, 550);
    //this.physics.world.setBounds(this.scrollCam.worldView.x, 0, 3000, 550);
    this.scrollCam.scrollX += 1.25;

    //If player is off screen. LOSE condition
    if(this.player.x < this.scrollCam.worldView.x - 75){
      this.condition = 'Lose';
      console.log("Out of bounds", this.scrollCam.worldView.x, this.player.x);
      this.scene.start('EndScene', {condition: this.condition, itemsCollected: this.itemsCollected});
      //this.scene.start('EndScene', {condition: this.condition});
    }

    //If player has below 0 health. LOSE condition
    if (this.health < 0){
      this.condition = 'Lose';
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
            console.log("within shooting distance");
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
    //enemy.setImmovable();
    //enemy.setVelocity = -(player.velocity);
    //add a red tint later to indicate damage
  }

  //creating thugs
  makeEnemy(x, y, image, scale){
    this.thug = this.enemyGroup.create(x, y, image).setScale(scale).setCollideWorldBounds(true);
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
