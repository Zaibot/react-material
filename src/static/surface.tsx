import React from 'react';
import BorderRadius from './borderRadius';
import Circle from './circle';
import Offset from './offset';
import cx from './style.less';

const dec = 1;

export interface ISurfaceProps {
    circle: Circle;
    className: string;
    offset: Offset;
    opacity: number;
    width: number;
    height: number;
}

export default ({ children, circle, className, offset, opacity, width: widthInput, height: heightInput }: ISurfaceProps & { children: React.ReactNode }) => {
    const clipPath = circle ? circle.toClipPath() : ``;
    const transform = offset ? offset.toTransform() : ``;
    const position: any = offset ? `` : `static`;
    const WebkitClipPath = clipPath;
    const width = widthInput === undefined ? widthInput : widthInput.toFixed(dec);
    const height = heightInput === undefined ? heightInput : heightInput.toFixed(dec);

    return (
        <div className={cx(`surface`, className)} style={{ clipPath, opacity, position, transform, WebkitClipPath, width, height }}>
            {children}
        </div>
    );
};
