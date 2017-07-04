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
        if (typeof state[key] !== 'number') { continue; }
        if (state[key] !== animationState[key].current) {
            // atleast one spring property changed.
            break;
        }
    }
    if (i === ii) {
      // short circuit.
      return undefined;
    }

    const r: any = {};
    for (; i < ii; i++) {
        const key = keys[i];
        if (!(animationState[key] instanceof Spring)) { continue; }
        if (typeof state[key] !== 'number') { continue; }
        if (state[key] !== animationState[key].current) {
            // spring changed
            r[key] = animationState[key].current;
        }
    }
    return r;
}
