import { createWorld, IWorld, System } from 'bitecs';
import { CONTAINER_SCALE_FACTOR } from '../config';
import createSpriteSystem from '../ecs/systems/sprite-system';
import { AlignGrid, scaleGameObjectToGameWidth } from '../lib/align';
import Timer from '../lib/timer';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class GameScene extends BaseScene {
  private world!: IWorld;

  private spriteSystem!: System;

  private grid!: AlignGrid;

  private timer!: Timer;

  constructor() {
    super({
      key: SceneKeys.GameScene,
      active: false,
    });
  }

  private init(): void {
    this.timer = new Timer(this);
  }

  public create(): void {
    this.world = createWorld();
    this.spriteSystem = createSpriteSystem(this, []);

    this.grid = new AlignGrid(this, 11, 11, this.getSceneWidth(), this.getSceneHeight());
    this.timer.create();

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

    this.grid.resize(gameSize.width, gameSize.height);
    this.grid.showNumbers();

    // scaleGameObjectToGameWidth(this.timer.container, this.getSceneWidth(), 100);
    console.log(gameSize.width);
    console.log(gameSize.height);
    this.timer.container.setScale(1 * gameSize.width / gameSize.height);
    this.grid.placeAtIndex(60, this.timer.container);
  }
}
