import React from 'react';
import Animated from '../animated';
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
    sizes: SurfaceAnimation[];
}

export class SurfaceAnimation {
    public constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly opacity: Spring,
    ) { }
}
export interface IInputAnimation {
    surfaces: SurfaceAnimation[];
}
const emptyAnimation: IInputAnimation = {
    surfaces: [],
};

@Animated
export default class Space extends React.Component<ISpaceProps, ISpaceState> {
    public state = {
        sizeHeight: Spring.generic(0, 0, 0, 150),
        sizeWidth: Spring.generic(0, 0, 0, 150),
        sizes: [] as SurfaceAnimation[],
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

        sizeHeight = sizeHeight.change(height).iterate(advance * 0.001);
        sizeWidth = sizeWidth.change(width).iterate(advance * 0.001);
        const surfaces = this.state.surfaces.map((x) => {
            return new SurfaceAnimation(
                x.width,
                x.height,
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

        const s =
            children.map(({ surface, idx }) => {
                // const opacity = surface.props.opacity / maxOpacity;
                const position = 'absolute';
                const top = 0;
                const left = 0;
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
                // return (
                //     <span style={{ opacity: opacity.current, position, top, left }}>
                //         <Surface
                //             key={`${idx}`}
                //             surfaceKey={`${idx}`}
                //             focus={surface.props.focus}
                //             center={surface.props.center}
                //             size={surface.props.size}
                //             front={surface.props.front}
                //             opacity={surface.props.opacity}
                //             shape={surface.props.shape}
                //             type={surface.props.type}
                //             onSize={this.onSize}>
                //             {surface.props.children}
                //         </Surface>
                //     </span>
                // );
            });

        return (
            <Material style={{ width, height }}>
                {s}
            </Material>
        );
    }

    protected componentWillMount() {
        this.asdasd(this.props as any);
        // let surfaces = this.state.surfaces;
        // const children = this.props.children as Surface[];
        // while (children.length > surfaces.length) {
        //     surfaces = surfaces.concat([new SurfaceAnimation(0, 0, Spring.generic(0, 0, 0, 100))]);
        // }
        // if (surfaces !== this.state.surfaces) {
        //     this.setState({ surfaces });
        // }
    }

    protected componentWillReceiveProps(nextProps: { children: React.ReactNode } & ISpaceProps) {
        this.asdasd(nextProps);
    }
    protected asdasd({ children }: { children: React.ReactNode } & ISpaceProps) {
        let surfaces = this.state.surfaces;
        while ((children as any[]).length > surfaces.length) {
            surfaces = surfaces.concat([new SurfaceAnimation(0, 0, Spring.generic(0, 0, 0, 100))]);
        }
        surfaces = surfaces.map((surface, idx) => {
            return new SurfaceAnimation(
                surface.width,
                surface.height,
                surface.opacity.change((children as Surface[])[idx].props.opacity)
            );
        });
        let sizes = this.state.sizes;
        while ((children as any[]).length > sizes.length) {
            sizes = sizes.concat([new SurfaceAnimation(0, 0, Spring.generic(0, 0, 0, 100))]);
        }
        sizes = sizes.map((surface, idx) => {
            return new SurfaceAnimation(
                surface.width,
                surface.height,
                surface.opacity.change((children as Surface[])[idx].props.opacity)
            );
        });

        if (surfaces !== this.state.surfaces || sizes !== this.state.sizes) {
            this.setState({ sizes, surfaces });
        }
    }

    private onSize = (size: ISurfaceSize) => {
        const sizes = this.state.sizes.map((surface, idx) => {
            if (`${idx}` !== size.surfaceKey) { return surface; }
            const r = new SurfaceAnimation(size.x, size.y, Spring.generic(0, 0, 0, 100));
            return r;
        });
        this.setState({ sizes });
    }
}
