export default class EndScene extends Phaser.Scene {
  constructor () {
    super('EndScene');
  }

  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.itemsCollected = data.itemsCollected;
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //this.add.text(this.centerX - 160, this.centerY - 40, "Congratulations! You found Hachikō.", 40);
    if (this.itemsCollected == 0) {
      this.cameras.main.setBackgroundColor(0x9F2B30);
      this.add.text(this.centerX - 305, this.centerY, "You didn't get any of his things, so he doesn't remember you");
      this.add.text(this.centerX - 220, this.centerY + 80, "TRY AGAIN TO GET HACHIKŌ TO COME HOME WITH YOU");
      this.add.text(this.centerX - 128, this.centerY + 200, "Press ENTER to restart")
    } else if (this.itemsCollected == 5) {
      this.cameras.main.setBackgroundColor(0xECCE00);
      this.add.image(this.centerX, 150, "hachiko").setScale();
      this.add.text(this.centerX - 175, this.centerY, "You collected all of Hachikō's things!", 40);
      this.add.text(this.centerX - 230, this.centerY + 80, "You got an A+ and Hachikō is coming home with you!");
      this.add.text(this.centerX - 128, this.centerY + 200, "Press ENTER to restart")
    } else {
      this.cameras.main.setBackgroundColor(0xEC9284);
      this.add.text(this.centerX - 170, this.centerY, "You collected "+this.itemsCollected+" of HACHIKŌ's things!", 40);
      var scoreArray = ["F", "D", "C", "B", "A", "A+"];
      this.add.text(this.centerX - 115, this.centerY + 80, "You got a "+scoreArray[this.itemsCollected]+". TRY AGAIN!");
      this.add.text(this.centerX - 128, this.centerY + 200, "Press ENTER to restart")
    };
  }

  update(){
    var cursors = this.input.keyboard.createCursorKeys();
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('NeighborhoodScene')
    }
  }

}
