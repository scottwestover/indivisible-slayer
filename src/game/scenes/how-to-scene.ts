import AssetKeys from '../assets/asset-keys';
import { DEBUG, TEXT_STYLE } from '../config';
import { scaleGameObjectToGameWidth } from '../lib/align';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

const text1 = 'An indivisible number\nis a number that cannot\nbe divided into equal parts.\n\nExample: 5 is indivisible by 2.';
const text2 = 'The large number in the center\nof the screen\nis the divisor.';
const text3 = 'The smaller numbers\nare the dividends.';
const text4 = 'Click on the indivisible\nnumbers to earn points.';

export default class HowToScene extends BaseScene {
  private titleText!: Phaser.GameObjects.Text;

  private subText!: Phaser.GameObjects.Text;

  private exampleImage!: Phaser.GameObjects.Image;

  private counter!: number;

  constructor() {
    super({
      key: SceneKeys.HowToScene,
      active: false,
    });
  }

  public init(): void {
    this.counter = 1;
  }

  public create(): void {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.createGrid();

    this.titleText = this.add.text(0, 0, 'GOAL:\nSlay the indivisible numbers\nand claim the high score!', TEXT_STYLE).setOrigin(0.5);

    this.subText = this.add.text(0, 0, text1, TEXT_STYLE).setOrigin(0.5);

    this.exampleImage = this.add.image(0, 0, AssetKeys.Example1);

    this.input.on('pointerdown', () => {
      this.counter += 1;
      switch (this.counter) {
        case 2:
          this.transitionText(text2, AssetKeys.Example2);
          break;
        case 3:
          this.transitionText(text3, AssetKeys.Example3);
          break;
        case 4:
          this.transitionText(text4, AssetKeys.Example3);
          break;
        case 5:
          this.cameras.main.fadeOut(1000, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start(SceneKeys.TitleScene);
          });
          break;
        default:
          break;
      }
    });

    this.positionObjects(this.scale.gameSize);
  }

  private positionObjects(gameSize: Phaser.Structs.Size): void {
    const { width } = gameSize;

    if (DEBUG) {
      this.grid.showNumbers();
    }

    scaleGameObjectToGameWidth(this.titleText, width, 0.8);
    this.grid.placeAtIndex(16, this.titleText);

    scaleGameObjectToGameWidth(this.exampleImage, width, 0.55);
    this.grid.placeAtIndex(60, this.exampleImage);

    scaleGameObjectToGameWidth(this.subText, width, 0.8);
    this.grid.placeAtIndex(104, this.subText);
  }

  private transitionText(newSubText: string, newExampleImage: string): void {
    this.tweens.add({
      targets: [this.subText, this.exampleImage],
      alpha: 0,
      duration: 400,
      ease: 'Power2',
      onComplete: () => {
        this.subText.setText(newSubText);
        this.exampleImage.setTexture(newExampleImage);
        this.tweens.add({
          targets: [this.subText, this.exampleImage],
          alpha: 1,
          duration: 400,
          ease: 'Power2',
        });
      },
    });
  }
}
