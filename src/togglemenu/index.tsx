import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import Button from '../button';
import colors from '../colors';
import Material from '../material';
import Menu from '../menu';
import cx from './style.less';

export interface MenuProps {
    menu: (onClick: () => void) => React.ReactElement<any>;
}
export interface MenuState {
    open: boolean;
}

export default class ToggleMenu extends React.Component<MenuProps, MenuState> {
    public state = {
        open: false,
    };

    public render() {
        return (
            <span>
                <Button
                    className={mdc(colors.bg.indigo.n500, colors.text.white.dark)}
                    rippleClassName={mdc(colors.bg.indigo.n50)}
                     onClick={() => this.setState({ open: !this.state.open })}
                     round>{this.props.children}</Button>
                {React.cloneElement(this.props.menu(() => this.setState({ open: false })), { open: this.state.open })}
            </span>
        );
    }
}
