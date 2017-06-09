import React from 'react';
import Content from '../content';
import Material from '../material';

export interface ISurfaceSize { surfaceKey: string; x: number; y: number; }
export type SurfaceSizeCallback = (dimensions: ISurfaceSize) => void;

export type Shape = 'circle' | 'rectangle';
export interface ISurfaceProps {
    focus: { x: number; y: number; };
    surfaceKey?: string;
    center: number;
    size: number;
    front: number;
    opacity: number;
    shape: number;
    type: Shape;
    onSize?: SurfaceSizeCallback;
}
export interface ISurfaceState {
}
export default class Surface extends React.Component<ISurfaceProps, ISurfaceState> {
    public state = {};
    public render() {
        const { onSize, surfaceKey } = this.props as any;
        // const child = React.cloneElement(this.props.children as any, {
        //     ...(this.props.children as any).props,
        //     onSize: ({ x, y }: { x: number, y: number }) => {
        //       onSize({ surfaceKey, x, y });
        //     }
        // });
        return (
          <Content onSize={({ x, y }: { x: number, y: number }) =>  onSize({ surfaceKey, x, y })}>{this.props.children}</Content>
        );
    }
}
