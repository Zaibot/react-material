import IAnimatable from './animatable';

class Entry {
    public static create(
        component: IAnimatable<any>,
        always: boolean,
    ) {
        return new Entry(component, always, undefined, 0, false);
    }

    public constructor(
        public readonly component: IAnimatable<any>,
        public readonly always: boolean,
        public state: any,
        public last: number,
        public changed: boolean,
    ) { }

    public changeState(state: any) {
      this.changed = this.changed || this.state !== state;
      this.state = state;
    }
}
export default Entry;
