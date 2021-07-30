import SceneKeys from './scene-keys';
import AssetKeys from '../assets/asset-keys';
import BaseScene from './base-scene';

export default class AudioManagerScene extends BaseScene {
  constructor() {
    super({
      key: SceneKeys.AudioManagerScene,
      active: false,
    });
  }

  public create(): void {
    const bgMusic = this.sound.add(AssetKeys.BGMusic, {
      loop: true,
      volume: 0.1,
    });
    bgMusic.play();
  }
}
