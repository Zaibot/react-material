// tslint:disable no-magic-numbers
export default class Spring {
    public constructor(
        public readonly current: number,
        public readonly target: number,
        public readonly velocity: number,
        public readonly springConstant: number,
    ) { }

    public change(
        target: number,
    ) {
        return new Spring(this.current, target, this.velocity, this.springConstant);
    }

    public iterate(
        advance: number,
    ) {
        const currentToTarget = this.target - this.current;
        const springForce = currentToTarget * this.springConstant;
        const dampingForce = this.velocity * -2 * Math.sqrt(this.springConstant);
        const force = springForce + dampingForce;
        const velocity = this.velocity + force * advance;
        return new Spring(this.current + velocity * advance, this.target, velocity, this.springConstant);
    }
}
