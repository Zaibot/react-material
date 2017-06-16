import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import { Advance, Spring } from '../animation';
import colors from '../colors';
import Content, { ISize } from '../content';
import Material from '../material';
import cx from './style.less';

// tslint:disable no-magic-numbers

const constrain = (val: number, min: number, max: number) => val < min ? min : val > max ? max : val;

export interface IMenuProps {
    disabled?: boolean;
    accent?: boolean;
    onClick?: any;
    open: boolean;
}
export interface IMenuAnimation {
    width: number;
    height: number;
}

const parsePixels = (text: string) => {
    const n = Number(text.substring(0, text.length - 2));
    if (isNaN(n)) { return 0; }
    return n;
};

class Menu extends React.Component<IMenuProps, {}> {
    public render() {
        const { onClick, disabled, children } = this.props;
        const css = cx('component', { open }/*, mdc(colors.bg.blue.n300)*/);
        return (
            <div className={css} onClick={onClick}>
                {children}
            </div>
        );
    }
}
export default Menu;
