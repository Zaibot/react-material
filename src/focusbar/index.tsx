import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import { Advance, Spring } from '../animation';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

// tslint:disable no-magic-numbers

export type FocusBarState = 'idle' | 'focus' | 'error';
export interface IFocusBarProps {
    errorClassName: string;
    focusClassName: string;
    idleClassName: string;
    state: FocusBarState;
}
export interface IFocusBarState {
    erroro: number;
    errorw: number;
    focuso: number;
    focusw: number;
}
export interface IFocusBarAnimation {
    erroro: Spring;
    errorw: Spring;
    focuso: Spring;
    focusw: Spring;
}
const emptyAnimation: IFocusBarAnimation = {
    erroro: Spring.generic(0, 0, 0, 150),
    errorw: Spring.generic(0, 0, 0, 200),
    focuso: Spring.generic(0, 0, 0, 150),
    focusw: Spring.generic(0, 0, 0, 200),
};

@Animated
export default class FocusBar extends React.Component<IFocusBarProps, IFocusBarState> {
    public state = {
        erroro: 0,
        errorw: 0,
        focuso: 0,
        focusw: 0,
    };

    public onPreAnimate(time: number, advance: number, state: IFocusBarAnimation = emptyAnimation): IFocusBarAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IFocusBarAnimation): IFocusBarAnimation {
        const errorw = state.erroro.current === 0
            ? state.errorw.jump(0)
            : state.errorw.change(this.props.state === 'error' || state.errorw.current === 1 ? 1 : 0).iterate(advance * 0.001);
        const focusw = state.focuso.current === 0
            ? state.focusw.jump(0)
            : state.focusw.change(this.props.state === 'focus' || state.focusw.current === 1 ? 1 : 0).iterate(advance * 0.001);
        const erroro = state.erroro.change(this.props.state === 'error' ? 1 : 0).iterate(advance * 0.001);
        const focuso = state.focuso.change(this.props.state === 'focus' ? 1 : 0).iterate(advance * 0.001);
        if (erroro.current !== this.state.erroro
            || errorw.current !== this.state.errorw
            || focuso.current !== this.state.focuso
            || focusw.current !== this.state.focusw) {
            this.setState({
                erroro: erroro.current,
                errorw: errorw.current,
                focuso: focuso.current,
                focusw: focusw.current,
            });
        }
        return { erroro, errorw, focuso, focusw };
    }

    public render() {
        const cssComponent = this.props.idleClassName;
        return (
            <div className={cx(`component`, cssComponent)}>
                {this.state.focuso || this.state.focusw
                    ? <div
                        className={cx(`bar`, this.props.focusClassName)}
                        style={{ transform: `translateX(-50%) scaleX(${this.state.focusw.toFixed(5)})`, opacity: this.state.focuso }} />
                    : null}
                {this.state.erroro || this.state.errorw
                    ? <div
                        className={cx(`bar`, this.props.errorClassName)}
                        style={{ transform: `translateX(-50%) scaleX(${this.state.errorw.toFixed(5)})`, opacity: this.state.erroro }} />
                    : null}
            </div>
        );
    }
}
