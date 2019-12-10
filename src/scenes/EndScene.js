export default class EndScene extends Phaser.Scene {
  constructor () {
    super('EndScene');
  }

  init (data) {
    // Initialization code goes here
    // Pass parameters between scenes - get data from another scene
    this.itemsCollected = data.itemsCollected;
    this.deathScene = data.deathScene;
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create(){
    //this.itemsCollected = 0;
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    //this.add.text(this.centerX - 160, this.centerY - 40, "Congratulations! You found Hachikō.", 40);
    if (this.itemsCollected == 0) {
      console.log("nothing");
      this.add.image(400, 300, "board").setScale(1).setDepth(0);
      this.add.text(this.centerX - 305, this.centerY, "You didn't get any of his things, so he doesn't remember you").setStyle({color: "#000"});
      this.add.text(this.centerX - 220, this.centerY + 40, "TRY AGAIN TO GET HACHIKŌ TO COME HOME WITH YOU").setStyle({color: "#000"});
      this.add.text(this.centerX - 128, this.centerY + 80, "Press ENTER to restart level").setStyle({color: "#000"});
      this.add.text(this.centerX - 115, this.centerY + 200, "Press ESC to restart game").setStyle({color: "#000"});

      this.add.image(80, 100, "player").setScale(.5);

      var Nohachiko = this.add.image(600, 150, "hachiko").setScale(.25);

      this.tweens.add({
        targets: Nohachiko,
        x: 1000,
        ease: 'Linear',
        delay: 600,
        duration:3000,
        yoyo: false
      });

    } else if (this.itemsCollected == 8) {
      this.add.image(400, 300, "board").setScale(1).setDepth(0);
      this.add.text(this.centerX - 175, this.centerY, "You collected all of Hachikō's things!", 40).setStyle({color: "#000"});
      this.add.text(this.centerX - 230, this.centerY + 40, "You got an A+ and Hachikō is coming home with you!").setStyle({color: "#000"});
      this.add.text(this.centerX - 128, this.centerY + 80, "Press ENTER to restart level").setStyle({color: "#000"});
      this.add.text(this.centerX - 115, this.centerY + 200, "Press ESC to restart game").setStyle({color: "#000"});

      this.add.image(300, 100, "player").setScale(.5);

      this.Yeshachiko = this.add.image(350, 150, "hachiko").setScale(.25);

    } else {
      this.add.image(400, 300, "board").setScale(1).setDepth(0);
      this.add.text(this.centerX - 170, this.centerY, "You collected "+this.itemsCollected+" of HACHIKŌ's things!", 40).setStyle({color: "#000"});
      var scoreArray = ["an F", "a D+", "a D", "a C", "a C+", "a B", "a B+","an A-", "an A"];
      this.add.text(this.centerX - 115, this.centerY + 40, "You got "+scoreArray[this.itemsCollected]+" TRY AGAIN!").setStyle({color: "#000"});
      this.add.text(this.centerX - 128, this.centerY + 80, "Press ENTER to restart level").setStyle({color: "#000"});
      this.add.text(this.centerX - 115, this.centerY + 200, "Press ESC to restart game").setStyle({color: "#000"});
      this.add.image(80, 100, "player").setScale(.5);

      //var Tweenhachiko = this.add.sprite(600, 150, "hachiko").setScale(.25).flipX = true;
      var Tweenhachiko = this.add.sprite(600, 150, "hachiko").setScale(.25);

      this.tweens.add({
        targets: Tweenhachiko,
        x: 580,
        ease: 'Linear',
        delay: 300,
        duration:500,
        yoyo: true,
        repeat: 6
      });
      //this.Twiko(this.Tweenhachiko);

    }

  }

  update(){
    //console.log(this.deathScene);

    var cursors = this.input.keyboard.createCursorKeys();
    if (Phaser.Input.Keyboard.JustDown(this.enter)){
      if(this.deathScene == "Alley"){
        this.scene.start('AlleyScene');
        console.log("back to alley");
      }
      else if(this.deathScene == "Toy"){
        this.scene.start('ToyShopScene');
        console.log("back to toy shop");
      }
      else if(this.deathScene == "Park"){
        this.scene.start('ParkScene');
        console.log("back to park");
      }
      else{
        this.scene.start('NeighborhoodScene');
        console.log("back to neighborhood");
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.esc)){
      this.scene.start("TitleScene")
      }


  }

  Nochiko(hachiko){
    console.log("no chiko");

    console.log(hachiko, "position");
  }

  Twiko(hachiko){
    console.log("little chiko");

  }

}
