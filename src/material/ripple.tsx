import React from 'react';
import cx from './style.less';

export type RippleProps = {
    x: number;
    y: number;
    z: number;
    opacity: number;
    className: string;
    color: string;
};

export default class Ripple extends React.Component<RippleProps, any> {
    public render() {
        const { x, y, z, color, opacity, className } = this.props;
        return (
            <div
                className={cx('ripple', className)}
                style={{ backgroundColor: color, opacity, clipPath: `ellipse(${z}px ${z}px at ${x}px ${y}px)` }} />
        );
    }

    // protected shouldComponentUpdate(nextProps: RippleProps, nextState: any) {
    //   return false;
    // }
}
