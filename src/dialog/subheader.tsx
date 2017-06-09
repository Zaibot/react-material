import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

export interface ISubheaderProps {
}
export interface ISubheaderState {
}
export default class Subheader extends React.Component<ISubheaderProps, ISubheaderState> {
    public state = {
    };

    public render() {
        const { children } = this.props;
        return (
            <div className={cx(`subheader`, mdc(colors.bg.grey.n300, colors.text.black.darker))}>
                {children}
            </div>
        );
    }
}
