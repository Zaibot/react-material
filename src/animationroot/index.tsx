import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import partialUpdate from '../animation/partialUpdate';
import IAnimatable from '../animationroot/animatable';

// tslint:disable no-magic-numbers
const maximumDelay = 500;
const maximumCycleTime = 1000 / 60; /* 60fps */
const timeout = 500;
// tslint:enable no-magic-numbers

// tslint:disable no-console

export const RootSymbol = `@zaibot/material/animationroot`;

export const GetAnimationRoot = (e: React.Component<any, any>) => e.context[RootSymbol] as AnimationRoot;

const isWithinTime = (time: number, last: number, t: number) => time - last - t <= 0;
const isWithinTimeNow = (last: number, t: number) => Date.now() - last - t <= 0;
const isTimedOut = (time: number, last: number, t: number) => time - last - t > 0;
const isTimedOutNow = (last: number, t: number) => Date.now() - last - t > 0;

import Registration from './entry';

export interface IAnimationRootProps {
    rate?: number;
    onFrame?: (duration: number, sinceLast: number) => void;
}
export class AnimationRoot extends React.Component<IAnimationRootProps, {}> {
    public static childContextTypes = {
        [RootSymbol]: PropTypes.any,
    };
    private static _warned = false;
    // private static xx = 0;
    private _registrations: Registration[] = [];
    private _timer: any = null;
    private _last: number = Date.now();
    // private x = 0;

    // public constructor(props?: any, context?: any) {
    //     super(props, context);
    //     // this.x = ++AnimationRoot.xx;
    //     // console.log(`[@zaibot/react-material] animation root ${this.x}`);
    // }

    public add(component: React.Component<any, any> & IAnimatable<any>, always: boolean) {
        if (this._registrations.some((x) => x.component === component)) { return; }
        this._registrations = [...this._registrations, Registration.create(component, always)];
        this.runSingle(component, this.getAnimationTime(), 0);
        // console.log(`[@zaibot/react-material] animation root, adding ${this.x}`);
    }

    public remove(component: React.Component<any, any> & IAnimatable<any>) {
        this._registrations = this._registrations.filter((x) => x.component !== component);
        // console.log(`[@zaibot/react-material] animation root, removing ${this.x}`);
    }

    public update<T>(component: React.Component<any, any> & IAnimatable<T>, callback: (state: T) => T) {
        const regs = this._registrations;
        const ii = regs.length;
        for (let i = 0; i < ii; i++) {
            const reg = regs[i];
            if (reg.component !== component) { continue; }
            reg.changeState(callback(reg.state));
        }
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
        // tslint:disable-next-line no-magic-numbers
        const advance = (this.props.rate > 0 && this.props.rate < 10 ? ((time - this._last) * this.props.rate) : (time - this._last)) * 0.001;
        ReactDOM.unstable_batchedUpdates(() => this.run(time, advance));
        if (this.props.onFrame) {
            this.props.onFrame(Date.now() - time, time - this._last);
        }
        this._last = time;
    }

    private runSingle(component: IAnimatable<any>, time: number, advance: number) {
        const regs = this._registrations;
        const ii = regs.length;
        for (let i = 0; i < ii; i++) {
            const reg = regs[i];
            reg.beforePre(advance);
            if (reg.component !== component) { continue; }
            // if (!reg.component.onPreAnimate) { continue; }
            try {
                if ((reg.always) || (isWithinTimeNow(time, maximumCycleTime) || isTimedOutNow(reg.last, maximumDelay))) {
                    reg.afterPre(reg.component.onPreAnimate(time, reg.outPrepAdvance, reg.state));
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
            const reg = regs[i];
            reg.beforeAnimate(advance);
            if (reg.component !== component) { continue; }
            try {
                if (!reg.isPrepped()) { continue; }
                if ((reg.always) || (isWithinTimeNow(time, maximumCycleTime) || isTimedOutNow(reg.last, maximumDelay))) {
                    reg.afterAnimate(time, reg.component.onAnimate(time, reg.outAnimateAdvance, reg.state));
                    if (reg.changed) {
                        if (reg.component.applyAnimation) {
                            reg.component.applyAnimation(reg.state);
                            reg.afterApplied();
                        } else {
                            const changes = partialUpdate(reg.component.state, reg.state);
                            if (changes !== undefined) {
                                reg.component.setState(changes);
                            }
                        }
                    }
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
            const reg = regs[i];
            reg.beforePre(advance);
            // if (!reg.component.onPreAnimate) { continue; }
            try {
                if ((reg.always) || (isWithinTimeNow(time, maximumCycleTime) || isTimedOutNow(reg.last, maximumDelay))) {
                    reg.afterPre(reg.component.onPreAnimate(time, reg.outPrepAdvance, reg.state));
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
            const reg = regs[i];
            reg.beforeAnimate(advance);
            try {
                if (!reg.isPrepped()) { continue; }
                if ((reg.always) || (isWithinTimeNow(time, maximumCycleTime) || isTimedOutNow(reg.last, maximumDelay))) {
                    reg.afterAnimate(time, reg.component.onAnimate(time, reg.outAnimateAdvance, reg.state));
                    if (reg.changed) {
                        if (reg.component.applyAnimation) {
                            reg.component.applyAnimation(reg.state);
                            reg.afterApplied();
                        } else {
                            const changes = partialUpdate(reg.component.state, reg.state);
                            if (changes !== undefined) {
                                reg.component.setState(changes);
                                reg.afterApplied();
                            }
                        }
                    }
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
