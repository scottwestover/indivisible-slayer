import * as Phaser from 'phaser';
import { GameObject } from './game-object';

export default class AlignGrid {
  private readonly scene: Phaser.Scene;

  private graphics: Phaser.GameObjects.Graphics | undefined;

  private textGroup: Phaser.GameObjects.Group;

  private readonly numberOfRows: number;

  private readonly numberOfCols: number;

  private width: number;

  private height: number;

  private cellWidth: number;

  private cellHeight: number;

  constructor(
    scene: Phaser.Scene, numberOfRows: number, numberOfCols: number, width: number, height: number,
  ) {
    this.scene = scene;
    this.numberOfCols = numberOfCols;
    this.numberOfRows = numberOfRows;
    this.height = height;
    this.width = width;

    this.cellHeight = height / numberOfRows;
    this.cellWidth = width / numberOfCols;

    this.textGroup = this.scene.add.group([]);
  }

  public resize(width: number, height: number): void {
    this.height = height;
    this.width = width;

    this.cellHeight = height / this.numberOfRows;
    this.cellWidth = width / this.numberOfCols;

    if (this.graphics) {
      this.drawGrid(this.graphics);
    }

    const textGroupChildren = this.textGroup.getChildren();
    for (let i = 0; i < textGroupChildren.length; i += 1) {
      this.placeAtIndex(i, textGroupChildren[i] as Phaser.GameObjects.Text);
    }
  }

  public showGrid(): void {
    if (!this.graphics) {
      this.graphics = this.scene.add.graphics();
      this.graphics.setDepth(-1);
      this.drawGrid(this.graphics);
    }
  }

  public placeGameObjectAtPosition(x: number, y: number, obj: GameObject): void {
    const updatedXPosition = this.cellWidth * x + this.cellWidth / 2;
    const updatedYPosition = this.cellHeight * y + this.cellHeight / 2;

    obj.x = updatedXPosition;
    obj.y = updatedYPosition;
  }

  public placeAtIndex(index: number, obj: GameObject): void {
    const y = Math.floor(index / this.numberOfCols);
    const x = index - y * this.numberOfCols;

    this.placeGameObjectAtPosition(x, y, obj);
  }

  public showNumbers(): void {
    this.showGrid();
    let count = 0;
    for (let i = 0; i < this.numberOfRows; i += 1) {
      for (let j = 0; j < this.numberOfCols; j += 1) {
        const numText = this.scene.add.text(0, 0, count.toString(), { color: '#ff0000' });
        numText.setOrigin(0.5, 0.5);
        numText.setDepth(-1);
        this.placeAtIndex(count, numText);
        this.textGroup.add(numText);

        count += 1;
      }
    }
  }

  private drawGrid(graphics: Phaser.GameObjects.Graphics): void {
    graphics.clear();
    graphics.lineStyle(2, 0xff0000);

    for (let i = 0; i < this.width; i += this.cellWidth) {
      graphics.moveTo(i, 0);
      graphics.lineTo(i, this.height);
    }

    for (let i = 0; i < this.height; i += this.cellHeight) {
      graphics.moveTo(0, i);
      graphics.lineTo(this.width, i);
    }

    graphics.strokePath();
  }
}
