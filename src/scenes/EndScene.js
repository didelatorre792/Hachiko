export default class EndScene extends Phaser.Scene {
  constructor () {
    super('EndScene');
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    var text = this.add.text(this.centerX - 75, this.centerY, "You got Hachiko!", 40);
  }




}
