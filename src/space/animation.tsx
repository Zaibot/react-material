import { Spring } from '../animation';

class SurfaceAnimation {
    public constructor(
        public readonly focus: Spring,
        public readonly size: Spring,
        public readonly reserve: Spring,
        public readonly front: Spring,
        public readonly opacity: Spring,
        public readonly shape: Spring,
    ) { }

    public iterate(advance: number) {
        const focus = this.focus.iterate(advance);
        const size = this.size.iterate(advance);
        const reserve = this.reserve.iterate(advance);
        const front = this.front.iterate(advance);
        const opacity = this.opacity.iterate(advance);
        const shape = this.shape.iterate(advance);
        if (focus !== this.focus
            || size !== this.size
            || reserve !== this.reserve
            || front !== this.front
            || opacity !== this.opacity
            || shape !== this.shape) {
            return new SurfaceAnimation(focus, size, reserve, front, opacity, shape);
        }
        return this;
    }

    public change(
        focus: number,
        size: number,
        reserve: number,
        front: number,
        opacity: number,
        shape: number,
    ) {
        if (focus !== this.focus.target
            || size !== this.size.target
            || reserve !== this.reserve.target
            || front !== this.front.target
            || opacity !== this.opacity.target
            || shape !== this.shape.target) {
            return new SurfaceAnimation(
                this.focus.change(focus),
                this.size.change(size),
                this.reserve.change(reserve),
                this.front.change(front),
                this.opacity.change(opacity),
                this.shape.change(shape),
            );

        }
        return this;
    }
}
export default SurfaceAnimation;
