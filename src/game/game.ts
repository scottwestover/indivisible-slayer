import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from './config';
import * as Scenes from './scenes';

export default class Game {
  private readonly game: Phaser.Game;

  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scale: {
        parent: 'game',
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        mode: Phaser.Scale.RESIZE,
      },
      scene: [
        Scenes.PreloadScene,
        Scenes.GameScene,
        Scenes.GameOverScene,
      ],
    };

    this.game = new Phaser.Game(config);
  }
}
