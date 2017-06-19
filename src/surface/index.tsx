import React from 'react';
import Content from '../content';
import Material from '../material';

export interface ISurfaceSize { surfaceKey: string; x: number; y: number; }
export type SurfaceSizeCallback = (dimensions: ISurfaceSize) => void;

export type Shape = 'circle' | 'rectangle';
export interface ISurfaceProps {
    center: { x: number; y: number; };
    surfaceKey?: string;
    focus: number;
    size: number;
    reserve: number;
    front: number;
    opacity: number;
    shape: number;
    type: Shape;
    onSize?: SurfaceSizeCallback;
}
class Surface extends React.Component<ISurfaceProps, {}> {
    public render() {
        return (<Content onSize={this.onSize}>{this.props.children}</Content>);
    }

    public shouldComponentUpdate() {
      return false;
    }

    private onSize = ({ x, y }: { x: number, y: number }) => {
        const { onSize, surfaceKey } = this.props;
        // console.log(`${surfaceKey} ${x}x${y}`)
        onSize({ surfaceKey, x, y });
    }
}
export default Surface;
