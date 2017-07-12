// tslint:disable no-magic-numbers

const Precision = 1;
const CachedEmpty = `/`;

class BorderRadius {
    public static readonly empty = new BorderRadius(0, 0, 0, 0, 0, 0, 0, 0);

    public static round(n: number) {
        return new BorderRadius(n, n, n, n, n, n, n, n);
    }
    public static roundHV(h: number, v: number) {
        return new BorderRadius(h, v, h, v, h, v, h, v);
    }

    private _cached: string = CachedEmpty;

    public constructor(
        public readonly topLeftX: number,
        public readonly topLeftY: number,
        public readonly topRightX: number,
        public readonly topRightY: number,
        public readonly bottomRightX: number,
        public readonly bottomRightY: number,
        public readonly bottomLeftX: number,
        public readonly bottomLeftY: number,
    ) { }

    public alter(
        topLeftX: number,
        topLeftY: number,
        topRightX: number,
        topRightY: number,
        bottomRightX: number,
        bottomRightY: number,
        bottomLeftX: number,
        bottomLeftY: number,
    ) {
        if (this.topLeftX !== topLeftX
            || this.topLeftY !== topLeftY
            || this.topRightX !== topRightX
            || this.topRightY !== topRightY
            || this.bottomRightX !== bottomRightX
            || this.bottomRightY !== bottomRightY
            || this.bottomLeftX !== bottomLeftX
            || this.bottomLeftY !== bottomLeftY) {
            return new BorderRadius(
                topLeftX,
                topLeftY,
                topRightX,
                topRightY,
                bottomRightX,
                bottomRightY,
                bottomLeftX,
                bottomLeftY,
            );
        }
        return this;
    }

    public toBorderRadius() {
        if (this._cached !== CachedEmpty) { return this._cached; }
        if ((this.topLeftX > 0 && this.topLeftY > 0)
            || (this.topRightX > 0 && this.topRightY > 0)
            || (this.bottomRightX > 0 && this.bottomRightY > 0)
            || (this.bottomLeftX > 0 && this.bottomLeftY > 0)
        ) {
            const topLeftX = this.topLeftX.toFixed(Precision);
            const topRightX = this.topRightX.toFixed(Precision);
            const bottomRightX = this.bottomRightX.toFixed(Precision);
            const bottomLeftX = this.bottomLeftX.toFixed(Precision);
            const topLeftY = this.topLeftY.toFixed(Precision);
            const topRightY = this.topRightY.toFixed(Precision);
            const bottomRightY = this.bottomRightY.toFixed(Precision);
            const bottomLeftY = this.bottomLeftY.toFixed(Precision);
            return this._cached = `${topLeftX}px ${topRightX}px ${bottomRightX}px ${bottomLeftX}px / ${topLeftY}px ${topRightY}px ${bottomRightY}px ${bottomLeftY}px`;
        }
        return this._cached = null;
    }
}

export default BorderRadius;
