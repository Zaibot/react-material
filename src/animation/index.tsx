import Advance from './advance';
import Point from './point';
import Spring from './spring';

export class EngineContext {
    public constructor(
        public readonly advance: number,
        public readonly points: Point[],
        public readonly spring: Spring[],
    ) { }
}

export default (engine: EngineContext): EngineContext => {
    const advance = engine.advance;
    return new EngineContext(
        engine.advance,
        engine.points.map((p) => Advance.point(p, advance)),
        engine.spring.map((p) => Advance.spring(p, advance)),
    );
};

export { default as Advance } from './point';
export { default as Point } from './point';
export { default as Spring } from './spring';
