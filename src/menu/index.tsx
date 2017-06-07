import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import { Advance, Spring } from '../animation';
import colors from '../colors';
import Content, { ISize } from '../content';
import Material from '../material';
import cx from './style.less';

// tslint:disable no-magic-numbers

const constrain = (val: number, min: number, max: number) => val < min ? min : val > max ? max : val;

export interface IMenuProps {
    disabled?: boolean;
    accent?: boolean;
    onClick?: any;
    open: boolean;
}
export interface IMenuState {
    currentw: Spring;
    currenth: Spring;
    paddingw: number;
    paddingh: number;
    height: number;
    width: number;
    progress: Spring;
    toggle: number;
    opening: boolean;
}
export interface IMenuAnimation {
    width: number;
    height: number;
}

const special = 1.61803398875;

const snap = (val: number, target: number, distance: number) => Math.abs(val - target) <= distance ? target : val;
const step = (val: number, target: number, scale: number, velocity: number) => {
    // console.log(val, target, velocity);
    if (target > val) {
        return snap(val + Math.ceil((target - val) * velocity * scale) / scale, target, 1 / scale);
    } else if (target < val) {
        return snap(val - Math.ceil((val - target) * velocity * scale) / scale, target, 1 / scale);
    } else {
        return target;
    }
};

@Animated
export default class Menu extends React.Component<IMenuProps, IMenuState> {
    public state = {
        currenth: Spring.flex(0, 0, 0, 500, 1.2),
        currentw: Spring.flex(0, 0, 0, 500, 1.2),
        paddingh: 0,
        paddingw: 0,
        height: 0,
        opening: false,
        progress: Spring.generic(0, 0, 0, 300),
        toggle: 0,
        width: 0,
    };
    private _div: HTMLDivElement;
    private _canAni = true;

    public onPreAnimate(time: number, advance: number, state: IMenuAnimation = { width: 0, height: 0 }): IMenuAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IMenuAnimation): IMenuAnimation {
        if (!this._div) { return state; }

        const { open } = this.props;
        if (!open && this.state.currentw.current === 0) { return state; }

        const { opening, toggle, width, height } = this.state;

        const currentw = this.state.currentw.change(open || this.state.progress.current > 0.2 ? this.state.width : 0).iterate(advance * 0.001);
        const currenth = this.state.currenth.change(open || this.state.progress.current > 0.2 ? this.state.height : 0).iterate(advance * 0.001);
        const progress = this.state.progress.change(open && (currentw.current / width) > 0.8 ? 1 : 0).iterate(advance * 0.001);

        const c = window.getComputedStyle(this._div);
        const paddingw = parseInt(c.paddingLeft, 10) + parseInt(c.paddingRight, 10);
        const paddingh = parseInt(c.paddingTop, 10) + parseInt(c.paddingBottom, 10);
        if (currentw !== this.state.currentw
            || currenth !== this.state.currenth
            || progress !== this.state.progress
            || paddingw !== this.state.paddingw
            || paddingh !== this.state.paddingh) {
            this.setState({ currentw, currenth, progress, paddingw, paddingh });
        }
        return state;
    }

    public render() {
        if (!this.props.open && this.state.currentw.current === 0) { return null; }
        const { onClick, disabled, children } = this.props;
        const { accent } = this.props;
        const css = cx('component', { open });
        const width = this.state.currentw.current + this.state.paddingw;
        const height = this.state.currenth.current + this.state.paddingh;
        const opacity = Math.min(this.state.currentw.current, 10) / 10;
        const style = { width, height, opacity };
        const accented = accent;
        return (
            <Material className={cx(css, mdc(colors.bg.grey.n50, colors.text.black.dark))} onClick={onClick} menu slim style={style} divRef={this._setDiv}>
                <Content opacity={this.state.progress.current} onSize={this._height}>
                    {children}
                </Content>
            </Material>
        );
    }

    protected componentWillReceiveProps(nextProps: IMenuProps) {
        if (nextProps.open !== this.props.open) {
            const opening = nextProps.open;
            const toggle = Date.now();
            this.setState({ opening, toggle });
        }
    }

    private _setDiv = (div: HTMLDivElement) => {
        this._div = div;
    }

    private _height = (d: ISize) => {
        const width = d.x;
        const height = d.y;
        this.setState({ width, height });
    }
}
