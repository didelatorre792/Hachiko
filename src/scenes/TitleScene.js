export default class TutorialScene extends Phaser.Scene {
  constructor () {
    super('TutorialScene');}



  create() {
    this.background = this.add.image(400, 300, "tutorial").setScale(2)

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }

  update(){

    var cursors = this.input.keyboard.createCursorKeys();
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.scene.start('PreGameScene')
    }
  }
}
