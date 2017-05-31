import React from 'react';
import Material from '../material';
import cx from './style.less';

export interface IButtonProps {
    className?: string;
    rippleClassName?: string;
    disabled?: boolean;
    round?: boolean;
    ambient?: boolean;
    floating?: boolean;
    big?: boolean;
    raised?: boolean;
    accent?: boolean;
    onClick?: any;
}
export interface IButtonState {
    hover: boolean;
    pressed: boolean;
}

export default class Button extends React.Component<IButtonProps, IButtonState> {
    public state = {
        hover: false,
        pressed: false,
    };

    public render() {
        const { className, onClick, disabled, children } = this.props;
        const { round, raised, accent, floating, big, ambient, rippleClassName } = this.props;
        const { hover, pressed } = this.state;
        const css = cx('component', className, { round, hover, pressed, big });
        return (
            <Material
                ripple={!disabled}
                rippleClassName={rippleClassName}
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
                rounded>
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
