import { NUMBER_TEXT_STYLE, TEXT_STYLE } from '../config';
import { scaleGameObjectToGameWidth } from '../lib/align';
import Timer from '../lib/timer';
import { shuffleArray } from '../lib/utils';
import { randomInteger } from '../lib/utils/random';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class GameScene extends BaseScene {
  private timer!: Timer;

  private score: number;

  private scoreText!: Phaser.GameObjects.Text;

  private mainNumberText!: Phaser.GameObjects.Text;

  private currentMainNumber: number;

  private currentActiveChoices: number[];

  private spawnLocations: number[];

  constructor() {
    super({
      key: SceneKeys.GameScene,
      active: false,
    });

    this.score = 0;
    this.currentMainNumber = 0;
    this.currentActiveChoices = [];
    this.spawnLocations = [
      24, 30, 90, 96, 82, 38,
    ];
  }

  public init(): void {
    this.timer = new Timer({
      scene: this,
      timerTimeInSeconds: 10,
      timerCompleteCallback: this.timerCallback.bind(this),
    });
    this.score = 0;
  }

  public create(): void {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
      this.createGrid();

      this.generateNumbers();

      for (let i = 0; i < this.currentActiveChoices.length; i += 1) {
        this.createChoiceTextGameObject(this.currentActiveChoices[i], this.spawnLocations[i]);
      }

      this.timer.create();
      this.scoreText = this.add.text(0, 0, this.getScoreText(), TEXT_STYLE);

      this.mainNumberText = this.add.text(
        0, 0, this.getMainNumberText(), NUMBER_TEXT_STYLE,
      ).setOrigin(0.5);

      this.positionObjects(this.scale.gameSize);
    });
  }

  public update(): void {
    this.timer.update();
  }

  private positionObjects(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;

    // this.grid.showNumbers();

    this.timer.container.setScale(1 * (width / height));
    this.grid.placeAtIndex(60, this.timer.container);

    scaleGameObjectToGameWidth(this.scoreText, width, 0.3);
    this.grid.placeAtIndex(0, this.scoreText);

    this.grid.placeAtIndex(60, this.mainNumberText);
  }

  private getScoreText(): string {
    return `SCORE:  ${this.score}`;
  }

  private getMainNumberText(): string {
    return this.currentMainNumber.toString();
  }

  private generateNumbers(): void {
    const mainNumber = randomInteger(2, 9);

    // create pool of numbers
    const possibleNumbers: number[] = [];

    for (let i = 2; i < 12; i += 1) {
      possibleNumbers.push(i * mainNumber);
    }
    shuffleArray(possibleNumbers);

    const playerOptions: number [] = [];
    // pull four values from bag for player choices
    for (let i = 0; i < 4; i += 1) {
      playerOptions.push(possibleNumbers.pop() as number);
    }

    // chose number of divisible numbers
    const totalNumberOfDivisbleNumbers = randomInteger(1, 3);

    // modify player options to include indivisible numbers
    for (let i = 0; i < 4 - totalNumberOfDivisbleNumbers; i += 1) {
      // get random modifier based the main number
      let modifier = randomInteger(1, mainNumber - 1);
      // random number for adding or subtracting
      const isNegative = randomInteger(0, 1);
      if (isNegative) {
        modifier *= -1;
      }
      playerOptions[i] += modifier;
    }

    this.currentActiveChoices = playerOptions;
    this.currentMainNumber = mainNumber;
  }

  private createChoiceTextGameObject(value: number, position: number): void {
    const text = this.add.text(0, 0, `${value}`, TEXT_STYLE);
    text.setOrigin(0.5);
    text.setInteractive();
    text.addListener(Phaser.Input.Events.POINTER_DOWN, () => {
      this.playerClickedChoiceTextObject(value, text);
    }, this);
    this.grid.placeAtIndex(position, text);
  }

  private playerClickedChoiceTextObject(value: number, object: Phaser.GameObjects.Text): void {
    if (value % this.currentMainNumber === 0) {
      // console.log(`${value} is divisible by ${this.currentMainNumber}`);
      this.decrementScore();
      this.cameras.main.shake();
    } else {
      // console.log(`${value} is indivisible by ${this.currentMainNumber}`);
      this.incrementScore();
    }
    object.disableInteractive();

    // check to see if there is anymore remaining indivisible numbers

    // if not, have object fade out
    this.tweens.add({
      targets: object,
      alpha: 0,
      duration: 1200,
      ease: 'Power2',
      onComplete: () => {
        object.destroy();
      },
    });

    // otherwise remove all numbers and redo them all
  }

  private timerCallback(): void {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(SceneKeys.GameOverScene, { score: this.score });
    });
  }

  private incrementScore(): void {
    this.score += 10;
    this.updateScoreText();
  }

  private decrementScore(): void {
    if (this.score === 0) {
      return;
    }
    this.score -= 10;
    this.updateScoreText();
  }

  private updateScoreText(): void {
    this.scoreText.setText(this.getScoreText());
  }
}
