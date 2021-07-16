import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class PreloadScene extends BaseScene {
  constructor() {
    super({
      key: SceneKeys.PreloadScene,
      active: false,
    });
  }

  public create(): void {
    this.scene.start(SceneKeys.GameScene);
  }
}
