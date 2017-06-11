import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import cx from './style.less';
import Animated from '../animated';
import { GetAnimationRoot } from '../animationroot';
import { Spring } from '../animation';
import Material from '../material';
import Surface, { ISurfaceSize } from '../surface';
import Focus from '../surface/focus';

// tslint:disable max-classes-per-file

const ensureFinite = (n: number) => isFinite(n) ? n : 0;

export interface ISpaceProps {

}
export interface ISpaceState {
    sizeHeight: Spring;
    sizeWidth: Spring;
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
}
export class SurfaceMeasure {
    public constructor(
        public readonly width: number,
        public readonly height: number,
    ) { }
}
export interface IInputAnimation {
    surfaces: SurfaceAnimation[];
}
const emptyAnimation: IInputAnimation = {
    surfaces: [],
};

function getMaterialStyle(width: number, height: number, offsetX: number, offsetY: number, borderRadius: number) {
    const overflow = 'hidden';
    const transform = `translate(${offsetX}px, ${offsetY}px)`;
    return { width, height, borderRadius, overflow, transform } as React.CSSProperties;
}

function smartUpdate<T>(array: T[], map: (item: T) => T) {
    let res: T[] = null;
    let i = 0;
    const ii = array.length;
    for (; i < ii; i++) {
        const n = map(array[i]);
        if (n !== array[i]) {
            res = array.slice(0);
            res[i] = n;
            break;
        }
    }
    if (!res) { return array; }
    for (; i < ii; i++) {
        res[i] = map(array[i]);
    }
    return res;
}

@Animated()
class Space extends React.Component<ISpaceProps, ISpaceState> {
    public state = {
        sizeHeight: Spring.generic(0, 0, 0, 150),
        sizeWidth: Spring.generic(0, 0, 0, 150),
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

        const maxShape = children.reduce((state, { surface, animation }) => state + animation.shape.current, 0);
        const totalCircle = children.reduce((state, { surface, animation }) => state + (surface.props.type === 'circle' ? animation.shape.current : 0), 0);
        const totalRectangle = children.reduce((state, { surface, animation }) => state + (surface.props.type === 'rectangle' ? animation.shape.current : 0), 0);
        const maxSize = children.reduce((state, { surface, animation }) => state + animation.size.current, 0);
        const maxReserve = children.reduce((state, { surface, animation }) => state + animation.reserve.current, 0);

        let height = children.reduce((s, { surface, animation, size }) => s + ensureFinite(size.height * (surface.props.size / maxSize)), 0);
        let width = children.reduce((s, { surface, animation, size }) => s + ensureFinite(size.width * (surface.props.size / maxSize)), 0);
        if (totalCircle / maxShape > 0.5) {
            if (height >= width) { height = width; }
            if (height < width) { width = height; }
        }

        let { sizeHeight, sizeWidth } = this.state;
        if (sizeHeight.target === 0 && sizeHeight.current === 0) { sizeHeight = sizeHeight.jump(height); }
        if (sizeWidth.target === 0 && sizeWidth.current === 0) { sizeWidth = sizeWidth.jump(width); }
        sizeHeight = sizeHeight.change(height).iterate(advance * 0.001);
        sizeWidth = sizeWidth.change(width).iterate(advance * 0.001);

        const surfaces = smartUpdate(this.state.surfaces, (x) => x.iterate(advance * 0.001));
        if (this.state.sizeHeight !== sizeHeight
            || this.state.sizeWidth !== sizeWidth
            || this.state.surfaces !== surfaces) {
            this.setState({ sizeHeight, sizeWidth, surfaces });
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
        const offsetX = children.reduce((state, { surface, animation }, idx) => state + surface.props.focus.x * animation.center.current, 0);
        const offsetY = children.reduce((state, { surface, animation }, idx) => state + surface.props.focus.y * animation.center.current, 0);

        const reserveWidth = children.reduce((state, { animation, size }) => state + size.width * (animation.reserve.current / maxReserve), 0);
        const reserveHeight = children.reduce((state, { animation, size }) => state + size.height * (animation.reserve.current / maxReserve), 0);
        const spaceWidth = this.state.sizeWidth.current;
        const spaceHeight = this.state.sizeHeight.current;

        const roundableRatio = (spaceWidth > spaceHeight) ? (spaceHeight / spaceWidth) : (spaceWidth / spaceHeight);
        const borderRadius = Math.max(spaceWidth, spaceHeight) * Math.pow(roundableRatio, 6) * totalCircle / maxShape;

        const spaceOffsetX = (reserveWidth - spaceWidth) * offsetX;
        const spaceOffsetY = (reserveHeight - spaceHeight) * offsetY;

        const positioned =
            children.map(({ surface, idx, size: { width, height }, animation }) => {
                const position = 'absolute';
                const top = 0;
                const left = 0;
                const { center, size, reserve, front, opacity, shape } = this.state.surfaces[idx];
                if (!opacity) { return null; }
                const visibility = opacity.current && front.current && size.current ? 'visible' : 'hidden';
                const offsetLeft = (reserveWidth - spaceWidth) * (surface.props.focus.x - offsetX);
                const offsetTop = (reserveHeight - spaceHeight) * (surface.props.focus.y - offsetY);
                const transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
                const clipPath = ``;//spaceWidth && spaceHeight ? `polygon(${0}px ${0}px, ${spaceWidth}px 0, ${spaceWidth}px ${spaceHeight}px, 0px ${spaceHeight}px, 0px 0px)` : ``;
                return (
                    <span style={{ opacity: opacity.current, visibility, position, top, left, clipPath, transform, WebkitClipPath: clipPath }}>
                        <Surface
                            key={`${idx}`}
                            surfaceKey={`${idx}`}
                            focus={surface.props.focus}
                            center={surface.props.center}
                            size={surface.props.size}
                            reserve={surface.props.reserve}
                            front={surface.props.front}
                            opacity={surface.props.opacity}
                            shape={surface.props.shape}
                            type={surface.props.type}
                            onSize={this.onSize}>
                            {surface.props.children}
                        </Surface>
                    </span>
                );
            });


        const style = {
            width: reserveWidth,
            height: reserveHeight,
        };
        return (
            <div className={cx(`component`)} style={style}>
                <Material
                    className={mdc(colors.bg.grey.n50, colors.text.black.darker)}
                    style={getMaterialStyle(spaceWidth, spaceHeight, spaceOffsetX, spaceOffsetY, borderRadius)}
                    floating>
                    {positioned}
                </Material>
            </div>
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
            const { center, size, reserve, front, opacity, shape } = children[surfaces.length].props;
            surfaces = [...surfaces, new SurfaceAnimation(
                Spring.generic(center, center, 0, 500),
                Spring.generic(size, size, 0, 500),
                Spring.generic(reserve, reserve, 0, 500),
                Spring.generic(front, front, 0, 100),
                Spring.generic(opacity, opacity, 0, 100),
                Spring.generic(shape, shape, 0, 100)
            )];
        }
        surfaces = surfaces.map((surface, idx) => {
            const { center, size, reserve, front, opacity, shape } = children[idx].props;
            return new SurfaceAnimation(
                surface.center.change(center),
                surface.size.change(size),
                surface.reserve.change(reserve),
                surface.front.change(front),
                surface.opacity.change(opacity),
                surface.shape.change(shape),
            );
        });
        // Allocate Sizes
        let sizes = this.state.sizes;
        while (children.length > sizes.length) { sizes = [...sizes, new SurfaceMeasure(0, 0)]; }
        if (surfaces !== this.state.surfaces || sizes !== this.state.sizes) {
            this.setState({ sizes, surfaces });
        }
    }

    private onSize = (size: ISurfaceSize) => {
        const sizes = this.state.sizes.map((surface, idx) => `${idx}` !== size.surfaceKey ? surface : new SurfaceMeasure(size.x, size.y));
        this.setState({ sizes }, () => GetAnimationRoot(this).iterate());
    }
}
export default Space;
