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

export interface ISpaceProps {
    reserveWidth: number;
    reserveHeight: number;
    spaceWidth: number;
    spaceHeight: number;
    offsetX: number;
    offsetY: number;
    borderRadius: number;
    rounding: number;
    surfaces: IChild[];
    onSize: (size: ISurfaceSize) => void;
}

export interface IChild {
    key: any;
    surface: Surface;
    width: number;
    height: number;
    center: number;
    size: number;
    reserve: number;
    front: number;
    opacity: number;
    circleSize: number;
    shape: number;
}

export default ({ reserveWidth, reserveHeight, spaceWidth, spaceHeight, borderRadius, rounding, offsetX, offsetY, surfaces, onSize }: ISpaceProps) => {
    const spaceOffsetX = (reserveWidth - spaceWidth) * offsetX;
    const spaceOffsetY = (reserveHeight - spaceHeight) * offsetY;
    const positioned =
        surfaces.map(({ surface, key, width, height, center, size, reserve, front, opacity, shape, circleSize }) => {
            const position = 'absolute';
            const top = 0;
            const left = 0;
            if (!opacity) { return null; }
            const visibility = opacity && front && size ? 'visible' : 'hidden';
            const offsetLeft = (reserveWidth - spaceWidth) * (surface.props.center.x - offsetX);
            const offsetTop = (reserveHeight - spaceHeight) * (surface.props.center.y - offsetY);
            const transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
            const clipPath = `ellipse(${rounding}px ${rounding}px at ${spaceWidth * .5 - offsetLeft}px ${spaceHeight * .5 - offsetTop}px)`;
            return (
                <span style={{ opacity, visibility, position, top, left, transform, clipPath, WebkitClipPath: clipPath }}>
                    <Surface
                        key={`${key}`}
                        surfaceKey={`${key}`}
                        center={surface.props.center}
                        focus={surface.props.focus}
                        size={surface.props.size}
                        reserve={surface.props.reserve}
                        front={surface.props.front}
                        opacity={surface.props.opacity}
                        shape={surface.props.shape}
                        type={surface.props.type}
                        onSize={onSize}>
                        {surface.props.children}
                    </Surface>
                </span >
            );
        });
    const containerStyle = {
        height: reserveHeight,
        width: reserveWidth,
    };
    const innerStyle = {
        borderRadius,
        height: spaceHeight,
        transform: `translate(${spaceOffsetX}px, ${spaceOffsetY}px)`,
        width: spaceWidth,
    };
    return (
        <div className={cx(`component`)} style={containerStyle}>
            <Material className={mdc(colors.bg.grey.n50, colors.text.black.darker)} style={innerStyle} floating>
                {positioned}
            </Material>
        </div>
    );
};
