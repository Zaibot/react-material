import React from 'react';
import cx from './style.less';

export interface IRippleProps {
    x: number;
    y: number;
    z: number;
    opacity: number;
    className: string;
    color: string;
}

export default class Ripple extends React.Component<IRippleProps, any> {
    public render() {
        const { x, y, z, color, opacity, className } = this.props;
        const clipPath = `ellipse(${z}px ${z}px at ${x}px ${y}px)`;
        return (
            <div
                className={cx('ripple', className)}
                style={{ backgroundColor: color, clipPath, opacity, WebkitClipPath: clipPath }} />
        );
    }

    protected shouldComponentUpdate(nextProps: IRippleProps, nextState: any) {
        return this.props.x !== nextProps.x
            || this.props.y !== nextProps.y
            || this.props.z !== nextProps.z
            || this.props.opacity !== nextProps.opacity
            || this.props.className !== nextProps.className
            || this.props.color !== nextProps.color;
    }
}
