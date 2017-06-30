import moize from 'moize';
import React from 'react';
import BorderRadius from '../utils/borderRadius';
import Position from '../utils/position';
import cx from './style.less';

const dec = 1;

export interface IOffsetProps {
    className: string;
    borderRadius?: BorderRadius;
    width: number;
    height: number;
    offset?: Position;
}

export default moize.react(
    ({ borderRadius: borderRadiusInput, children, className, offset, width: widthInput, height: heightInput }: IOffsetProps & { children: React.ReactNode }) => {
        const borderRadius = borderRadiusInput ? borderRadiusInput.toBorderRadius() : ``;
        const top = offset ? offset.y.toFixed(dec) : 0;
        const left = offset ? offset.x.toFixed(dec) : 0;
        const width = widthInput === undefined ? undefined : `${widthInput.toFixed(dec)}px`;
        const height = heightInput === undefined ? undefined : `${heightInput.toFixed(dec)}px`;
        const transform = `translate(${top}px, ${left}px)`;
        return (
            <div className={cx(`offset`, className)} style={{ borderRadius, transform, width, height }}>
                {children}
            </div>
        );
    },
);
