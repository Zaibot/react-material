import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

export interface IDialogProps {
}
export interface IDialogState {
}
export default class Dialog extends React.Component<IDialogProps, IDialogState> {
    public state = {
    };

    public render() {
        const { children } = this.props;
        return (
            <div className={cx(`actions`)}>
                {children}
            </div>
        );
    }
}
