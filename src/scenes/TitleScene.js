export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('TitleScene');}



  create() {
    this.add.image(400, 325, "titlePic").setScale(1.1);
    var Tweenhachiko = this.add.sprite(600, 500, "hachiko").setScale(1);

    this.tweens.add({
      targets: Tweenhachiko,
      x: 200,
      ease: 'Linear',
      delay: 300,
      duration:1000,
      yoyo: true,
      repeat: 6
    });
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
    this.scene.start('PreGameScene');
  }


}
