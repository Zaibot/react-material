import React from 'react';
import Material from '../material';
import cx from './style.less';
import Animated from '../animated';
import colors from '../colors';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';

export type FocusBarState = 'idle' | 'focus' | 'error';
export interface IFocusBarProps {
    errorClassName: string;
    focusClassName: string;
    idleClassName: string;
    state: FocusBarState;
}
export interface IFocusBarState {
    error: number;
    focus: number;
    idle: number;
}
export interface IFocusBarAnimation {
    error: number;
    focus: number;
    idle: number;
}
const emptyAnimation: IFocusBarAnimation = {
    error: 0,
    focus: 0,
    idle: 0,
};

const snap = (val: number, target: number, distance: number) => {
    return Math.abs(val - target) <= distance ? target : val;
};
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
export default class FocusBar extends React.Component<IFocusBarProps, IFocusBarState> {
    public state = {
        error: 0,
        focus: 0,
        idle: 0,
    };

    public onPreAnimate(time: number, advance: number, state: IFocusBarAnimation = emptyAnimation): IFocusBarAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IFocusBarAnimation): IFocusBarAnimation {
        const stepWeight1 = (advance / 75);
        const error = step(this.state.error, this.props.state === 'error' ? 1 : 0, 100, stepWeight1);
        const focus = step(this.state.focus, this.props.state === 'focus' ? 1 : 0, 100, stepWeight1);
        // const error = step(this.state.error, this.props.state === 'error' && this.state.focus === 0 ? 1 : 0, 100, stepWeight1);
        // const focus = step(this.state.focus, this.props.state === 'focus' && this.state.error === 0 ? 1 : 0, 100, stepWeight1);
        this.setState({ error, focus });
        return state;
    }

    public render() {
        const cssComponent = this.props.idleClassName;
        const cssBar = this.getClassName();
        const styleBar = this.getStyle();
        return (
            <div className={cx(`component`, cssComponent)}>
                {this.state.focus ? <div className={cx(`bar`, this.props.focusClassName)} style={{ transform: `translateX(-50%) scaleX(${this.state.focus})`, opacity: 0.36 + this.state.focus*.64  }} /> : null}
                {this.state.error ? <div className={cx(`bar`, this.props.errorClassName)} style={{ transform: `translateX(-50%) scaleX(${this.state.error})`, opacity: 0.36 + this.state.error*.64  }} /> : null}
            </div>
        );
    }

    private getClassName() {
        if (this.state.error) { return this.props.errorClassName; }
        if (this.state.focus) { return this.props.focusClassName; }
    }
    private getStyle() {
        if (this.state.error) { return { transform: `translateX(-50%) scaleX(${this.state.error})`, opacity: 0.36 + this.state.error*.64  }; }
        if (this.state.focus) { return { transform: `translateX(-50%) scaleX(${this.state.focus})`, opacity: 0.36 + this.state.focus*.64  }; }
        return { transform: `translateX(-50%) scaleX(0%)` };
    }
}
