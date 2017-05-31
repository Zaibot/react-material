import React from 'react';
import Material from '../material';
import cx from './style.less';
import Animated from '../animated';

export interface IInputProps {
    label: string;
    value: string;
}
export interface IInputState {
    helper: number;
    input: number;
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
        return snap(val + Math.ceil((target - val) * velocity * scale) / scale, target, 1/scale);
    } else if (target < val) {
        return snap(val - Math.ceil((val - target) * velocity * scale) / scale, target, 1/scale);
    } else {
        return target;
    }
};

@Animated
export default class Input extends React.Component<IInputProps, IInputState> {
    public state = {
        helper: 0,
        input: 0,
        label: 0,
        focused: false,
    };

    public onPreAnimate(time: number, advance: number, state: IInputAnimation = emptyAnimation): IInputAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IInputAnimation): IInputAnimation {
        const stepWeight1 = (advance / 75);
        const { focused } = this.state;
        const { helper } = state;
        const label = step(this.state.label, focused ? 0 : 1, 100, 0.16);
        const input = step(this.state.input, focused && label < 0.1 ? 1 : 0, 100, 0.24);
        this.setState({ helper, input, label });
        return state;
    }

    public render() {
        const { label, value } = this.props;

        return (
            <Material slim className={cx('component', { contents: value })}>
                <label className={cx('label')} style={{ transform: `translateY(${this.state.label * 16}px)`, fontSize: 12 + this.state.label * 4 }}>{label}</label>
                <input className={cx('input')} style={{ opacity: this.state.input }} type="text" value={value} onFocus={this.onFocus} onBlur={this.onBlur} />
            </Material>
        );
    }

    private onFocus = () => {
        const focused = true;
        this.setState({ focused });
    }
    private onBlur = () => {
        const focused = false;
        this.setState({ focused });
    }
}
