import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

export interface IActionsProps {
}
export interface IActionsState {
}
export default class Actions extends React.Component<IActionsProps, IActionsState> {
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
