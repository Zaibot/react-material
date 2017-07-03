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
        // tslint:disable-next-line max-line-length no-magic-numbers
        return this._cached = `ellipse(${this.size.toFixed(1)}px ${this.size.toFixed(1)}px at ${this.xCenter.toFixed(1)}px ${this.yCenter.toFixed(1)}px)`;
    }
}

export default Circle;
