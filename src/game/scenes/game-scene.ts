import { createWorld, IWorld, System } from 'bitecs';
import { CONTAINER_SCALE_FACTOR } from '../config';
import createSpriteSystem from '../ecs/systems/sprite-system';
import { AlignGrid, scaleGameObjectToGameWidth } from '../lib/align';
import Timer from '../lib/timer';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

function loadCustomFont(): void {
  const element = document.createElement('style');
  document.head.appendChild(element);
  const { sheet } = element;
  const styles = '@font-face { font-family: "KennyBlocks"; src: url("assets/fonts/kenny_blocks.ttf") format("opentype"); }';
  (sheet as CSSStyleSheet).insertRule(styles, 0);
  console.log(sheet);
}

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

  public init(): void {
    loadCustomFont();
    this.timer = new Timer(this);
  }

  public preload(): void {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  public create(): void {
    this.world = createWorld();
    this.spriteSystem = createSpriteSystem(this, []);

    this.grid = new AlignGrid(this, 11, 11, this.getSceneWidth(), this.getSceneHeight());
    this.timer.create();

    const { add } = this;
    WebFont.load({
      custom: {
        families: ['KennyBlocks'],
      },
      active() {
        add.text(32, 32, 'The face of the\nmoon was in\nshadow.', { fontFamily: 'KennyBlocks' });
      },
    });

    this.add.text(50, 100, 'Button');
    this.add.text(50, 50, 'Button', { fontFamily: 'KennyBlocks' });

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
