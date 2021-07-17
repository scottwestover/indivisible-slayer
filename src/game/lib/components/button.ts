import * as Phaser from 'phaser';

export interface ButtonConfiguration {
  scene: Phaser.Scene;
  defaultImageKey: string;
  hoverButtonImageKey: string;
  x?: number;
  y?: number;
  clickCallBack?: Function;
}

export default class Button {
  private readonly buttonImage: Phaser.GameObjects.Image;

  private readonly defaultButtonAssetKey: string;

  private readonly hoverButtonAssetKey: string;

  constructor(config: ButtonConfiguration) {
    const {
      scene, defaultImageKey, hoverButtonImageKey, x = 0, y = 0, clickCallBack,
    } = config;

    this.defaultButtonAssetKey = defaultImageKey;
    this.hoverButtonAssetKey = hoverButtonImageKey;

    this.buttonImage = scene.add.image(x, y, defaultImageKey);
    this.buttonImage.setInteractive();

    this.buttonImage.on(Phaser.Input.Events.POINTER_OVER, () => {
      this.buttonImage.setTexture(this.hoverButtonAssetKey);
    }, this);

    this.buttonImage.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.buttonImage.setTexture(this.defaultButtonAssetKey);
    }, this);

    if (clickCallBack) {
      this.buttonImage.on(Phaser.Input.Events.POINTER_DOWN, clickCallBack);
    }
  }

  get image(): Phaser.GameObjects.Image {
    return this.buttonImage;
  }
}
