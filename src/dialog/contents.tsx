import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

export interface IContentsProps {
}
export interface IContentsState {
}
class Contents extends React.Component<IContentsProps, IContentsState> {
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
export default Contents;
