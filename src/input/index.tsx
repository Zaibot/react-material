import React from 'react';
import Material from '../material';
import cx from './style.less';
import Animated from '../animated';
import FocusBar from '../focusbar';
import colors from '../colors';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';

export interface IInputProps {
    label: string;
    value: string;
}
export interface IInputState {
    helper: number;
    input: number;
    inputControl: HTMLInputElement;
    label: number;
    focused: boolean;
}
export interface IInputAnimation {
    helper: number;
    input: number;
    label: number;
}
const emptyAnimation: IInputAnimation = {
    helper: 0,
    input: 0,
    label: 0,
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
export default class Input extends React.Component<IInputProps, IInputState> {
    public state: IInputState = {
        focused: false,
        helper: 0,
        input: 0,
        inputControl: null,
        label: 0,
    };

    public onPreAnimate(time: number, advance: number, state: IInputAnimation = emptyAnimation): IInputAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IInputAnimation): IInputAnimation {
        const stepWeight1 = (advance / 75);
        const { focused } = this.state;
        const { helper } = state;
        const label = step(this.state.label, focused || this.state.input > 0.25 ? 0 : 1, 100, 0.32);
        const input = step(this.state.input, focused && this.state.label < 0.25 ? 1 : 0, 100, 0.18);
        this.setState({ helper, input, label });
        return state;
    }

    public render() {
        const { label, value } = this.props;

        return (
            <Material slim className={cx('component', mdc(colors.bg.grey.n50), { contents: value })} onClick={this.onClick}>
                <label
                    className={cx('label', mdc(colors.text.black.dark))}
                    style={{ transform: `translateY(${this.state.label * 24}px)`, fontSize: 12 + this.state.label * 4 }}>
                    {label}
                </label>
                <input
                    className={cx('input', mdc(colors.text.black.darker))}
                    style={{ transform: `translateY(${4 + this.state.input * -4}px)`, opacity: this.state.input }}
                    type="text"
                    value={value}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    ref={this.onInput} />
                <FocusBar
                    state={this.state.focused ? 'focus' : 'idle'}
                    idleClassName={cx(`bar`, mdc(colors.bg.grey.n300))}
                    focusClassName={mdc(colors.bg.indigo.n500)}
                    errorClassName={mdc(colors.bg.grey.n500)}
                />
            </Material>
        );
    }

    private onFocus = () => {
        const focused = true;
        this.setState({ focused });
    }
    private onInput = (inputControl: HTMLInputElement) => {
        this.setState({ inputControl });
    }
    private onClick = () => {
        if (this.state.inputControl) {
            this.state.inputControl.focus();
        }
    }
    private onBlur = () => {
        const focused = false;
        this.setState({ focused });
    }
}
