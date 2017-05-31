import React from 'react';
import Animated from '../animated';
import Material from '../material';
import cx from './style.less';

const staticInterval = 500;
const dynamicInterval = 100;

export type SizeCallback = (dimensions: { x: number; y: number; }) => void;
export type ContentHint = 'static' | 'dynamic';
export interface IContentProps {
    onSize?: SizeCallback;
    hint: ContentHint;
}
export interface IContentState {
  // nothing
}
export interface IContentAnimation {
    lastTime: number;
    height: number;
    width: number;
}

@Animated
export default class Content extends React.Component<IContentProps, IContentState> {
    public state = {
        height: 0,
        width: 0,
    };
    private _div: HTMLDivElement;

    public onPreAnimate(time: number, advance: number, state: IContentAnimation = { lastTime: 0, width: 0, height: 0 }): IContentAnimation {
        const interval = this.props.hint !== 'dynamic' ? staticInterval : dynamicInterval;
        if (time < state.lastTime + interval) { return state; }
        const storeW = this._div.style.width;
        const storeH = this._div.style.height;
        const lastTime = time;
        // Prep
        this._div.style.width = null;
        this._div.style.height = null;
        this._div.style.position = 'fixed';
        // Measure
        const { scrollWidth, scrollHeight } = this._div;
        // Store
        const width = scrollWidth;
        const height = scrollHeight;
        state = { width, height, lastTime };
        // Restore
        this._div.style.position = null;
        this._div.style.width = storeW;
        this._div.style.height = storeH;
        return state;
    }

    public onAnimate(time: number, advance: number, state: IContentAnimation): IContentAnimation {
        this._div.style.width = `${state.width}px`;
        this._div.style.height = `${state.height}px`;
        return state;
    }

    public render() {
        const { children } = this.props;
        return (
            <div className={cx(`component`)} ref={this._store}>
                {children}
            </div>
        );
    }

    private _store = (div: HTMLDivElement) => {
        this._div = div;
    }
}
