import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import Button from '../button';
import colors from '../colors';
import Surface from '../surface';
import Space from '../space';
import Material from '../material';
import Menu from '../menu';
import Focus from '../surface/focus';
import cx from './style.less';

export interface MenuProps {
    focus: Focus;
    focusMenu?: Focus;
    menu: (onClick: () => void) => React.ReactElement<any>;
}
export interface MenuState {
    open: boolean;
}

class ToggleMenu extends React.Component<MenuProps, MenuState> {
    public state = {
        open: false,
    };

    public render() {
        const { children, focus, focusMenu } = this.props;
        const { open } = this.state;
        return (
            <Space>
                <Surface
                    center={focus || { x: .5, y: .5 }}
                    focus={1}
                    size={open ? 0 : 1}
                    reserve={1}
                    front={open ? 0 : 1}
                    opacity={open ? 0 : 1}
                    shape={open ? 0 : 1}
                    type={'circle'} >
                    <Button round rippleClassName={mdc(colors.bg.grey.n500)} onClick={this.onToggle}>{children}</Button>
                </Surface>
                <Surface
                    center={focusMenu || focus || { x: .5, y: .5 }}
                    focus={0}
                    size={open ? 1 : 0}
                    reserve={0}
                    front={open ? 1 : 0}
                    opacity={open ? 1 : 0}
                    shape={open ? 1 : 0}
                    type={'rectangle'} >
                    {this.props.menu(this.onToggle)}
                </Surface>
            </Space>
        );
    }

    private onToggle = () => {
        const open = !this.state.open;
        this.setState({ open });
    }
}
export default ToggleMenu;
