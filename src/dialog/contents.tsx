import React from 'react';
import Material from '../material';
import cx from './style.less';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import colors from '../colors';

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
            <div className={cx(`contents`)}>
                {children}
            </div>
        );
    }
}
