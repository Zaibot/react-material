
import React from 'react';




import Surface, { ISurfaceSize } from '../surface';

import { calcClipPath } from './mask';




export interface ISurfaceWrapperProps {
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
export default ({
    reserveWidth,
    spaceWidth,
    reserveHeight,
    spaceHeight,
    offsetX,
    offsetY,
    rounding,
    onSize,
    surface, surfaceKey, width, height, center, focus, size, reserve, front, opacity, shape, circleSize }: ISurfaceWrapperProps) => {
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
