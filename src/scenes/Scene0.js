export default class Scene0 extends Phaser.Scene {
  constructor () {
    super('Scene0');
  }


  preload(){
  this.centerX = this.cameras.main.width / 2;
  this.centerY = this.cameras.main.height / 2;
  }

  create(){

    //this.background = this.add.sprite(400, 300, "sky");
    this.cameras.main.setBackgroundColor(0x008080);//for now it's a rando color
    this.cameras.main.setBounds(0,0, 1280, 960);

    var lengthBackground = 3000 - this.cameras.main.width;// total - camera.width

    for(var i = 0; i < lengthBackground; i++){
      this.cameras.x +=1;
    }

  }

  }
