// tslint:disable no-magic-numbers
const frame16 = 16;
const fps8 = 1000 / 8;
// tslint:enable

const emptySize = document.createElement('div').getBoundingClientRect();

class Measure {
  public static readonly realtime = new Measure(0, 0, null, emptySize, 0, 0);
  public static readonly slow = new Measure(frame16, fps8, null, emptySize, 0, 0);

  public constructor(
    public readonly iteration: number,
    public readonly interval: number,
    public readonly element: HTMLElement,
    public readonly size: ClientRect,
    public readonly countDown: number,
    public readonly timeDown: number,
  ) { }

  public updateElement(element: HTMLElement) {
    if (this.element === element) { return this; }
    return this.alter(this.iteration, this.interval, element, this.size, 0, 0);
  }

  public iterate(advance: number) {
    if (this.iteration === 0 && this.interval === 0) {
      // short circuit.
      return this.update();
    }
    const countDown = Math.max(0, this.countDown - 1);
    const timeDown = Math.max(0, this.timeDown - advance);
    if (countDown > 0 && timeDown > 0) {
      return this.alter(this.iteration, this.interval, this.element, this.size, countDown, timeDown);
    }
    return this.update();
  }

  public update() {
    if (!this.element) { return this; }
    const size = this.element.getBoundingClientRect();
    return this.alter(this.iteration, this.interval, this.element, size, this.iteration, this.interval);
  }

  public alter(
    iteration: number,
    interval: number,
    element: HTMLElement,
    size: ClientRect,
    countDown: number,
    timeDown: number,
  ) {
    if (iteration !== this.iteration
      || interval !== this.interval
      || element !== this.element
      || size.left !== this.size.left
      || size.top !== this.size.top
      || size.right !== this.size.right
      || size.bottom !== this.size.bottom
      || timeDown !== this.timeDown) {
      return new Measure(iteration, interval, element, size, countDown, timeDown);
    }
    return this;
  }

}
export default Measure;
