import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

export { default as DialogHeader } from './header';
export { default as DialogSubheader } from './subheader';
export { default as DialogContents } from './contents';
export { default as DialogActions } from './actions';

export interface IDialogProps {
}
export interface IDialogState {
}
export default class Dialog extends React.Component<IDialogProps, IDialogState> {
    public state = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
    };

    public render() {
        const { children } = this.props;
        return (
            <Material
                className={cx(`dialog`, mdc(colors.bg.grey.n50, colors.text.black.dark))}
                rippleClassName={mdc(colors.bg.grey.n500)}
                rounded dialog slim ambient>
                {children}
            </Material>
        );
    }
}
