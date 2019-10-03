export default class EndScene extends Phaser.Scene {
  constructor () {
    super('EndScene');
  }

  init (data) {

    this.condition = data.condition;
  }

  preload(){
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

  }

  create(){
    console.log(this.condition);
    
    if (this.condition == 'Win'){
      var text = this.add.text(this.centerX - 75, this.centerY, "You got Hachiko!", 40);
    }else if (this.condition == 'Lose') {
      var text = this.add.text(this.centerX - 75, this.centerY, "You Died!", 40);
    }

  }




}
