const CachedEmpty = `/`;

class Position {
    public static readonly empty = new Position(0, 0);

    private _cached = CachedEmpty;

    public constructor(
        public readonly x: number,
        public readonly y: number,
    ) { }

    public alter(
        x: number,
        y: number,
        size: number,
    ) {
        if (this.x !== x || this.y !== y) {
            return new Position(x, y);
        }
        return this;
    }

    public toTransform() {
        if (this._cached !== CachedEmpty) { return this._cached; }
        if (this.x !== 0 || this.y !== 0) {
            // tslint:disable-next-line max-line-length no-magic-numbersy
            return this._cached = `translate(${this.x.toFixed(1)}px, ${this.y.toFixed(1)}px)`;
        }
        return this._cached = ``;
    }
}

export default Position;
