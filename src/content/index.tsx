import React from 'react';
import Animated from '../animated';
import Material from '../material';
import cx from './style.less';

const staticInterval = 500;
const dynamicInterval = 100;

export interface ISize { x: number; y: number; }
export type SizeCallback = (dimensions: ISize) => void;
export type ContentHint = 'static' | 'dynamic';
export interface IContentProps {
    // children?: React.ReactChild;
    size?: ISize;
    opacity?: number;
    hint?: ContentHint;
    onSize?: SizeCallback;
}
export interface IContentState {
    // nothing
}
export interface IContentAnimation {
    lastTime: number;
    height: number;
    width: number;
    applied: boolean;
}

@Animated()
class Content extends React.Component<IContentProps, IContentState> {
    public state = {
        height: 0,
        width: 0,
    };
    private _div: HTMLDivElement;

    public onPreAnimate(time: number, advance: number, state: IContentAnimation = { lastTime: 0, width: 0, height: 0, applied: false }): IContentAnimation {
        if (!this._div) { return state; }
        const interval = this.props.hint !== 'dynamic' ? staticInterval : dynamicInterval;
        if (time < state.lastTime + interval) { return state; }
        const lastTime = time;
        const { width, height } = this.measure();
        // Store
        const changed = width !== state.width || height !== state.height;
        if (changed) {
            state = { width, height, lastTime, applied: false };
            this.onSize(width, height);
        } else {
            const { applied } = state;
            state = { width, height, lastTime, applied };
        }
        return state;
    }

    public onAnimate(time: number, advance: number, state: IContentAnimation): IContentAnimation {
        if (state.applied) { return state; }
        if (!this._div) { return state; }
        this._div.style.width = `${state.width}px`;
        this._div.style.height = `${state.height}px`;
        return { ...state, applied: true };
    }

    public render() {
        const { children, opacity, size } = this.props;
        const onDivRef = size ? null : this.onDivRef;
        const width = size ? size.x : null;
        const height = size ? size.y : null;
        return (
            <div className={cx(`component`)} style={{ opacity, width, height }} ref={onDivRef}>
                {children}
            </div>
        );
    }

    public componentDidMount() {
        const { width, height } = this.measure();
        this.onSize(width, height);
    }
    // public shouldComponentUpdate(nextProps: IContentProps) {
    //     return this.props.opacity !== nextProps.opacity
    //         || this.props.hint !== nextProps.hint;
    // }

    private onDivRef = (div: HTMLDivElement) => {
        this._div = div;
    }

    private onSize(x: number, y: number) {
        if (this.props.onSize) {
            this.props.onSize({ x, y });
        }
    }

    private measure() {
        if (this.props.size) { return { width: this.props.size.x, height: this.props.size.y }; }
        const storeWidth = this._div.style.width;
        const storeHeight = this._div.style.height;
        // Prep
        this._div.style.position = 'fixed';
        this._div.style.width = '';
        this._div.style.height = '';
        // Measure
        let { width, height } = this._div.getBoundingClientRect();
        if (width > 10000) { width = 10000; }
        if (height > 10000) { height = 10000; }
        // Restore
        this._div.style.position = '';
        this._div.style.width = storeWidth;
        this._div.style.height = storeHeight;
        return { width, height };
    }
}
export default Content;
