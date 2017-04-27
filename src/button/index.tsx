import React from 'react';
import Material from '../material';
import cx from './style.less';

export type ButtonProps = {
    disabled?: boolean;
    round?: boolean;
    floating?: boolean;
    big?: boolean;
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
        const { round, raised, accent, floating, big } = this.props;
        const { hover, pressed } = this.state;
        const css = cx('component', { round, hover, pressed, big });
        const colorAccent = '#ff4081';
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
                card={(raised || floating) && !(pressed || hover)}
                menu={(raised || floating) && (pressed || hover)}
                round={round}
                floating={floating}
                inline
                rounded
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
