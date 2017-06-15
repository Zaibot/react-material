import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import cx from './style.less';
import Animated from '../animated';
import { GetAnimationRoot } from '../animationroot';
import { Spring } from '../animation';
import Presets from '../animation/presets';
import Material from '../material';
import Surface, { ISurfaceSize } from '../surface';
import Focus from '../surface/focus';
import SpaceCore from './space';

// tslint:disable max-classes-per-file

const ensureFinite = (n: number) => isFinite(n) ? n : 0;

export interface ISpaceProps {

}
export interface ISpaceState {
    sizeHeight: Spring;
    sizeWidth: Spring;
    rounding: Spring;
    surfaces: SurfaceAnimation[];
    sizes: SurfaceMeasure[];
}

export class SurfaceAnimation {
    public constructor(
        public readonly center: Spring,
        public readonly size: Spring,
        public readonly reserve: Spring,
        public readonly front: Spring,
        public readonly opacity: Spring,
        public readonly shape: Spring,
    ) { }

    public iterate(advance: number) {
        const center = this.center.iterate(advance);
        const size = this.size.iterate(advance);
        const reserve = this.reserve.iterate(advance);
        const front = this.front.iterate(advance);
        const opacity = this.opacity.iterate(advance);
        const shape = this.shape.iterate(advance);
        if (center !== this.center
            || size !== this.size
            || reserve !== this.reserve
            || front !== this.front
            || opacity !== this.opacity
            || shape !== this.shape) {
            return new SurfaceAnimation(center, size, reserve, front, opacity, shape);
        }
        return this;
    }

    public change(
        center: number,
        size: number,
        reserve: number,
        front: number,
        opacity: number,
        shape: number,
    ) {
        if (center !== this.center.target
            || size !== this.size.target
            || reserve !== this.reserve.target
            || front !== this.front.target
            || opacity !== this.opacity.target
            || shape !== this.shape.target) {
            return new SurfaceAnimation(
                this.center.change(center),
                this.size.change(size),
                this.reserve.change(reserve),
                this.front.change(front),
                this.opacity.change(opacity),
                this.shape.change(shape),
            );

        }
        return this;
    }
}
export class SurfaceMeasure {
    public constructor(
        public readonly width: number,
        public readonly height: number,
    ) { }

    public change(width: number, height: number) {
        if (width !== this.width || height !== this.height) {
            return new SurfaceMeasure(width, height);
        }
        return this;
    }
}
export interface IInputAnimation {
    surfaces: SurfaceAnimation[];
}
const emptyAnimation: IInputAnimation = {
    surfaces: [],
};

function smartUpdate<T>(array: T[], map: (item: T, idx?: number) => T) {
    let res: T[] = null;
    let i = 0;
    const ii = array.length;
    for (; i < ii; i++) {
        const n = map(array[i], i);
        if (n !== array[i]) {
            res = array.slice(0);
            res[i] = n;
            break;
        }
    }
    if (!res) { return array; }
    for (; i < ii; i++) {
        res[i] = map(array[i], i);
    }
    return res;
}

@Animated()
class Space extends React.Component<ISpaceProps, ISpaceState> {
    public state = {
        rounding: Presets.Spring300,
        sizeHeight: Presets.Spring100,
        sizeWidth: Presets.Spring100,
        sizes: [] as SurfaceMeasure[],
        surfaces: [] as SurfaceAnimation[],
    };

    public onPreAnimate(time: number, advance: number, state: IInputAnimation = emptyAnimation): IInputAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IInputAnimation): IInputAnimation {
        const children = (this.props.children as Surface[])
            .map((surface, idx) => ({ surface, idx, animation: this.state.surfaces[idx], size: this.state.sizes[idx] }))
            .sort((a, b) => a.animation.front.current - b.animation.front.current);

        const maxShape = children.reduce((s, { surface, animation }) => s + animation.shape.current, 0);
        const totalCircle = children.reduce((s, { surface, animation }) => s + (surface.props.type === 'circle' ? animation.shape.current : 0), 0);
        const totalRectangle = children.reduce((s, { surface, animation }) => s + (surface.props.type === 'rectangle' ? animation.shape.current : 0), 0);
        const maxSize = children.reduce((s, { surface, animation }) => s + animation.size.current, 0);
        const maxReserve = children.reduce((s, { surface, animation }) => s + animation.reserve.current, 0);

        let height = children.reduce((s, { surface, animation, size }) => s + ensureFinite(size.height * (surface.props.size / maxSize)), 0);
        let width = children.reduce((s, { surface, animation, size }) => s + ensureFinite(size.width * (surface.props.size / maxSize)), 0);
        let { rounding, sizeHeight, sizeWidth } = this.state;
        if (rounding.current > 0.1) {
            if (height >= width) { height = width; }
            if (height < width) { width = height; }
        }
        if (sizeHeight.target === 0 && sizeHeight.current === 0) { sizeHeight = sizeHeight.jump(height); }
        if (sizeWidth.target === 0 && sizeWidth.current === 0) { sizeWidth = sizeWidth.jump(width); }
        sizeHeight = sizeHeight.change(height).iterate(advance * 0.001);
        sizeWidth = sizeWidth.change(width).iterate(advance * 0.001);
        rounding = rounding.change(totalCircle / maxShape > 0.2 ? 1 : 0).iterate(advance * 0.001);

        const surfaces = smartUpdate(this.state.surfaces, (x) => x.iterate(advance * 0.001));
        if (this.state.rounding !== rounding
            || this.state.sizeHeight !== sizeHeight
            || this.state.sizeWidth !== sizeWidth
            || this.state.surfaces !== surfaces) {
            // Update state
            this.setState({ rounding, sizeHeight, sizeWidth, surfaces });
        }
        return state;
    }

    public render() {
        const surfaces = this.state.surfaces;
        const children = (this.props.children as Surface[])
            .map((surface, idx) => ({ surface, idx, animation: this.state.surfaces[idx], size: this.state.sizes[idx] }))
            .sort((a, b) => a.animation.front.current - b.animation.front.current);

        const maxCenter = children.reduce((state, { animation }) => state + animation.center.current, 0);
        const maxSize = children.reduce((state, { animation }) => state + animation.size.current, 0);
        const maxReserve = children.reduce((state, { animation }) => state + animation.reserve.current, 0);
        const maxFront = children.reduce((state, { animation }) => state + animation.front.current, 0);
        const maxOpacity = children.reduce((state, { animation }) => state + animation.opacity.current, 0);
        const maxShape = children.reduce((state, { animation }) => state + animation.shape.current, 0);
        const totalCircle = children.reduce((state, { surface, animation }, idx) => state + (surface.props.type === 'circle' ? animation.shape.current : 0), 0);
        const totalRectangle = children.reduce((state, { surface, animation }, idx) => state + (surface.props.type === 'rectangle' ? animation.shape.current : 0), 0);
        const offsetX = children.reduce((state, { surface, animation }, idx) => state + surface.props.center.x * animation.center.current, 0);
        const offsetY = children.reduce((state, { surface, animation }, idx) => state + surface.props.center.y * animation.center.current, 0);

        const reserveWidth = children.reduce((state, { animation, size }) => state + size.width * (animation.reserve.current / maxReserve), 0);
        const reserveHeight = children.reduce((state, { animation, size }) => state + size.height * (animation.reserve.current / maxReserve), 0);
        const spaceWidth = this.state.sizeWidth.current;
        const spaceHeight = this.state.sizeHeight.current;
        const rounding = this.state.rounding.current;

        const spaceOffsetX = (reserveWidth - spaceWidth) * offsetX;
        const spaceOffsetY = (reserveHeight - spaceHeight) * offsetY;

        // tslint:disable no-magic-numbers
        const circle = Math.sqrt(spaceWidth * spaceWidth + spaceWidth * spaceWidth);
        const borderRadius = spaceWidth * .5 * rounding;
        const circleSize = borderRadius + circle * (1 - rounding);

        const positioned =
            children.map(({ surface, idx, size: { width, height }, animation: { center, size, reserve, front, opacity, shape } }) => {
                const position = 'absolute';
                const top = 0;
                const left = 0;
                if (!opacity.current) { return null; }
                const visibility = opacity.current && front.current && size.current ? 'visible' : 'hidden';
                const offsetLeft = (reserveWidth - spaceWidth) * (surface.props.center.x - offsetX);
                const offsetTop = (reserveHeight - spaceHeight) * (surface.props.center.y - offsetY);
                const transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
                const clipPath = `ellipse(${circleSize}px ${circleSize}px at ${spaceWidth * .5 + offsetLeft}px ${spaceHeight * .5 + offsetTop}px)`;
                return (
                    <span style={{ opacity: opacity.current, visibility, position, top, left, transform, clipPath, WebkitClipPath: clipPath }}>
                        <Surface
                            key={`${idx}`}
                            surfaceKey={`${idx}`}
                            center={surface.props.center}
                            focus={surface.props.focus}
                            size={surface.props.size}
                            reserve={surface.props.reserve}
                            front={surface.props.front}
                            opacity={surface.props.opacity}
                            shape={surface.props.shape}
                            type={surface.props.type}
                            onSize={this.onSize}>
                            {surface.props.children}
                        </Surface>
                    </span >
                );
            });
        return (
            <SpaceCore
                reserveWidth={reserveWidth}
                reserveHeight={reserveHeight}
                spaceWidth={spaceWidth}
                spaceHeight={spaceHeight}
                borderRadius={borderRadius}
                rounding={circleSize}
                offsetX={offsetX}
                offsetY={offsetY}
                surfaces={
                    children.map(({ surface, idx, size: { width, height }, animation: { center, size, reserve, front, opacity, shape } }) => ({
                        surface, key: `${idx}`, width, height, center: center.current, size: size.current, reserve: reserve.current, front: front.current, opacity: opacity.current, shape: shape.current, circleSize, onSize: this.onSize
                    }))
                } />
        );
    }

    public componentWillMount() {
        this.onPropsChanging(this.props as any);
    }

    public componentWillReceiveProps(nextProps: { children: React.ReactNode } & ISpaceProps) {
        this.onPropsChanging(nextProps as any);
    }

    protected onPropsChanging({ children }: { children: Surface[] }) {
        // Allocate Surfaces
        let surfaces = this.state.surfaces;
        while (children.length > surfaces.length) {
            const { focus, size, reserve, front, opacity, shape } = children[surfaces.length].props;
            surfaces = [...surfaces, new SurfaceAnimation(
                Presets.Spring100.jump(focus),
                Presets.Spring100.jump(size),
                Presets.Spring100.jump(reserve),
                Presets.Spring100.jump(front),
                Presets.Spring100.jump(opacity),
                Presets.Spring100.jump(shape),
            )];
        }
        surfaces = smartUpdate(surfaces, (surface, idx) => {
            const { focus, size, reserve, front, opacity, shape } = children[idx].props;
            return surface.change(focus, size, reserve, front, opacity, shape);
        });
        // Allocate Sizes
        let sizes = this.state.sizes;
        while (children.length > sizes.length) { sizes = [...sizes, new SurfaceMeasure(0, 0)]; }
        if (surfaces !== this.state.surfaces || sizes !== this.state.sizes) {
            // Update state
            this.setState({ sizes, surfaces });
        }
    }

    private onSize = (size: ISurfaceSize) => {
        const sizes = smartUpdate(this.state.sizes, (surface, idx) => `${idx}` !== size.surfaceKey ? surface : surface.change(size.x, size.y));
        if (sizes !== this.state.sizes) {
            // Update state
            this.setState({ sizes }, () => GetAnimationRoot(this).iterate());
        }
    }
}
export default Space;
