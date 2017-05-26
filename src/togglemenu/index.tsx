import React from 'react';
import Animated from '../animated';
import Button from '../button';
import Material from '../material';
import Menu from '../menu';
import cx from './style.less';

export interface MenuProps {
    menu: React.ReactElement<any>;
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
                <Button onClick={() => this.setState({ open: !this.state.open })}>{this.props.children}</Button>
                {React.cloneElement(this.props.menu, { open: this.state.open })}
            </span>
        );
    }
}
