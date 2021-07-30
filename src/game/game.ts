import Phaser from 'phaser';
import { BACKGROUND_COLOR, GAME_HEIGHT, GAME_WIDTH } from './config';
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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: BACKGROUND_COLOR,
      scene: [
        Scenes.PreloadScene,
        Scenes.GameScene,
        Scenes.GameOverScene,
        Scenes.TitleScene,
        Scenes.HowToScene,
        Scenes.AudioManagerScene,
      ],
    };

    this.game = new Phaser.Game(config);
  }
}
