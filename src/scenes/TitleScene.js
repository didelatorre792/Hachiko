export default class TutorialScene extends Phaser.Scene {
  constructor () {
    super('TutorialScene');}



  create() {
    this.background = this.add.image(400, 300, "tutorial").setScale(2)
    //this.add.image(400, 300, "titleVideo");
  }

  update(){
    //this.titleVideo.play(true)
    this.time.addEvent({
      delay:6000,
      callback:this.delay,
      callbackScope: this,
    });



  }

  delay(){
    this.scene.start('NeighborhoodScene');
  }


}
