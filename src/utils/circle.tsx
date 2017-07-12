// tslint:disable no-magic-numbers

const Precision = 1;
const CachedEmpty = `/`;

class Circle {
    public static readonly empty = new Circle(0, 0, 0);

    private _cached = CachedEmpty;

    public constructor(
        public readonly xCenter: number,
        public readonly yCenter: number,
        public readonly size: number,
    ) { }

    public alter(
        xCenter: number,
        yCenter: number,
        size: number,
    ) {
        if (this.xCenter !== xCenter
            || this.yCenter !== yCenter
            || this.size !== size) {
            return new Circle(xCenter, yCenter, size);
        }
        return this;
    }

    public toClipPath() {
        if (this._cached !== CachedEmpty) { return this._cached; }
        const r = this.size.toFixed(Precision);
        const x = this.xCenter.toFixed(Precision);
        const y = this.yCenter.toFixed(Precision);
        return this._cached = `ellipse(${r}px ${r}px at ${x}px ${y}px)`;
    }
}

export default Circle;
