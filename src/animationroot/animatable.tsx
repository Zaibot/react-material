interface IAnimatable<T extends {}> {
    onPreAnimate(time: number, advance: number, state: T): T;
    onAnimate(time: number, advance: number, state: T): T;
    applyAnimation?(state: T): void;
}

export default IAnimatable;
