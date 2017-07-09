// tslint:disable no-magic-numbers
const frame16 = 16;
const fps8 = 1000 / 8;
// tslint:enable

const emptySize = document.createElement('div').getBoundingClientRect();

class MeasureDesired {
  public static readonly realtime = new MeasureDesired(0, 0, null, emptySize, 0, 0);
  public static readonly slow = new MeasureDesired(frame16, fps8, null, emptySize, 0, 0);

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
    const { element } = this;
    if (!element) { return this; }
    const storePosition = element.style.position;
    const storeWidth = element.style.width;
    const storeHeight = element.style.height;
    // Prep
    element.style.position = 'fixed';
    element.style.width = '';
    element.style.height = '';
    // Measure
    const size = element.getBoundingClientRect();
    // Restore
    element.style.position = storePosition;
    element.style.width = storeWidth;
    element.style.height = storeHeight;
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
      || size !== this.size
      || countDown !== this.countDown
      || timeDown !== this.timeDown) {
      return new MeasureDesired(iteration, interval, element, size, countDown, timeDown);
    }
    return this;
  }

}
export default MeasureDesired;
