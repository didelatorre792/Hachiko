export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('TitleScene');}



  create() {
    this.add.image(400, 325, "titlePic").setScale(1.1);
    var Tweenhachiko = this.add.sprite(600, 430, "hachiko").setScale(.8);

    this.tweens.add({
      targets: Tweenhachiko,
      x: 200,
      ease: 'Linear',
      delay: 300,
      duration:1000,
      yoyo: true,
      repeat: -1
    });
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(300, 550, "Press enter to start.");
  }

  update(){
    var cursors = this.input.keyboard.createCursorKeys()
    if (Phaser.Input.Keyboard.JustDown(this.enter)){
      this.scene.start("PreGameScene")};
  }
}
