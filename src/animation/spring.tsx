// tslint:disable no-magic-numbers
export default class Spring {

    public static generic(
        current: number,
        target: number,
        velocity: number,
        springConstant: number,
    ) {
        return new Spring(current, target, velocity, springConstant, Math.sqrt(springConstant) * 2);
    }
    public static flex(
        current: number,
        target: number,
        velocity: number,
        springConstant: number,
        dampingMultiplier: number,
    ) {
        return new Spring(current, target, velocity, springConstant, Math.sqrt(springConstant) * 2 * dampingMultiplier);
    }

    public constructor(
        public readonly current: number,
        public readonly target: number,
        public readonly velocity: number,
        public readonly springConstant: number,
        public readonly dampingConstant: number,
    ) { }

    public change(
        target: number,
    ) {
        return new Spring(this.current, target, this.velocity, this.springConstant, this.dampingConstant);
    }

    public iterate(
        advance: number,
    ) {
        const currentToTarget = this.target - this.current;
        const springForce = currentToTarget * this.springConstant;
        const dampingForce = this.velocity * this.dampingConstant;
        const force = springForce - dampingForce;
        const velocity = this.velocity + force * advance;
        return new Spring(this.current + velocity * advance, this.target, velocity, this.springConstant, this.dampingConstant);
    }
}