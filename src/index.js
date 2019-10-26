/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';
//import MasterFile from './scenes/MasterFile.js';
import PreGameScene from './scenes/PreGameScene.js';
import TutorialScene from './scenes/TutorialScene.js';
import NeighborhoodScene from './scenes/NeighborhoodScene.js';
import AlleyScene from './scenes/AlleyScene.js';
import ParkScene from './scenes/ParkScene.js';
import EndScene from './scenes/EndScene.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    //this.scene.add('MasterFile', MasterFile);
    this.scene.add('PreGameScene', PreGameScene);
    this.scene.add('TutorialScene', TutorialScene);
    this.scene.add('NeighborhoodScene', NeighborhoodScene);
    this.scene.add('AlleyScene', AlleyScene);
    this.scene.add('ParkScene', ParkScene);
    this.scene.add('EndScene', EndScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
