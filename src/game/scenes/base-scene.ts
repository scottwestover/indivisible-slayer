import * as Phaser from 'phaser';
import { GRID_COLS, GRID_ROWS } from '../config';
import { AlignGrid } from '../lib/align';

export default abstract class BaseScene extends Phaser.Scene {
  protected grid!: AlignGrid;

  protected createGrid(): void {
    this.grid = new AlignGrid(
      this, GRID_ROWS, GRID_COLS, this.getSceneWidth(), this.getSceneHeight(),
    );
  }

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
    if (this.grid) {
      this.grid.resize(width, height);
    }
  }
}
