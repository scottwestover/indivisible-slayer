import * as Phaser from 'phaser';

export default abstract class BaseScene extends Phaser.Scene {
  protected getSceneWidth(): number {
    return this.scale.width;
  }

  protected getSceneHeight(): number {
    return this.scale.height;
  }

  protected setView(x: number, y: number): void {
    this.cameras.main.centerOn(x, y);
  }

  protected setViewCentered(): void {
    this.setView(0, 0);
  }

  protected resize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;

    this.cameras.resize(width, height);
  }
}
