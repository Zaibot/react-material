import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import { Advance, Spring } from '../animation';
import Presets from '../animation/presets';
import colors from '../colors';
import FocusBar from '../focusbar';
import Material from '../material';
import Theme from '../theme';
import Slider from './slider';
import cx from './style.less';

// tslint:disable no-magic-numbers

export interface IInputProps {
    max: number;
    min: number;
    step?: number;
    value: number;
    onChange: (val: number) => void;
}
export interface IInputState {
    changing: boolean;
    value: number;
}
export interface IInputAnimation {
    value: Spring;
}
const emptyAnimation: IInputAnimation = {
    value: Presets.Spring200,
};

@Animated()
class Input extends React.Component<IInputProps, IInputState> {
    public state: IInputState = {
        changing: false,
        value: 0,
    };

    public onPreAnimate(time: number, advance: number, state: IInputAnimation = emptyAnimation): IInputAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IInputAnimation): IInputAnimation {
        const value = state.value.change(this.props.value).speed(this.state.changing ? 1000 : 100).iterate(advance * 1.000);

        if (this.state.value !== value.current) {
            this.setState({
                value: value.current,
            });
        }

        return { value };
    }

    public render() {
        const { step, min, max } = this.props;
        const { value, changing } = this.state;
        return (
            <Slider
                value={value}
                step={step}
                min={min}
                max={max}
                onHover={this.onHover}
                onBegin={this.onBegin}
                onChange={this.onChange}
                onEnd={this.onEnd}
            />
        );
    }

    private onHover = (value: number) => {
        if (this.state.changing && this.props.onChange) {
            this.props.onChange(value);
        }
    }
    private onBegin = (value: number) => {
        const changing = true;
        this.setState({ changing });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    private onChange = (value: number) => {
        // const changing = true;
        // this.setState({ changing });
    }
    private onEnd = (value: number) => {
        const changing = false;
        this.setState({ changing });
    }
}
export default Input;
