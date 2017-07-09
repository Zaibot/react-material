import moize from 'moize';
import React from 'react';
import BorderRadius from '../utils/borderRadius';
import Circle from '../utils/circle';
import Position from '../utils/position';
import cx from './style.less';

const dec = 1;

export interface ISurfaceProps {
    circle: Circle;
    className: string;
    offset: Position;
    opacity: number;
    width: number;
    height: number;
}

export default ({ children, circle, className, offset, opacity, width: widthInput, height: heightInput }: ISurfaceProps & { children?: React.ReactNode }) => {
    const clipPath = circle ? circle.toClipPath() : ``;
    const transform = offset ? offset.toTransform() : ``;
    const position: any = offset ? `` : `static`;
    const WebkitClipPath = clipPath;
    const width = widthInput === undefined ? undefined : `${widthInput.toFixed(dec)}px`;
    const height = heightInput === undefined ? undefined : `${heightInput.toFixed(dec)}px`;
    return (
        <div className={cx(`surface`, className)} style={{ clipPath, opacity, position, transform, WebkitClipPath, width, height }}>
            {children}
        </div>
    );
};
