/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';
import PreGameScene from './scenes/PreGameScene.js';
import TitleScene from './scenes/TitleScene.js';
import NeighborhoodScene from './scenes/NeighborhoodScene.js';
import AlleyScene from './scenes/AlleyScene.js';
import ParkScene from './scenes/ParkScene.js';
import ToyShopScene from './scenes/ToyShopScene.js';
import EndScene from './scenes/EndScene.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('PreGameScene', PreGameScene);
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('NeighborhoodScene', NeighborhoodScene);
    this.scene.add('AlleyScene', AlleyScene);
    this.scene.add('ParkScene', ParkScene);
    this.scene.add('ToyShopScene', ToyShopScene);
    this.scene.add('EndScene', EndScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
