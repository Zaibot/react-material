import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import { Advance, Spring } from '../animation';
import Presets from '../animation/presets';
import colors from '../colors';
import FocusBar from '../focusbar';
import Material from '../material';
import Theme from '../theme';
import cx from './style.less';

// tslint:disable no-magic-numbers

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
  helper: Spring;
  input: Spring;
  label: Spring;
}
const emptyAnimation: IInputAnimation = {
  helper: Presets.Spring300,
  input: Presets.Spring300,
  label: Presets.Spring500,
};

@Animated()
class Input extends React.Component<IInputProps, IInputState> {
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
    const { focused } = this.state;
    const label = state.label.change(focused || this.props.value || state.input.current === 1 ? 0 : 1).iterate(advance).constrain(0, 1);
    const input = state.input.change(focused || (this.props.value && state.label.current === 0) ? 1 : 0).iterate(advance).constrain(0, 1);
    const helper = state.helper.change(focused || this.props.error ? 1 : 0).speed(this.props.error || this.state.input > 0.5 ? 100 : 150).iterate(advance).constrain(0, 1);
    if (this.state.helper !== helper.current
      || this.state.input !== input.current
      || this.state.label !== label.current) {
      this.setState({ helper: helper.current, input: input.current, label: label.current });
    }
    if (state.helper !== helper
      || state.input !== input
      || state.label !== label) {
      return { helper, input, label };
    } else {
      return state;
    }
  }

  public render() {
    const { label, helper, value, error } = this.props;
    const focus = this.state.focused;
    return (
      <Material slim className={cx('component', mdc(colors.bg.grey.n50), { contents: value })} onClick={this.onClick}>
        <label
          className={cx('label', mdc(colors.text.black.dark), { focus, error })}
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
          state={this.props.error ? 'error' : this.state.focused ? 'focus' : 'idle'}
          idleClassName={cx(`bar`, mdc(colors.bg.grey.n300))}
          focusClassName={mdc(colors.bg.blue.n700)}
          errorClassName={mdc(colors.bg.red.n700)}
        />
        <span
          className={cx('helper', mdc(colors.text.black.dark), { error })}
          style={{ transform: `translateY(${Theme.rem(-12 + this.state.helper * 12)}\)`, opacity: this.state.helper * this.state.helper }}>
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
export default Input;
