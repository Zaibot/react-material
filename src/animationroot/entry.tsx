import IAnimatable from './animatable';

class Entry {
    public static create(
        component: IAnimatable<any>,
        always: boolean,
    ) {
        return new Entry(component, always, undefined, 0, false);
    }

    public status = 0;
    public outPrepAdvance = 0;
    public outAnimateAdvance = 0;

    public constructor(
        public readonly component: IAnimatable<any>,
        public readonly always: boolean,
        public state: any,
        public last: number,
        public changed: boolean,
    ) { }

    public afterPre(state: any) {
      this.status = 1;
      this.changed = this.changed || this.state !== state;
      this.state = state;
      this.outPrepAdvance = 0;
    }
    public afterAnimate(state: any) {
      this.status = 0;
      this.changed = this.state !== state;
      this.state = state;
      this.outAnimateAdvance = 0;
    }

    public isPrepped() {
      return this.status === 1;
    }
    public reset() {
      this.status = 0;
    }

    public changeState(state: any) {
      this.changed = this.changed || this.state !== state;
      this.state = state;
    }
}
export default Entry;
