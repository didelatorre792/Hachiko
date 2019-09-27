/*export default class Scene0 extends Phaser.Scene {
  constructor () {
    super('Scene0');
  }



  preload(){
  this.centerX = this.cameras.main.width / 2;
  this.centerY = this.cameras.main.height / 2;

  //this.load.image('logo', 'assets/logo.png');

  var iter = 0;
  //var scrollCam;
  var picture;
  var container;

  //eventually move this to BootScene
  this.load.image("dessert", "./assets/images/background.png");
  this.load.image("hachiko", "./assets/images/hachiko.png");
  this.load.image("nerf", "./assets/images/nerf.png");
  this.load.image("bullet", "./assets/images/bullet.jpg");

  this.load.spritesheet("alien", "./assets/spritesheet/player.png", {
    frameWidth: 65,
    frameHeight: 95
    });

  }

  create(){

    this.scrollCam = this.cameras.main.setBounds(0,0, 3000, 960);
    this.scrollCam.scrollX = 25;
    //this.scrollCam.setSize(0,0, 3000, 960);
    //this.background = this.add.sprite(400, 300, "sky");
    this.picture = this.add.sprite(1280/2, 960/4,"dessert");
    // this.player = this.add.sprite(0, 0, "alien");
    this.player = this.physics.add.sprite(100, 550, "alien");
    this.player.setCollideWorldBounds(true);

    this.nerf = this.add.sprite(140,560, "nerf");
    this.nerf.setScale(.1);

    // this.container = this.add.container(100, 550);
    // this.container.add(this.player, this.nerf);
    //this.container.setCollideWorldBounds(true);



    //this.container = this.add.container(0, 550, this.player, this.nerf);

    this.physics.world.setBounds(0, 0, 3000, 600);

    this.hachiko = this.physics.add.image(500, 550, "hachiko");
    this.hachiko.setScale(.14);
    this.hachiko.setCollideWorldBounds(true);


    this.physics.add.overlap(this.player, this.hachiko, this.gotHachiko, null, this);

    //eventually move below to BootScene
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });

    //Gun and Bullets
    var bullets;

    this.nextFire = 0;
    this.fireRate = 200;
    this.speed = 1000;

    this.bullets = this.physics.add.group({
      defaultKey:"bullet",
      maxSize: 10
    });

    // this.input.on(
    //   "pointermove",
    //   function(pointer){
    //     var betweenPoints = Phaser.Math.Angle.BetweenPoints;
    //     var angle = Phaser.Math.RAD_TO_DEG * betweenPoints(this.nerf, pointer);
    //     this.nerf.setAngle(angle);
    //   }, this
    // );
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.input.on("keydown", this.shoot, this);

  }

  update(){
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot();
    }

    //this.scrollCam.scrollX += 1;

    var speed = 6;

    //Create cursor keys and assign events
    var cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.player.x -= speed;
      this.nerf.x -= speed;
      this.player.anims.play("walk", true);
      this.player.flipX = true;
      this.nerf.flipX = true;
    } else if (cursors.right.isDown) {
      this.player.x += speed;
      this.nerf.x += speed;
      this.player.anims.play("walk", true);
      this.player.flipX = false;
      this.nerf.flipX = false;
    } else {
      this.player.anims.play("idle", true);
    }
    if (cursors.up.isDown) {
      this.player.y -= speed;
      this.nerf.y = this.player.y;//do if the button is let go
    } else if (cursors.down.isDown) {
      this.player.y += speed;
      this.nerf.y = this.player.y;
    }

    //shooting
    this.bullets.children.each(
      function(b){
        if (b.active){
          this.physics.add.overlap(
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
  }

  // shoot(pointer){
  //   var betweenPoints = Phaser.Math.Angle.BetweenPoints;
  //   var angle = betweenPoints(this.nerf, pointer);
  //   var velocityFromRotation = this.physics.velocityFromRotation;
  //   //create a var called velocity from a vector2
  //   var velocity = new Phaser.Math.Vector2();
  //   velocityFromRotation(angle, this.speed, velocity);
  //   //get the bullet enemyGroup
  //   var bullet = this.bullets.get();
  //   bullet.setAngle(Phaser.Math.RAD_TO_DEG * angle);
  //   bullet
  //     .enableBody(true, this.nerf.x, this.nerf.y, true, true)
  //     .setVelocity(velocity.x, velocity.y);
  // }

  shoot(){
    // var betweenPoints = Phaser.Math.Angle.BetweenPoints;
    // var angle = betweenPoints(this.nerf, pointer);
    // var velocityFromRotation = this.physics.velocityFromRotation;
    //create a var called velocity from a vector2
    var velocity = new Phaser.Math.Vector2();
    //velocityFromRotation(angle, this.speed, velocity);
    //get the bullet enemyGroup
    var bullet = this.bullets.get();
    //bullet.setAngle(Phaser.Math.RAD_TO_DEG * angle);
    bullet//get nerf direction and + or - 1000
      .enableBody(true, this.nerf.x, this.nerf.y, true, true)
      .setVelocity(velocity.x + 1000, velocity.y);
  }

  gotHachiko(player, hachiko){
    this.scene.start('EndScene');
  }

  }
*/
