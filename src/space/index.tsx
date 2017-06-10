import React from 'react';
import Animated from '../animated';
import { GetAnimationRoot } from '../animationroot';
import { Spring } from '../animation';
import Material from '../material';
import Surface, { ISurfaceSize } from '../surface';

// tslint:disable max-classes-per-file

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
        public readonly opacity: Spring,
    ) { }
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
        const sizes = this.state.sizes;

        let { sizeHeight, sizeWidth } = this.state;
        const children = (this.props.children as Surface[]);

        const d = (n: number) => isFinite(n) ? n : 0;
        const height = children.reduce((s, surface, idx) => s + d(sizes[idx].height / surface.props.size), 0);
        const width = children.reduce((s, surface, idx) => s + d(sizes[idx].width / surface.props.size), 0);

        if (sizeHeight.target === 0 && sizeHeight.current === 0) {
            // console.log(`target&current === 0 height`, height, children.map(x=> x.props.size), this.state.sizes.map(x => x.height));
            sizeHeight = sizeHeight.jump(height);
        } else {
            sizeHeight = sizeHeight.change(height).iterate(advance * 0.001);
        }
        if (sizeWidth.target === 0 && sizeWidth.current === 0) {
            // console.log(`target&current === 0 width`, width, children.map(x=> x.props.size), this.state.sizes.map(x => x.width));
            sizeWidth = sizeWidth.jump(width);
        } else {
            sizeWidth = sizeWidth.change(width).iterate(advance * 0.001);
        }
        const surfaces = this.state.surfaces.map((x) => {
            return new SurfaceAnimation(
                x.opacity.iterate(advance * 0.001),
            );
        });
        this.setState({ sizeHeight, sizeWidth, surfaces });
        return state;
    }

    public render() {
        const surfaces = this.state.surfaces;
        const sizes = this.state.sizes;
        const children = (this.props.children as Surface[]).map((surface, idx) => ({ surface, idx })).sort((a, b) => a.surface.props.front - b.surface.props.front);

        const maxCenter = children.reduce((state, { surface }) => state + surface.props.center, 0);
        const maxSize = children.reduce((state, { surface }) => state + surface.props.size, 0);
        const maxFront = children.reduce((state, { surface }) => state + surface.props.front, 0);
        const maxOpacity = children.reduce((state, { surface }) => state + surface.props.opacity, 0);
        const maxShape = children.reduce((state, { surface }) => state + surface.props.shape, 0);

        const width = this.state.sizeWidth.current;
        const height = this.state.sizeHeight.current;
        const clipPath = `polygon(${0}px ${0}px, ${width}px 0, ${width}px ${height}px, 0px ${height}px, 0px 0px)`;

        const positioned =
            children.map(({ surface, idx }) => {
                const st = this.state.sizes[idx];
                const position = 'absolute';
                const top = (height - st.height) * .5;
                const left = (width - st.width) * .5;
                const { opacity } = this.state.surfaces[idx];
                if (!opacity.current) { return null; }
                return (
                    <span style={{ opacity: opacity.current, position, top, left, clipPath, WebkitClipPath: clipPath }}>
                        <Surface
                            key={`${idx}`}
                            surfaceKey={`${idx}`}
                            focus={surface.props.focus}
                            center={surface.props.center}
                            size={surface.props.size}
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

        return (
            <Material style={{ width, height }}>
                {positioned}
            </Material>
        );
    }

    public componentWillMount() {
        this.onPropsChanging(this.props as any);
    }

    public componentWillReceiveProps(nextProps: { children: React.ReactNode } & ISpaceProps) {
        this.onPropsChanging(nextProps as any);
    }

    protected onPropsChanging({ children }: { children: Surface[] }) {
        let surfaces = this.state.surfaces;
        while (children.length > surfaces.length) { surfaces = [...surfaces, new SurfaceAnimation(Spring.generic(0, 0, 0, 100))]; }
        surfaces = surfaces.map((surface, idx) => new SurfaceAnimation(surface.opacity.change(children[idx].props.opacity)));
        let sizes = this.state.sizes;
        while (children.length > sizes.length) { sizes = [...sizes, new SurfaceMeasure(0, 0)]; }
        sizes = sizes.map((surface, idx) => new SurfaceMeasure(surface.width, surface.height));
        if (surfaces !== this.state.surfaces || sizes !== this.state.sizes) {
            this.setState({ sizes, surfaces });
        }
    }

    private onSize = (size: ISurfaceSize) => {
        const sizes = this.state.sizes.map(
            (surface, idx) => `${idx}` !== size.surfaceKey
                ? surface
                : new SurfaceMeasure(size.x, size.y),
        );
        this.setState({ sizes }, () => GetAnimationRoot(this).iterate());
    }
}
export default Space;
