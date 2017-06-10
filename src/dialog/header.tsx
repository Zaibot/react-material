import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

export interface IHeaderProps {
}
export interface IHeaderState {
}
class Header extends React.Component<IHeaderProps, IHeaderState> {
    public state = {
    };

    public render() {
        const { children } = this.props;
        return (
            <div className={cx(`header`, mdc(colors.text.black.darker))}>
                {children}
            </div>
        );
    }
}
export default Header;
