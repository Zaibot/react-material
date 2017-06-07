import Point from './point';
import Spring from './spring';

export default {
    point: (p: Point, advance: number): Point => {
        return p.move(p.xVelocity * advance, p.yVelocity * advance, p.rVelocity * advance);
    },
    spring: (p: Spring, advance: number): Spring => {
        return p.iterate(advance);
    },
};
