export default class GameJam extends Phaser.Scene {
  constructor () {
    super('GameJam');
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    //camera
    this.cameras.main.setBounds(0, 0);
    this.scrollCam = this.cameras.main.setBounds(0,0, 3000, 300);
    this.scrollCam.scrollX = 25;

    this.physics.world.setBounds(0, 0, 3000, 550);

    //background
    this.background = this.add.image(2400, 300, "background");
    this.background.setScale(2)

    //building the scene
    this.platforms = this.physics.add.staticGroup();
    this.collectables = this.physics.add.staticGroup();
    // neighborhood
    this.car1 = this.platforms.create(240, 540, "car1").setScale(2);
    this.car2 = this.platforms.create(800, 540, "car2").setScale(.4);
    this.mailbox1 = this.platforms.create(450, 485, "mailbox").setScale(.15);
    this.lamppost1 = this.platforms.create(550, 395, "lamppost").setScale(1.2);
    this.mailbox2 = this.platforms.create(1070, 485, "mailbox").setScale(.15);
    this.lamppost2 = this.platforms.create(1240, 395, "lamppost").setScale(1.2);
    this.dogBone = this.collectables.create(1350, 200, "dogBone").setScale(.2);
    this.mailbox3 = this.platforms.create(1520, 485, "mailbox").setScale(.15);

    // alley
    this.trashcan1 = this.platforms.create(1650, 540, "trashcan").setScale(.3);
    this.trashcan2 = this.platforms.create(1720, 520, "trashcan").setScale(.5);
    this.sign1 = this.platforms.create(1850, 350, "sign1").setScale(.4);
    this.dogBowl = this.collectables.create(1950, 270, "dogBowl").setScale(.2);
    this.dogCollar = this.collectables.create(2050, 550, "dogCollar").setScale(.25);
    this.dumpster = this.platforms.create(2200, 480, "dumpster").setScale();
    this.trashcan3 = this.platforms.create(2450, 540, "trashcan").setScale(.3);
    this.sign2 = this.platforms.create(2630, 420, "sign2").setScale(.4);
    this.thug1 = this.platforms.create(2640, 525, "thug").setScale(.08);
    this.thug2 = this.platforms.create(3100, 510, "thug").setScale(.1);
    this.thug2 = this.platforms.create(3250, 505, "thug").setScale(.11);
    this.trashcan4 = this.platforms.create(3450, 540, "trashcan").setScale(.3);
    this.dogToy = this.collectables.create(3320, 350, "dogToy").setScale(.04);
    // park
    this.dogPicture = this.collectables.create(3660, 250, "dogPicture").setScale(.07);
    this.trashcan4 = this.platforms.create(3650, 545, "trashcan").setScale(.5);
    this.lamppost3 = this.platforms.create(3800, 463, "lamppost").setScale(1.2);
    this.bench = this.platforms.create(4000, 520, "bench").setScale(.8);
    this.tree = this.platforms.create(4300, 400, "tree").setScale(1.7);
    // boss
    this.bigThug = this.add.image(4740, 470, "thug").setScale(.2);
    this.hachiko = this.physics.add.image(4690, 550, "hachiko").setScale(.14);
    this.hachiko.setCollideWorldBounds(true);




    //player
    this.player = this.physics.add.sprite(50, 550, "alien");
    this.player.setCollideWorldBounds(true);

    this.nerf = this.add.sprite(90,520, "nerf");
    this.nerf.setScale(.1);

    //Gun and Bullets
    var bullets;

    this.nextFire = 0;
    this.fireRate = 200;
    this.speed = 1000;

    this.bullets = this.physics.add.group({
      defaultKey:"bullet",
      maxSize: 10
    });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    // make platform and player collid
    this.physics.add.collider(this.player, this.platforms);

    //if hachiko and player touch
    this.physics.add.overlap(this.player, this.hachiko, this.gotHachiko, null, this);


    //collectables
    this.itemsCollected = 0;

    // make dog items collectable
    this.physics.add.overlap(
      this.player,
      this.dogBone,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogBowl,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogCollar,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogToy,
      this.collectDogItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dogPicture,
      this.collectDogItem,
      null,
      this
    );
  }

  update (time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shoot();
    }

    this.scrollCam.scrollX += .75;

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

  shoot(){
    var velocity = new Phaser.Math.Vector2();
    var bullet = this.bullets.get();
    bullet//get nerf direction and + or - 1000
      .enableBody(true, this.nerf.x, this.nerf.y, true, true)
      .setVelocity(velocity.x + 1000, velocity.y);
  }


  // make item dissapear when collecting it
  collectDogItem(player, dogItem) {
  dogItem.disableBody(true, true);
  this.itemsCollected += 1;
  console.log(this.itemsCollected);
  }

  gotHachiko(player, hachiko){
    this.scene.start('EndScene');
  }


}
