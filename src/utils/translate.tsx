// tslint:disable no-magic-numbers

const Precision = 1;
const CachedEmpty = `/`;

class Translate {
    public static readonly empty = new Translate(0, 0);

    private _cached = CachedEmpty;

    public constructor(
        public readonly x: number,
        public readonly y: number,
    ) { }

    public alter(
        x: number,
        y: number,
    ) {
        if (this.x !== x
            || this.y !== y) {
            return new Translate(x, y);
        }
        return this;
    }

    public toTransform() {
        if (this._cached !== CachedEmpty) { return this._cached; }
        const x = this.x.toFixed(Precision);
        const y = this.y.toFixed(Precision);
        return this._cached = `translate(${x}px, ${y}px)`;
    }
}

export default Translate;
