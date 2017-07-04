import Spring from './spring';

export type AnimationState<T extends {}> = {
    [P in keyof T]?: Spring;
};

export type AnimationCurrentState<T extends {}> = {
    [P in keyof T]?: number;
};

export default function <S extends {}>(state: AnimationCurrentState<S>, animationState: AnimationState<S>): undefined | AnimationCurrentState<S> {
    const keys = Object.keys(animationState);
    const ii = keys.length;
    let i = 0;
    for (; i < ii; i++) {
        const key = keys[i];
        if (!(animationState[key] instanceof Spring)) { continue; }
        if (state[key] !== animationState[key].current) {
            break;
        }
    }
    if (i === ii) { return undefined; }

    const r: any = {};
    for (; i < ii; i++) {
        const key = keys[i];
        if (!(animationState[key] instanceof Spring)) { continue; }
        if (state[key] !== animationState[key].current) {
            r[key] = animationState[key].current;
        }
    }
    return r;
}
