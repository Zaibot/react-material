import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import colors from '../colors';
import Content, { ISize } from '../content';
import Material from '../material';
import cx from './style.less';

const constrain = (val: number, min: number, max: number) => val < min ? min : val > max ? max : val;

export interface IMenuProps {
    disabled?: boolean;
    accent?: boolean;
    onClick?: any;
    open: boolean;
}
export interface IMenuState {
    currentw: number;
    currenth: number;
    paddingw: number;
    paddingh: number;
    height: number;
    width: number;
    progress: number;
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
        currenth: 0,
        currentw: 0,
        paddingh: 0,
        paddingw: 0,
        height: 0,
        opening: false,
        progress: 0,
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
        if (!open && this.state.currentw === 0) { return state; }

        const { opening, toggle, width, height } = this.state;
        // if (open && this.state.currentw === width && this.state.currenth === height) { return state; }
        // if (!open && this.state.currentw === 0 && this.state.currenth === 0) { return state; }

        const stepWeight1 = (advance / 75);
        const stepWeight = (advance / 200);
        const stepWeight2 = (advance / 250);

        const opened = this.state.currentw > width * .8 && this.state.currenth > height * .8;
        const openeda = this.state.currentw > width * .5 && this.state.currenth > height * .5;
        // HACK: Math.min
        const currentw = Math.min(this.state.width, snap(
            this.state.currentw + ((this.props.open ? width : 0) - (!opening && opened && this.state.progress > 0 ? 0 : this.state.currentw)) * stepWeight1,
            width,
            1));
        const currenth = Math.min(this.state.height, snap(
            this.state.currenth + ((this.props.open ? height : 0) - (!opening && opened && this.state.progress > 0 ? 0 : this.state.currenth)) * stepWeight1,
            height,
            1));
        // const currentw = step(this.state.currentw, !open && this.state.progress > 0 ? 0 : this.state.width, 1, opening ? 0.06 : 0.18);
        // const currenth = step(this.state.currenth, !open && this.state.progress > 0 ? 0 : this.state.height, 1, opening ? 0.06 : 0.18);
        const progress = step(this.state.progress, open && opened ? 1 : 0, 100, opening ? 0.06 : 0.18);
        // const currentw = step(this.state.currentw, !opening && opened && this.state.progress > 0 ? 0 : this.state.width, 100, 0.32);
        // const currenth = step(this.state.currenth, !opening && opened && this.state.progress > 0 ? 0 : this.state.height, 100, 0.32);
        // const progress = opening
        //     ? (opened ? constrain(this.state.progress + special * stepWeight, 0, 1) : this.state.progress)
        //     : constrain(this.state.progress - special * stepWeight2, 0, 1);

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
        if (!this.props.open && this.state.currentw === 0) { return null; }
        const { onClick, disabled, children } = this.props;
        const { accent } = this.props;
        const css = cx('component', { open });
        const style = { width: this.state.currentw + this.state.paddingw, height: this.state.currenth + this.state.paddingh };
        const accented = accent;
        return (
            <Material className={cx(css, mdc(colors.bg.grey.n50, colors.text.black.dark))} onClick={onClick} menu slim style={style} divRef={this._setDiv}>
                <Content opacity={this.state.progress} onSize={this._height}>
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
