/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';


import MasterFile from './scenes/MasterFile.js';
import EndScene from './scenes/EndScene.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('MasterFile', MasterFile);
    this.scene.add('EndScene', EndScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
