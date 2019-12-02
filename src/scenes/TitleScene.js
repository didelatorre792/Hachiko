export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('TitleScene');}



  create() {
    this.add.image(400, 325, "titlePic").setScale(1.1);
    //this.add.image(400, 300, "titleVideo");
  }

  update(){
    //this.titleVideo.play(true)
    this.time.addEvent({
      delay:4000,
      callback:this.delay,
      callbackScope: this,
    });



  }

  delay(){
    this.scene.start('PreGameScene');
  }


}
