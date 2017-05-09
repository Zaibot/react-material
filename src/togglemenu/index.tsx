import React from 'react';
import { RootSymbol, GetRoot, Animated } from '../animationroot';
import Menu from '../menu';
import Material from '../material';
import Button from '../button';
import cx from './style.less';

export type MenuProps = {
    menu: React.ReactElement<any>
};
export type MenuState = {
    open: boolean;
};

export default class ToggleMenu extends React.Component<MenuProps, MenuState> {
    public state = {
        open: false,
    }

    public render() {
        return (
            <span>
                <Button onClick={() => this.setState({ open: !this.state.open })}>{this.props.children}</Button>
                {React.cloneElement(this.props.menu, { open: this.state.open })}
            </span>
        );
    }
}
