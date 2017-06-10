class Point {
    public constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly r: number,
        public readonly xVelocity: number,
        public readonly yVelocity: number,
        public readonly rVelocity: number,
    ) { }

    public move(
        x: number,
        y: number,
        r: number,
    ) {
        return new Point(this.x + x, this.y + y, this.r + r, this.xVelocity, this.yVelocity, this.rVelocity);
    }

    public speed(
        xVelocity: number,
        yVelocity: number,
        rVelocity: number,
    ) {
        return new Point(this.x, this.y, this.r, xVelocity, yVelocity, rVelocity);
    }

    public speedIncr(
        xVelocityRel: number,
        xVelocityMul: number,
        yVelocityRel: number,
        yVelocityMul: number,
        rVelocityRel: number,
        rVelocityMul: number,
    ) {
        return new Point(
            this.x,
            this.y,
            this.r,
            this.xVelocity >= 0 ? Math.max(0, this.xVelocity * xVelocityMul + xVelocityRel) : Math.min(0, this.xVelocity * xVelocityMul - xVelocityRel),
            this.yVelocity >= 0 ? Math.max(0, this.yVelocity * yVelocityMul + yVelocityRel) : Math.min(0, this.yVelocity * yVelocityMul - yVelocityRel),
            this.rVelocity >= 0 ? Math.max(0, this.rVelocity * rVelocityMul + rVelocityRel) : Math.min(0, this.rVelocity * rVelocityMul - rVelocityRel),
        );
    }

    public speedDecr(
        xVelocityRel: number,
        xVelocityMul: number,
        yVelocityRel: number,
        yVelocityMul: number,
        rVelocityRel: number,
        rVelocityMul: number,
    ) {
        return new Point(
            this.x,
            this.y,
            this.r,
            this.xVelocity >= 0 ? Math.max(0, this.xVelocity * xVelocityMul - xVelocityRel) : Math.min(0, this.xVelocity * xVelocityMul + xVelocityRel),
            this.yVelocity >= 0 ? Math.max(0, this.yVelocity * yVelocityMul - yVelocityRel) : Math.min(0, this.yVelocity * yVelocityMul + yVelocityRel),
            this.rVelocity >= 0 ? Math.max(0, this.rVelocity * rVelocityMul - rVelocityRel) : Math.min(0, this.rVelocity * rVelocityMul + rVelocityRel),
        );
    }
}
export default Point;
