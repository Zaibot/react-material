import React from 'react';
import Animated from '../animated';
import Material from '../material';
import MaterialDesired from '../utils/measureDesired';
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
    height: number;
    width: number;
    applied: boolean;
}

function limitSize(size: { width: number, height: number }) {
    // tslint:disable
    if (size.width > 10000 || size.height > 10000) {
        return {
            width: Math.min(10000, size.width),
            height: Math.min(10000, size.height),
        };
    }
    // tslint:enable
    return size;
}

@Animated()
class Content extends React.Component<IContentProps, IContentState> {
    public state = {
        height: 0,
        width: 0,
    };
    private _measure = MaterialDesired.slow;

    public onPreAnimate(time: number, advance: number, state: IContentAnimation = { width: 0, height: 0, applied: false }): IContentAnimation {
        if (!this._measure.size) { return state; }
        const interval = this.props.hint !== 'dynamic' ? staticInterval : dynamicInterval;
        this._measure = this._measure.iterate(advance);
        const { width, height } = limitSize(this._measure.size);
        // Store
        const changed = width !== state.width || height !== state.height;
        if (changed) {
            const applied = false;
            state = { width, height, applied };
            this.onSize(width, height);
        } else {
            const { applied } = state;
            state = { width, height, applied };
        }
        return state;
    }

    public onAnimate(time: number, advance: number, state: IContentAnimation): IContentAnimation {
        if (state.applied) { return state; }
        if (!this._measure.size) { return state; }
        this._measure.element.style.width = `${state.width}px`;
        this._measure.element.style.height = `${state.height}px`;
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
        const { width, height } = this._measure.size;
        this.onSize(width, height);
    }

    private onDivRef = (div: HTMLDivElement) => {
        this._measure = this._measure.updateElement(div);
    }

    private onSize(x: number, y: number) {
        if (this.props.onSize) {
            this.props.onSize({ x, y });
        }
    }
}
export default Content;
