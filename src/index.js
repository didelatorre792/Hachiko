/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';
import Scene0 from './config/Scene0.js';
import Scene1 from './config/Scene1.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Scene0', Scene0);
    this.scene.add('Scene1', Scene1);
    this.scene.start('Boot');
  }
}

window.game = new Game();
