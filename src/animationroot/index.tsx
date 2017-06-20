import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const maximumDelay = 500;
const timeout = 500;

// tslint:disable no-console

export const RootSymbol = `@zaibot/material/animationroot`;

export const GetAnimationRoot = (e: React.Component<any, any>) => e.context[RootSymbol] as AnimationRoot;

export interface IAnimatable<T> {
    onPreAnimate(time: number, advance: number, state: T): T;
    onAnimate(time: number, advance: number, state: T): T;
}

export interface IAnimationRootProps {
  rate?: number;
}
export class AnimationRoot extends React.Component<IAnimationRootProps, {}> {
    public static childContextTypes = {
        [RootSymbol]: PropTypes.any,
    };
    private static _warned = false;
    // private static xx = 0;
    private _registrations: Array<{ component: IAnimatable<any>; state: any; always: boolean; last: number; }> = [];
    private _timer: any = null;
    private _last: number = Date.now();
    // private x = 0;

    public constructor(props?: any, context?: any) {
        super(props, context);
        // this.x = ++AnimationRoot.xx;
        // console.log(`[@zaibot/react-material] animation root ${this.x}`);
    }

    public add(component: IAnimatable<any>, always: boolean) {
        if (this._registrations.some((x) => x.component === component)) { return; }
        const state: any = undefined;
        this._registrations = [...this._registrations, { component, state, always, last: 0 }];
        this.runSingle(component, this.getAnimationTime(), 0);
        // console.log(`[@zaibot/react-material] animation root, adding ${this.x}`);
    }

    public remove(component: IAnimatable<any>) {
        this._registrations = this._registrations.filter((x) => x.component !== component);
        // console.log(`[@zaibot/react-material] animation root, removing ${this.x}`);
    }

    public render() {
        return this.props.children as JSX.Element;
    }

    public getAnimationTime() {
        return this._last;
    }

    public iterate() {
        this.iterateCore();
        this.beginTrigger();
    }

    protected getChildContext() {
        return { [RootSymbol]: this as AnimationRoot };
    }

    protected componentDidMount() {
        this.beginTrigger();
    }

    protected componentWillUnmount() {
        this.cancelTrigger();
    }

    // protected shouldComponentUpdate() {
    //     return false;
    // }

    private iterateCore() {
        const time = Date.now();
        const advance = this.props.rate > 0 && this.props.rate < 10 ? ((time - this._last) * this.props.rate) : (time - this._last);
        ReactDOM.unstable_batchedUpdates(() => this.run(time, advance));
        this._last = time;
    }

    private runSingle(component: IAnimatable<any>, time: number, advance: number) {
        const regs = this._registrations;
        const ii = regs.length;
        for (let i = 0; i < ii; i++) {
            if (regs[i].component !== component) { continue; }
            try {
                if ((regs[i].always) || (Date.now() < time + timeout) || (regs[i].last < time - maximumDelay)) {
                    regs[i].state = regs[i].component.onPreAnimate(time, advance, regs[i].state);
                } else {
                    if (!AnimationRoot._warned) {
                        AnimationRoot._warned = true;
                        console.warn(`[animation] stopped one or more animations due to low performance`);
                    }
                }
            } catch (ex) {
                console.error(`Material Pre Animation`, ex);
            }
        }
        for (let i = 0; i < ii; i++) {
            if (regs[i].component !== component) { continue; }
            try {
                if ((regs[i].always) || (Date.now() < time + timeout) || (regs[i].last < time - maximumDelay)) {
                    regs[i].state = regs[i].component.onAnimate(time, advance, regs[i].state);
                    regs[i].last = time;
                }
            } catch (ex) {
                console.error(`Material Animation`, ex);
            }
        }
    }

    private run(time: number, advance: number) {
        const regs = this._registrations;
        const ii = regs.length;
        for (let i = 0; i < ii; i++) {
            try {
                if ((regs[i].always) || (Date.now() < time + timeout) || (regs[i].last < time - maximumDelay)) {
                    regs[i].state = regs[i].component.onPreAnimate(time, advance, regs[i].state);
                } else {
                    if (!AnimationRoot._warned) {
                        AnimationRoot._warned = true;
                        console.warn(`[animation] stopped one or more animations due to low performance`);
                    }
                }
            } catch (ex) {
                console.error(`Material Pre Animation`, ex);
            }
        }
        for (let i = 0; i < ii; i++) {
            try {
                if ((regs[i].always) || (Date.now() < time + timeout) || (regs[i].last < time - maximumDelay)) {
                    regs[i].state = regs[i].component.onAnimate(time, advance, regs[i].state);
                    regs[i].last = time;
                }
            } catch (ex) {
                console.error(`Material Animation`, ex);
            }
        }
    }

    private beginTrigger() {
        if (!this._timer) { this._timer = window.requestAnimationFrame(this.onTrigger); }
    }

    private cancelTrigger() {
        if (this._timer) { window.cancelAnimationFrame(this._timer); this._timer = null; }
    }

    private onTrigger = () => {
        this._timer = null;
        this.iterateCore();
        this.beginTrigger();
    }
}
export default AnimationRoot;
