import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import { Spring } from '../animation';
import Presets from '../animation/presets';
import colors from '../colors';
import Material from '../material';
import Surface, { ISurfaceSize } from '../surface';
import Focus from '../surface/focus';
import { SurfaceAnimation, SurfaceMeasure } from './';
import SpaceCore from './space';
import cx from './style.less';
import { calcSize, calcBorderRadius, calcClipPath } from './mask';

export interface ISpaceProps {
    reserveWidth: number;
    reserveHeight: number;
    spaceWidth: number;
    spaceHeight: number;
    offsetX: number;
    offsetY: number;
    size: number;
    rounding: number;
    surfaces: IChild[];
    onSize: (size: ISurfaceSize) => void;
}

export interface IChild {
    surfaceKey: any;
    surface: Surface;
    width: number;
    height: number;
    center: { x: number; y: number };
    focus: number;
    size: number;
    reserve: number;
    front: number;
    opacity: number;
    circleSize: number;
    shape: number;
}
export interface IChild2 {
    reserveWidth: number;
    spaceWidth: number;
    reserveHeight: number;
    spaceHeight: number;
    offsetX: number;
    offsetY: number;
    rounding: number;
    onSize: (size: ISurfaceSize) => void;

    surfaceKey: any;
    surface: Surface;
    width: number;
    height: number;
    center: { x: number; y: number };
    focus: number;
    size: number;
    reserve: number;
    front: number;
    opacity: number;
    circleSize: number;
    shape: number;
}
const SurfacePrep = ({
    reserveWidth,
    spaceWidth,
    reserveHeight,
    spaceHeight,
    offsetX,
    offsetY,
    rounding,
    onSize,
    surface, surfaceKey, width, height, center, focus, size, reserve, front, opacity, shape, circleSize }: IChild2) => {
    if (!opacity) { return null; }
    const position = 'absolute';
    const top = 0;
    const left = 0;
    const visibility = opacity && front && size ? 'visible' : 'hidden';
    const offsetLeft = (reserveWidth - spaceWidth) * (center.x - offsetX);
    const offsetTop = (reserveHeight - spaceHeight) * (center.y - offsetY);
    const transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    const clipPath = calcClipPath(spaceWidth, spaceHeight, size, spaceWidth * .5 - offsetLeft, spaceHeight * .5 - offsetTop);
    return (
        <span style={{ opacity, visibility, position, top, left, transform, clipPath, WebkitClipPath: clipPath }}>
            <Surface
                key={`${surfaceKey}`}
                surfaceKey={`${surfaceKey}`}
                center={center}
                focus={focus}
                size={size}
                reserve={reserve}
                front={front}
                opacity={opacity}
                shape={shape}
                type={surface.props.type}
                onSize={onSize}>
                {surface.props.children}
            </Surface>
        </span>
    );
};
export default ({ reserveWidth, reserveHeight, spaceWidth, spaceHeight, size, rounding, offsetX, offsetY, surfaces, onSize }: ISpaceProps) => {
    const spaceOffsetX = (reserveWidth - spaceWidth) * offsetX;
    const spaceOffsetY = (reserveHeight - spaceHeight) * offsetY;
    const positioned = surfaces.map((x) => (
        <SurfacePrep
            reserveWidth={reserveWidth}
            spaceWidth={spaceWidth}
            reserveHeight={reserveHeight}
            spaceHeight={spaceHeight}
            offsetX={offsetX}
            offsetY={offsetY}
            rounding={rounding}
            onSize={onSize}
            surface={x.surface}
            key={x.surfaceKey}
            surfaceKey={x.surfaceKey}
            width={x.width}
            height={x.height}
            center={x.center}
            focus={x.focus}
            size={x.size}
            reserve={x.reserve}
            front={x.front}
            opacity={x.opacity}
            shape={x.shape}
            circleSize={x.circleSize} />
    ));
    const containerStyle = {
        height: reserveHeight,
        width: reserveWidth,
    };
    const innerStyle = {
        ...calcBorderRadius(spaceWidth, spaceHeight, size, offsetX, offsetY, rounding),
        ...calcSize(spaceWidth, spaceHeight, size, offsetX, offsetY, rounding),
        transform: `translate(${spaceOffsetX}px, ${spaceOffsetY}px)`,
        overflow: 'hidden' as any,
    };
    return (
        <div className={cx(`component`)} style={containerStyle}>
            <Material className={mdc(colors.bg.grey.n50, colors.text.black.darker)} style={innerStyle} floating>
                {positioned}
            </Material>
        </div>
    );
};
