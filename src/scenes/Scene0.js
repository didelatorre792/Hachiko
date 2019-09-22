export default class Scene0 extends Phaser.Scene {
  constructor () {
    super('Scene0');
  }



  preload(){
  this.centerX = this.cameras.main.width / 2;
  this.centerY = this.cameras.main.height / 2;

  this.load.image('logo', 'assets/logo.png');

  var iter = 0;
  //var scrollCam;
  var picture;

  this.load.image("dessert", "./assets/images/background.png");
  }

  create(){

    this.scrollCam = this.cameras.main.setBounds(0,0, 3000, 960);
    this.scrollCam.scrollX = 25;
    //this.scrollCam.setSize(0,0, 3000, 960);
    //this.background = this.add.sprite(400, 300, "sky");
    this.picture = this.add.sprite(1280/2, 960/2,"dessert");

    this.physics.world.setBounds(0, 0, 3000, 960);



  }

  update(){

    this.scrollCam.scrollX += 1;
  }

  }
