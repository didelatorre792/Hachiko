/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';

import Scene0 from './scenes/Scene0.js';
import Scene1 from './scenes/Scene1.js';
import MasterFile from './scenes/MasterFile.js';
import EndScene from './scenes/EndScene.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Scene0', Scene0);
    this.scene.add('Scene1', Scene1);
    this.scene.add('MasterFile', MasterFile);
    this.scene.add('EndScene', EndScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
