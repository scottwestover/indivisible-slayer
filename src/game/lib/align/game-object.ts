import * as Phaser from 'phaser';

export type GameObject =
  | Phaser.GameObjects.Image
  | Phaser.GameObjects.Sprite
  | Phaser.GameObjects.Text
  | Phaser.GameObjects.Container;
