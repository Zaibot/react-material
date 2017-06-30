import moize from 'moize';
import React from 'react';
import ElevationCss, { Elevation } from '../elevation';
import BorderRadius from '../utils/borderRadius';
import Circle from '../utils/circle';
import Offset from '../utils/offset';
import cx from './style.less';

const dec = 1;
const decScale = 5;

export interface IMaterialProps {
    borderRadius: BorderRadius;
    elevation: Elevation;
    width: number;
    height: number;
    zoom: number;
}

export default moize.react(
    ({ borderRadius: borderRadiusInput, children, elevation, width: widthInput, height: heightInput, zoom = 1 }: IMaterialProps & { children: React.ReactNode }) => {
        const borderRadius = borderRadiusInput ? borderRadiusInput.toBorderRadius() : ``;
        const transform = zoom !== 1 ? `scale(${zoom.toFixed(decScale)})` : ``;
        const width = widthInput === undefined ? widthInput : widthInput.toFixed(dec);
        const height = heightInput === undefined ? heightInput : heightInput.toFixed(dec);

        return (
            <div className={cx(`material`, ElevationCss(elevation))} style={{ borderRadius, transform, width, height }}>
                {children}
            </div>
        );
    },
);
