import PropTypes from 'prop-types';
import React from 'react';
import Material from '../material';
import cx from './style.less';

export const RootSymbol = `@zaibot/material/animationroot`; //Symbol(`@zaibot/material/animationroot`);

export const GetRoot = (e: React.Component<any, any>) => e.context[RootSymbol] as AnimationRoot;

export interface IAnimatable<T> {
    onPreAnimate(time: number, advance: number, state: T): T;
    onAnimate(time: number, advance: number, state: T): T;
}

export default class AnimationRoot extends React.Component<{}, {}> {
    public static childContextTypes = {
        [RootSymbol]: PropTypes.any,
    };
    private _registrations: Array<{ component: IAnimatable<any>; state: any; }> = [];
    private _timer: any = null;
    private _last: number = Date.now();

    public constructor(props: any) {
        super(props);
    }

    public add(component: IAnimatable<any>) {
        if (this._registrations.some((x) => x.component === component)) { return; }
        const state: any = undefined;
        this._registrations = [...this._registrations, { component, state }];
    }

    public remove(component: IAnimatable<any>) {
        this._registrations = this._registrations.filter((x) => x.component !== component);
    }

    public render() {
        return this.props.children as JSX.Element;
    }

    protected getChildContext() {
        return { [RootSymbol]: this as AnimationRoot };
    }

    protected componentDidMount() {
        if (!this._timer) { this._timer = window.requestAnimationFrame(this.trigger); }
    }

    protected componentWillUnmount() {
        if (this._timer) { window.cancelAnimationFrame(this._timer); this._timer = null; }
    }

    protected shouldComponentUpdate() {
        return false;
    }

    private run(time: number, advance: number) {
        const regs = this._registrations;
        const ii = regs.length;
        for (let i = 0; i < ii; i++) {
            try {
                regs[i].state = regs[i].component.onPreAnimate(time, advance, regs[i].state);
            } catch (ex) {
                console.error(`Material Pre Animation`, ex);
            }
        }
        for (let i = 0; i < ii; i++) {
            try {
                regs[i].state = regs[i].component.onAnimate(time, advance, regs[i].state);
            } catch (ex) {
                console.error(`Material Animation`, ex);
            }
        }
    }

    private trigger = () => {
        this._timer = null;
        const time = Date.now();
        const advance = time - this._last;
        this.run(time, advance);
        this._last = time;
        if (!this._timer) { this._timer = window.requestAnimationFrame(this.trigger); }
    }
}
