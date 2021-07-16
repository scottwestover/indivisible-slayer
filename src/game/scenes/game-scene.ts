import { createWorld, IWorld, System } from 'bitecs';
import createSpriteSystem from '../ecs/systems/sprite-system';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class GameScene extends BaseScene {
  private world!: IWorld;

  private spriteSystem!: System;

  constructor() {
    super({
      key: SceneKeys.GameScene,
      active: false,
    });
  }

  public create(): void {
    this.world = createWorld();
    this.spriteSystem = createSpriteSystem(this, []);
  }

  public update(t: number, dt: number): void {
    if (!this.world || !this.spriteSystem) {
      return;
    }
    // run systems
    this.spriteSystem(this.world);
  }
}
