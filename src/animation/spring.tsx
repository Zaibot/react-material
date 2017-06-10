// tslint:disable no-magic-numbers
class Spring {
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
        if (this.target === target) {
            return this;
        }
        return new Spring(this.current, target, this.velocity, this.springConstant, this.dampingConstant);
    }

    public jump(
        target: number,
    ) {
        if (this.current === target && this.target === target && this.velocity === 0) {
            return this;
        }
        return new Spring(target, target, 0, this.springConstant, this.dampingConstant);
    }

    public speed(
        springConstant: number,
        dampingConstant: number | false = false,
    ) {
        if (dampingConstant === false) {
            return this.altered(this.current, this.target, this.velocity, springConstant, Math.sqrt(springConstant) * 2);
        }
        return this.altered(this.current, this.target, this.velocity, springConstant, dampingConstant);
    }

    public constrain(
        min: number,
        max: number,
    ) {
        if (this.current < min) { return new Spring(min, this.target, this.velocity, this.springConstant, this.dampingConstant); }
        if (this.current > max) { return new Spring(max, this.target, this.velocity, this.springConstant, this.dampingConstant); }
        return this;
    }

    public iterate(
        advance: number,
    ) {
        if (this.target === this.current && this.velocity === 0) {
            return this;
        }
        const currentToTarget = this.target - this.current;
        const springForce = currentToTarget * this.springConstant;
        const dampingForce = this.velocity * this.dampingConstant;
        const force = springForce - dampingForce;
        const velocity = this.velocity + force * advance;
        if (currentToTarget > -0.01 && currentToTarget < 0.01) {
            return this.altered(this.target, this.target, 0, this.springConstant, this.dampingConstant);
        }
        return this.altered(this.current + velocity * advance, this.target, velocity, this.springConstant, this.dampingConstant);
    }

    private altered(
        current: number,
        target: number,
        velocity: number,
        springConstant: number,
        dampingConstant: number,
    ) {
        if (this.current !== current
            || this.target !== target
            || this.velocity !== velocity
            || this.springConstant !== springConstant
            || this.dampingConstant !== dampingConstant) {
            return new Spring(current, target, velocity, springConstant, dampingConstant);
        }
        return this;
    }

}
export default Spring;
