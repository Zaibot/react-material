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

@Animated
export default class Content extends React.Component<IContentProps, IContentState> {
    public state = {
        height: 0,
        width: 0,
    };
    private _div: HTMLDivElement;

    public onPreAnimate(time: number, advance: number, state: IContentAnimation = { lastTime: 0, width: 0, height: 0, applied: false }): IContentAnimation {
        if (!this._div) { return state; }
        const interval = this.props.hint !== 'dynamic' ? staticInterval : dynamicInterval;
        if (time < state.lastTime + interval) { return state; }
        const storeWidth = this._div.style.width;
        const storeHeight = this._div.style.height;
        const lastTime = time;
        // Prep
        this._div.style.position = 'absolute';
        this._div.style.width = null;
        this._div.style.height = null;
        // Measure
        let { width, height } = this._div.getBoundingClientRect();
        if (width > 10000) { width = 10000; }
        if (height > 10000) { height = 10000; }
        // Store
        const changed = width !== state.width || height !== state.height;
        if (changed) {
            state = { width, height, lastTime, applied: false };
        } else {
            const { applied } = state;
            state = { width, height, lastTime, applied };
        }
        // Restore
        this._div.style.position = null;
        this._div.style.width = storeWidth;
        this._div.style.height = storeHeight;
        if (changed) {
            if (this.props.onSize) {
                const x = width;
                const y = height;
                // console.log(this._div, x, y);
                // console.log(this._div, width, height);
                this.props.onSize({ x, y });
            }
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
        const { children, opacity } = this.props;
        const { width, height } = this.state;
        return (
            <div className={cx(`component`)} style={{ opacity }} ref={this._store}>
                {children}
            </div>
        );
    }

    protected shouldComponentUpdate(nextProps: IContentProps) {
        return this.props.opacity !== nextProps.opacity
            || this.props.hint !== nextProps.hint;
    }

    private _store = (div: HTMLDivElement) => {
        this._div = div;
    }
}
