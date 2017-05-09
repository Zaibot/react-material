import React from 'react';
import PropTypes from 'prop-types';
import Material from '../material';
import cx from './style.less';

export const RootSymbol = `asdasd`;//Symbol(`@zaibot/material/animationroot`);

export const GetRoot = (e: React.Component<any, any>) => e.context[RootSymbol] as AnimationRoot;

export interface IAnimatable {
    onPreAnimate(time: number, advance: number): void;
    onAnimate(time: number, advance: number): void;
}

export function Animated(target: any) {
    target.contextTypes = target.contextTypes || {};
    target.contextTypes[RootSymbol] = PropTypes.any.isRequired;
}

export default class AnimationRoot extends React.Component<{}, {}> {
    public static childContextTypes = {
        [RootSymbol]: PropTypes.any,
    };
    private _registrations: IAnimatable[] = [];
    private _timer: any = null;
    private _last: number = Date.now();

    public constructor(props: any) {
        super(props);
    }

    public add(component: IAnimatable) {
        if (this._registrations.indexOf(component) > -1) { return; }
        this._registrations.push(component);
    }

    public remove(component: IAnimatable) {
        delete this._registrations[this._registrations.indexOf(component)];
    }

    public render() {
        return this.props.children as JSX.Element;
    }

    protected getChildContext() {
        return { [RootSymbol]: this };
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
        const regs = this._registrations.slice(0);
        const ii = regs.length;
        for (let i = 0; i < ii; i++) {
            try {
                regs[i].onPreAnimate(time, advance);
            } catch (ex) {
                console.error(`Material Pre Animation`, ex);
            }
        }
        for (let i = 0; i < ii; i++) {
            try {
                regs[i].onAnimate(time, advance);
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
