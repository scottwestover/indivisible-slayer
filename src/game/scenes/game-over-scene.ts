import AssetKeys from '../assets/asset-keys';
import { TEXT_STYLE } from '../config';
import { scaleGameObjectToGameWidth } from '../lib/align';
import Button from '../lib/components/button';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class GameOverScene extends BaseScene {
  private gameOverText!: Phaser.GameObjects.Text;

  private buttonContainer!: Phaser.GameObjects.Container;

  private button!: Button;

  constructor() {
    super({
      key: SceneKeys.GameOverScene,
      active: false,
    });
  }

  public create(): void {
    this.createGrid();
    this.gameOverText = this.add.text(0, 0, 'GAME OVER', TEXT_STYLE).setOrigin(0.5);

    this.buttonContainer = this.add.container();
    this.button = new Button({
      scene: this,
      defaultImageKey: AssetKeys.GreyButton,
      hoverButtonImageKey: AssetKeys.GreyButtonPressed,
    });
    this.buttonContainer.add(this.button.image);
    const playAgainTextStyle = { ...TEXT_STYLE };
    playAgainTextStyle.color = 'blue';
    playAgainTextStyle.fontSize = '14px';
    const playAgainText = this.add.text(0, 0, 'Play Again?', playAgainTextStyle).setOrigin(0.5);
    this.buttonContainer.add(playAgainText);

    this.scale.on(Phaser.Scale.Events.RESIZE, this.resizeGame, this);
    this.resizeGame(this.scale.gameSize);
  }

  private resizeGame(gameSize: Phaser.Structs.Size): void {
    this.resize(gameSize);

    const { width, height } = gameSize;

    this.grid.showNumbers();

    scaleGameObjectToGameWidth(this.gameOverText, width, 0.8);
    this.grid.placeAtIndex(27, this.gameOverText);

    this.buttonContainer.setScale(1.4 * (width / height));
    this.grid.placeAtIndex(71, this.buttonContainer);
  }
}
