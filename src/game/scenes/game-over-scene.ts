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

  private scoreText!: Phaser.GameObjects.Text;

  private highScoreText!: Phaser.GameObjects.Text;

  private score!: number;

  constructor() {
    super({
      key: SceneKeys.GameOverScene,
      active: false,
    });
  }

  public init(data: { score: number }): void {
    this.score = data.score || 0;
  }

  public create(): void {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.createGrid();
    this.gameOverText = this.add.text(0, 0, 'GAME OVER', TEXT_STYLE).setOrigin(0.5);

    this.buttonContainer = this.add.container();
    this.button = new Button({
      scene: this,
      defaultImageKey: AssetKeys.GreyButton,
      hoverButtonImageKey: AssetKeys.GreyButtonPressed,
      clickCallBack: () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.button.image.disableInteractive();
      },
    });
    this.buttonContainer.add(this.button.image);
    const playAgainTextStyle = { ...TEXT_STYLE };
    playAgainTextStyle.color = 'black';
    playAgainTextStyle.fontSize = '14px';
    const playAgainText = this.add.text(0, 0, 'Play Again?', playAgainTextStyle).setOrigin(0.5);
    this.buttonContainer.add(playAgainText);

    this.scoreText = this.add.text(0, 0, `SCORE:  ${this.score}`, TEXT_STYLE).setOrigin(0.5);
    this.highScoreText = this.add.text(0, 0, `HIGH SCORE:  ${this.score}`, TEXT_STYLE).setOrigin(0.5);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(SceneKeys.GameScene);
    });

    this.positionObjects(this.scale.gameSize);
  }

  private positionObjects(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    // this.grid.showNumbers();

    scaleGameObjectToGameWidth(this.gameOverText, width, 0.8);
    this.grid.placeAtIndex(27, this.gameOverText);

    this.buttonContainer.setScale(5 * (width / height));
    this.grid.placeAtIndex(104, this.buttonContainer);

    scaleGameObjectToGameWidth(this.scoreText, width, 0.4);
    this.grid.placeAtIndex(49, this.scoreText);

    scaleGameObjectToGameWidth(this.highScoreText, width, 0.55);
    this.grid.placeAtIndex(71, this.highScoreText);
  }
}
