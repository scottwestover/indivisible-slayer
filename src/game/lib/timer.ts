export default class Timer {
  private mainContainer!: Phaser.GameObjects.Container;

  private graphics!: Phaser.GameObjects.Graphics;

  private remainingTimeInMilliSeconds: number;

  private timer!: Phaser.Time.TimerEvent;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly timerTimeInSeconds: number = 30,
  ) {
    this.remainingTimeInMilliSeconds = timerTimeInSeconds * 1000;
  }

  get container(): Phaser.GameObjects.Container {
    return this.mainContainer;
  }

  public create(): void {
    this.mainContainer = this.scene.add.container();
    this.graphics = this.scene.add.graphics();
    this.mainContainer.add(this.graphics);
    this.drawArc(270);

    // create a loop timer
    this.timer = this.scene.time.addEvent({
      loop: true,
      callback: this.decrementTime,
      callbackScope: this,
      delay: 50,
    });
  }

  public update(): void {
    if (!this.graphics) {
      return;
    }

    // calculate remaining fill
    const remainingFillInDegrees = (
      (this.remainingTimeInMilliSeconds / (this.timerTimeInSeconds * 1000)) * 360) - 90;

    this.drawArc(remainingFillInDegrees);
  }

  public decrementTime(): void {
    if (this.remainingTimeInMilliSeconds > 0) {
      this.remainingTimeInMilliSeconds -= 50;
    } else {
      this.timer.remove();
    }
  }

  private drawArc(endingAngle: number): void {
    this.graphics.clear();

    this.graphics.lineStyle(15, 0xff00ff, 1);

    //  Without this the arc will appear closed when stroked
    this.graphics.beginPath();

    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    this.graphics.arc(
      0, 0, 200, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(endingAngle), false,
    );

    this.graphics.strokePath();
  }
}
