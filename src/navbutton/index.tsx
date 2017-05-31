import React from 'react';
import Material from '../material';
import cx from './style.less';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import colors from '../colors';

export interface ButtonProps {
    disabled?: boolean;
    round?: boolean;
    raised?: boolean;
    accent?: boolean;
    onClick?: any;
}
export interface ButtonState {
    hover: boolean;
    pressed: boolean;
}

export default class NavButton extends React.Component<ButtonProps, ButtonState> {
    public state = {
        hover: false,
        pressed: false,
    };

    public render() {
        const { onClick, disabled, children } = this.props;
        const { round, raised, accent } = this.props;
        const { hover, pressed } = this.state;
        const css = cx('component', mdc(colors.bg.grey.n50), mdc(colors.text.black.darker), { round, hover, pressed });
        const cssRipple = mdc(colors.bg.grey.n800);
        // const colorAccent = '#222';
        // const colorText = '#fff';
        const accented = raised !== accent;
        return (
            <Material
                ripple={!disabled}
                className={css}
                rippleClassName={cssRipple}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onClick={onClick}
                card={raised && !(pressed || hover)}
                menu={raised && (pressed || hover)}
                round={round}>
                {children}
            </Material>
        );
    }

    private onMouseDown = () => {
        this.setState({ pressed: true });
    }
    private onMouseUp = () => {
        this.setState({ pressed: false });
    }
}
