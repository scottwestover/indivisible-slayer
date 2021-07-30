import AssetKeys from '../assets/asset-keys';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

function loadCustomFont(): void {
  const element = document.createElement('style');
  document.head.appendChild(element);
  const { sheet } = element;
  let styles = '@font-face { font-family: "KennyBlocks"; src: url("assets/fonts/kenny_blocks.ttf") format("opentype"); }';
  (sheet as CSSStyleSheet).insertRule(styles, 0);
  styles = '@font-face { font-family: "KennyFutureNarrow"; src: url("assets/fonts/kenney_future_narrow.ttf") format("opentype"); }';
}

export default class PreloadScene extends BaseScene {
  constructor() {
    super({
      key: SceneKeys.PreloadScene,
      active: false,
    });
  }

  public preload(): void {
    loadCustomFont();
    this.load.image(AssetKeys.GreyButton, 'assets/images/ui/grey.png');
    this.load.image(AssetKeys.GreyButtonPressed, 'assets/images/ui/grey_pressed.png');
    this.load.image(AssetKeys.Example1, 'assets/images/example1.png');
    this.load.image(AssetKeys.Example2, 'assets/images/example2.png');
    this.load.image(AssetKeys.Example3, 'assets/images/example3.png');
    this.load.image(AssetKeys.GitHub, 'assets/images/github_light.png');
    this.load.audio(AssetKeys.BGMusic, 'assets/audio/rise-and-shine.mp3');
  }

  public create(): void {
    const { scene } = this;
    (window as any).WebFont.load({
      custom: {
        families: ['KennyBlocks'],
      },
      active() {
        scene.launch(SceneKeys.AudioManagerScene);
        scene.start(SceneKeys.TitleScene);
      },
    });
  }
}
