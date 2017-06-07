import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import colors from '../colors';
import FocusBar from '../focusbar';
import Material from '../material';
import Theme from '../theme';
import cx from './style.less';

export interface IInputProps {
    helper?: React.ReactChild;
    label: React.ReactChild;
    value: string;
    error?: React.ReactChild;
    onChange?: (val: string) => void;
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
        const { } = state;
        const label = step(this.state.label, focused || this.props.value || this.state.input === 1 ? 0 : 1, 100, 0.32);
        const input = step(this.state.input, focused || (this.props.value && this.state.label === 0) ? 1 : 0, 100, 0.18);
        // const label = step(this.state.label, this.props.value || this.state.input > 0.25 ? 0 : 1, 100, 0.32);
        // const input = step(this.state.input, focused || (this.props.value && this.state.label < 0.25) ? 1 : 0, 100, 0.18);
        const helper = step(this.state.helper, this.props.error || focused ? 1 : 0, 100, this.props.error || this.state.input > 0.5 ? 0.12 : 0.18);
        this.setState({ helper, input, label });
        return state;
    }

    public render() {
        const { label, helper, value, error } = this.props;

        return (
            <Material slim className={cx('component', mdc(colors.bg.grey.n50), { contents: value })} onClick={this.onClick}>
                <label
                    className={cx('label', mdc(colors.text.black.dark), { error })}
                    style={{ transform: `translateY(${Theme.rem(this.state.label * 24)}\)`, fontSize: Theme.rem(12 + this.state.label * 4) }}>
                    {label}
                </label>
                <input
                    className={cx('input', mdc(colors.text.black.darker))}
                    style={{ transform: `translateY(${Theme.rem(4 + this.state.input * -4)}\)`, opacity: this.state.input }}
                    type="text"
                    value={value}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    ref={this.onInput} />
                <FocusBar
                    state={this.state.focused ? 'focus' : this.props.error ? 'error' : 'idle'}
                    idleClassName={cx(`bar`, mdc(colors.bg.grey.n300))}
                    focusClassName={mdc(colors.bg.blue.n700)}
                    errorClassName={mdc(colors.bg.red.n700)}
                />
                <span
                    className={cx('helper', mdc(colors.text.black.dark), { error })}
                    style={{ transform: `translateY(${Theme.rem(-12 + this.state.helper * 12)}\)`, opacity: this.state.helper }}>
                    {error || helper}
                </span>
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
    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.props.onChange) { return; }
        this.props.onChange(e.target.value);
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
