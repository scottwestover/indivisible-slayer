import { DEBUG, TEXT_STYLE } from '../config';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';
import Button from '../lib/components/button';
import AssetKeys from '../assets/asset-keys';
import { scaleGameObjectToGameWidth } from '../lib/align';
import { openExternalLink } from '../lib/utils';

export default class TitleScene extends BaseScene {
  private titleText!: Phaser.GameObjects.Text;

  private buttonContainer!: Phaser.GameObjects.Container;

  private button!: Button;

  private howToPlayButtonContainer!: Phaser.GameObjects.Container;

  private howToPlayButton!: Button;

  private gitHubImage!: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: SceneKeys.TitleScene,
      active: false,
    });
  }

  public create(): void {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.createGrid();

    this.titleText = this.add.text(0, 0, 'INDIVISIBLE\nSLAYER', TEXT_STYLE).setOrigin(0.5);

    this.buttonContainer = this.add.container();
    this.button = new Button({
      scene: this,
      defaultImageKey: AssetKeys.GreyButton,
      hoverButtonImageKey: AssetKeys.GreyButtonPressed,
      clickCallBack: () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.button.image.disableInteractive();
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.start(SceneKeys.GameScene);
        });
      },
    });
    this.buttonContainer.add(this.button.image);
    const playTextStyle = { ...TEXT_STYLE };
    playTextStyle.color = 'black';
    playTextStyle.fontSize = '14px';
    const playAgainText = this.add.text(0, 0, 'Play', playTextStyle).setOrigin(0.5);
    this.buttonContainer.add(playAgainText);

    this.howToPlayButtonContainer = this.add.container();
    this.howToPlayButton = new Button({
      scene: this,
      defaultImageKey: AssetKeys.GreyButton,
      hoverButtonImageKey: AssetKeys.GreyButtonPressed,
      clickCallBack: () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.howToPlayButton.image.disableInteractive();
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.start(SceneKeys.HowToScene);
        });
      },
    });
    this.howToPlayButtonContainer.add(this.howToPlayButton.image);
    const howToPlayText = this.add.text(0, 0, 'How To Play', playTextStyle).setOrigin(0.5);
    this.howToPlayButtonContainer.add(howToPlayText);

    this.gitHubImage = this.add.image(0, 0, AssetKeys.GitHub);
    this.gitHubImage.setInteractive();
    this.gitHubImage.on(Phaser.Input.Events.POINTER_DOWN, () => {
      openExternalLink('https://github.com/scottwestover/indivisible-slayer');
    });

    this.positionObjects(this.scale.gameSize);
  }

  private positionObjects(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;

    if (DEBUG) {
      this.grid.showNumbers();
    }

    scaleGameObjectToGameWidth(this.titleText, width, 0.8);
    this.grid.placeAtIndex(27, this.titleText);

    this.buttonContainer.setScale(5 * (width / height));
    this.grid.placeAtIndex(71, this.buttonContainer);

    this.howToPlayButtonContainer.setScale(5 * (width / height));
    this.grid.placeAtIndex(82, this.howToPlayButtonContainer);

    scaleGameObjectToGameWidth(this.gitHubImage, width, 0.15);
    this.grid.placeAtIndex(104, this.gitHubImage);
  }
}
