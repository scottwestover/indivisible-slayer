import { createWorld, IWorld, System } from 'bitecs';
import { NUMBER_TEXT_STYLE, TEXT_STYLE } from '../config';
import createSpriteSystem from '../ecs/systems/sprite-system';
import { scaleGameObjectToGameWidth } from '../lib/align';
import Timer from '../lib/timer';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class GameScene extends BaseScene {
  private world!: IWorld;

  private spriteSystem!: System;

  private timer!: Timer;

  private score: number;

  private scoreText!: Phaser.GameObjects.Text;

  private mainNumberText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: SceneKeys.GameScene,
      active: false,
    });

    this.score = 0;
  }

  public init(): void {
    this.timer = new Timer(this);
  }

  public create(): void {
    this.createGrid();
    this.world = createWorld();
    this.spriteSystem = createSpriteSystem(this, []);

    this.timer.create();
    this.scoreText = this.add.text(0, 0, this.getScoreText(), TEXT_STYLE);

    this.mainNumberText = this.add.text(
      0, 0, this.getMainNumberText(), NUMBER_TEXT_STYLE,
    ).setOrigin(0.5);

    this.scale.on(Phaser.Scale.Events.RESIZE, this.resizeGame, this);
    this.resizeGame(this.scale.gameSize);
  }

  public update(t: number, dt: number): void {
    if (!this.world || !this.spriteSystem) {
      return;
    }
    // run systems
    this.spriteSystem(this.world);

    this.timer.update();
  }

  private resizeGame(gameSize: Phaser.Structs.Size): void {
    this.resize(gameSize);

    const { width, height } = gameSize;

    this.grid.showNumbers();

    this.timer.container.setScale(1 * (width / height));
    this.grid.placeAtIndex(60, this.timer.container);

    scaleGameObjectToGameWidth(this.scoreText, width, 0.3);
    this.grid.placeAtIndex(0, this.scoreText);

    scaleGameObjectToGameWidth(this.mainNumberText, width, 0.2);
    this.grid.placeAtIndex(60, this.mainNumberText);
  }

  private getScoreText(): string {
    return `SCORE:  ${this.score}`;
  }

  private getMainNumberText(): string {
    return '4';
  }
}
