const CachedEmpty = `/`;

class BorderRadius {
    public static readonly empty = new BorderRadius(0, 0, 0, 0, 0, 0, 0, 0);

    private _cached = CachedEmpty;

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
            // tslint:disable-next-line max-line-length no-magic-numbers
            return this._cached = `${this.topLeftX.toFixed(1)}px ${this.topLeftY.toFixed(1)}px / ${this.topRightX.toFixed(1)}px ${this.topRightY.toFixed(1)}px ${this.bottomRightX.toFixed(1)}px ${this.bottomRightY.toFixed(1)}px ${this.bottomLeftX.toFixed(1)}px ${this.bottomLeftY.toFixed(1)}px`;
        }
        return this._cached = ``;
    }
}

export default BorderRadius;
