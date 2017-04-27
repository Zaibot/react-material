import React from 'react';
import Material from '../material';
import cx from './style.less';

export type ButtonProps = {
    disabled?: boolean;
    round?: boolean;
    raised?: boolean;
    accent?: boolean;
    onClick?: any;
};
export type ButtonState = {
    hover: boolean;
    pressed: boolean;
};

export default class Button extends React.Component<ButtonProps, ButtonState> {
    public state = {
        hover: false,
        pressed: false,
    };

    public render() {
        const { onClick, disabled, children } = this.props;
        const { round, raised, accent } = this.props;
        const { hover, pressed } = this.state;
        const css = cx('component', { round, hover, pressed });
        const colorAccent = '#222';
        const colorText = '#fff';
        const accented = raised !== accent;
        return (
            <Material
                ripple={!disabled}
                color={accented ? colorAccent : colorText}
                className={css}
                rippleColor={accented ? colorText : colorAccent}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onClick={onClick}
                card={raised && !(pressed || hover)}
                menu={raised && (pressed || hover)}
                round={round}
                style={{ color: accented ? colorText : colorAccent }}>
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
