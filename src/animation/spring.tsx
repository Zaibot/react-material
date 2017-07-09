// tslint:disable no-magic-numbers
const snapVelocity = 0.001;
const fpsSpring = 1000 / 200;

class Spring {
  public static generic(
    current: number,
    target: number,
    velocity: number,
    gravity: number,
    springConstant: number,
  ) {
    return new Spring(current, target, velocity, gravity, springConstant, Math.sqrt(springConstant) * 2);
  }
  public static flex(
    current: number,
    target: number,
    velocity: number,
    gravity: number,
    springConstant: number,
    dampingMultiplier: number,
  ) {
    return new Spring(current, target, velocity, gravity, springConstant, Math.sqrt(springConstant) * 2 * dampingMultiplier);
  }

  public constructor(
    public readonly current: number,
    public readonly target: number,
    public readonly velocity: number,
    public readonly gravity: number,
    public readonly springConstant: number,
    public readonly dampingConstant: number,
  ) { }

  public change(
    target: number,
  ) {
    if (this.target === target) {
      return this;
    }
    return new Spring(this.current, target, this.velocity, this.gravity, this.springConstant, this.dampingConstant);
  }

  public jump(
    target: number,
  ) {
    if (this.current === target && this.target === target && this.velocity === 0) {
      return this;
    }
    return new Spring(target, target, 0, this.gravity, this.springConstant, this.dampingConstant);
  }

  public speed(
    springConstant: number,
    dampingConstant: number | false = false,
  ) {
    if (dampingConstant === false) {
      return this.altered(this.current, this.target, this.velocity, this.gravity, springConstant, Math.sqrt(springConstant) * 2);
    }
    return this.altered(this.current, this.target, this.velocity, this.gravity, springConstant, dampingConstant);
  }
  public changeGravity(
    gravity: number,
  ) {
    return this.altered(this.current, this.target, this.velocity, gravity, this.springConstant, this.dampingConstant);
  }

  public constrain(
    min: number,
    max: number,
  ) {
    if (this.current < min) { return new Spring(min, this.target, this.velocity, this.gravity, this.springConstant, this.dampingConstant); }
    if (this.current > max) { return new Spring(max, this.target, this.velocity, this.gravity, this.springConstant, this.dampingConstant); }
    return this;
  }

  public iterate(
    advance: number,
  ) {
    if (this.target === this.current && this.velocity === 0) {
      return this;
    }
    let currentToTarget = 0;
    let gravity = 0;
    let springForce = 0;
    let dampingForce = 0;
    let force = 0;
    let velocity = this.velocity;
    let current = this.current;
    while (advance > 0) {
      // Split into multiple frames (prevent jumps)
      const frameAdvance = advance >= fpsSpring ? fpsSpring : advance;
      advance -= frameAdvance;
      currentToTarget = this.target - this.current;
      gravity = currentToTarget > 0 ? this.gravity : 2 - this.gravity;
      springForce = currentToTarget * this.springConstant * gravity;
      dampingForce = this.velocity * this.dampingConstant;
      force = springForce - dampingForce;
      velocity = velocity + force * frameAdvance;
      current = current + velocity * frameAdvance;
    }
    if (currentToTarget > snapVelocity * -1 && currentToTarget < snapVelocity) {
      // snap
      return this.altered(this.target, this.target, 0, this.gravity, this.springConstant, this.dampingConstant);
    }
    return this.altered(current, this.target, velocity, this.gravity, this.springConstant, this.dampingConstant);
  }

  private altered(
    current: number,
    target: number,
    velocity: number,
    gravity: number,
    springConstant: number,
    dampingConstant: number,
  ) {
    if (this.current !== current
      || this.target !== target
      || this.velocity !== velocity
      || this.gravity !== gravity
      || this.springConstant !== springConstant
      || this.dampingConstant !== dampingConstant) {
      return new Spring(current, target, velocity, gravity, springConstant, dampingConstant);
    }
    return this;
  }
}
export default Spring;
