import React from 'react';
import Material from '../material';
import cx from './style.less';

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    round?: boolean;
    ambient?: boolean;
    floating?: boolean;
    big?: boolean;
    raised?: boolean;
    accent?: boolean;
    onClick?: any;
}
export interface ButtonState {
    hover: boolean;
    pressed: boolean;
}

export default class Button extends React.Component<ButtonProps, ButtonState> {
    public state = {
        hover: false,
        pressed: false,
    };

    public render() {
        const { className, onClick, disabled, children } = this.props;
        const { round, raised, accent, floating, big, ambient } = this.props;
        const { hover, pressed } = this.state;
        const css = cx('component', className, { round, hover, pressed, big });
        const colorAccent = '#ff4081';
        const colorText = '#fff';
        // style={{ color: accented ? colorText : colorAccent }}
        const accented = raised !== accent;
        return (
            <Material
                ripple={!disabled}
                className={css}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onClick={onClick}
                card={(raised || floating) && !(pressed || hover)}
                menu={(raised || floating) && (pressed || hover)}
                round={round}
                ambient={ambient}
                floating={floating}
                inline
                rounded
                color={accented ? colorAccent : colorText}
                rippleColor={accented ? colorText : colorAccent}>
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
