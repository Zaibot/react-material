import React from 'react';
import Animated from '../animated';
import Turn, { EngineContext, Spring } from '../animation';
import Ripple from './ripple';
import cx from './style.less';

// tslint:disable no-magic-numbers
// tslint:disable-next-line
export type Elevation = 1 | 2 | 3 | 4 | 6 | 8 | 9 | 12 | 16 | 24;

const elevationToCss = (el: Elevation) => {
    // tslint:disable
    if (el >= 24) { return 'dialog'; }
    if (el >= 16) { return 'drawer'; }
    if (el >= 12) { return 'floating'; }
    if (el >= 9) { return 'submenu'; }
    if (el >= 8) { return 'menu'; }
    if (el >= 6) { return 'snackbar'; }
    if (el >= 4) { return 'appbar'; }
    if (el >= 3) { return 'indicator'; }
    if (el >= 2) { return 'card'; }
    if (el >= 1) { return 'switch'; }
    return '';
    // tslint:enable
};

export class RippleItem {
    public constructor(public x: number, public y: number, public z: Spring) {
    }
}

export interface IMaterialProps extends React.HTMLProps<HTMLDivElement> {
    divRef?: (el: HTMLDivElement) => void;
    base?: JSX.Element;
    ambient?: boolean;
    aswitch?: boolean;
    card?: boolean;
    indicator?: boolean;
    appbar?: boolean;
    snackbar?: boolean;
    menu?: boolean;
    submenu?: boolean;
    floating?: boolean;
    drawer?: boolean;
    dialog?: boolean;
    color?: string;
    inline?: boolean;
    slim?: boolean;
    round?: boolean;
    rounded?: boolean;
    ripple?: boolean;
    rippleColor?: string;
    className?: string;
    rippleClassName?: string;
    elevation?: Elevation;
}
export interface IMaterialState {
    width: number;
    height: number;
    pressed: boolean;
    ripples: RippleItem[];
}

const materials: Material[] = [];
const queued: any = 0;
function registerRipple(material: Material) {
    const idx = materials.indexOf(material);
    if (idx === -1) {
        materials.push(material);
    }
}
function unregisterRipple(material: Material) {
    const idx = materials.indexOf(material);
    if (idx > -1) {
        materials.splice(idx, 1);
    }
}

const releaseMaterials = () => {
    const pressed = false;
    for (const material of materials) {
        if (material.state.pressed !== pressed) {
            material.setState({ pressed });
        }
    }
};

document.addEventListener(`mouseup`, releaseMaterials);
document.addEventListener(`touchend`, releaseMaterials);

const constrain = (val: number, min: number, max: number) => val < min ? min : val > max ? max : val;
const rippleTime = 800; // about 800ms
const rippleFrames = 45;
const rippleFadeMultiplier = .66;
const rippleOpacity = 0.36;

export interface IMaterialAnimation {
    width: number;
    height: number;
    last: number;
    measured: number;
}
const emptyAnimation: IMaterialAnimation = {
    width: 0,
    height: 0,
    last: 0,
    measured: 0,
};

@Animated
export default class Material extends React.Component<IMaterialProps, IMaterialState> {
    public state: IMaterialState = {
        width: 0,
        height: 0,
        pressed: false,
        ripples: [],
    };
    public _panel: HTMLDivElement;

    public onPreAnimate(time: number, advance: number, state: IMaterialAnimation = emptyAnimation): IMaterialAnimation {
        if (!this._panel) { return state; }
        if (time < state.measured + 100) { return state; }
        const { width, height } = this._panel.getBoundingClientRect();
        const { last } = state;
        const measured = time;
        return { width, height, last, measured };
    }

    public onAnimate(time: number, advance: number, state: IMaterialAnimation): IMaterialAnimation {
        const { width, height, measured } = state;
        const { pressed } = this.state;
        let ripples = this.state.ripples;
        if (!this.state.ripples.length) {
            // short circuit
            if (width !== this.state.width || height !== this.state.height) {
                this.setState({ width, height });
            }
            return state;
        }
        ripples = ripples.map((x) => new RippleItem(x.x, x.y, x.z.iterate(advance * 0.001)));
        ripples = pressed ? ripples : ripples.filter((r) => r.z.velocity > 0.1);
        if (ripples.length === 0) { unregisterRipple(this); }
        this.setState({ width, height, ripples });
        return { width, height, last: time, measured };
    }

    public render() {
        // tslint:disable
        const {
            base,
            ripple, rippleClassName, elevation,
            onClick, onMouseDown, onMouseUp, style,
            className, color, rippleColor,
            ambient, inline, round, rounded, slim,
            aswitch, card, indicator, appbar, snackbar, menu, submenu, floating, drawer, dialog, children,
            divRef,
            ...divAttributes,
          } = this.props;
        const css = cx('component', className, elevationToCss(elevation), {
            ambient, key: !ambient,
            inline, round, rounded, slim,
            aswitch, card, indicator, appbar, snackbar, menu, submenu, floating, drawer, dialog,
        });
        const ripples = this.state.ripples.map((r, idx, arr) => (
            <Ripple
                key={idx}
                className={this.props.rippleClassName}
                color={null}
                x={r.x}
                y={r.y}
                z={r.z.current}
                opacity={constrain(r.z.velocity * 0.1, 0, 1) * Math.sqrt(4 - (r.z.current * 4 / r.z.target)) * .5 * rippleFadeMultiplier} /> as any
        ))
        // tslint:enable
        return React.cloneElement(base || <div />, {
            className: css,
            onClick: onClick || ripple ? this.onClick : null,
            onMouseDown: onMouseDown || ripple ? this.onMouseDown : null,
            onMouseUp: onMouseUp || ripple ? this.onMouseUp : null,
            ref: this.setRef,
            style,
            ...divAttributes,
        }, [children, ...ripples]);
    }

    protected componentWillUnmount() {
        unregisterRipple(this);
    }

    private setRef = (e: HTMLDivElement) => {
        this._panel = e;
        if (this.props.divRef) { this.props.divRef(e); }
    }
    private centerRipple() {
        if (this.state.pressed) { return; }
        const { rippleClassName } = this.props;
        const { width, height } = this.state;
        const offsetX = width * .5;
        const offsetY = height * .5;
        const max = this.calcRippleMax(offsetX, offsetY);
        let { ripples } = this.state;
        const ripple = new RippleItem(offsetX, offsetY, Spring.generic(0, max, 0, 100));
        ripples = [...ripples, ripple];
        if (ripples.length === 1) { registerRipple(this); }
        this.setState({ ripples });
    }
    private onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // this.centerRipple();
        const { onClick } = this.props;
        if (onClick) { onClick(e); }
    }
    private calcRippleMax(x: number, y: number) {
        const { width, height } = this.state;
        const leftWidth = constrain(x, 0, width);
        const rightWidth = constrain(width - x, 0, width);
        const topHeight = constrain(y, 0, height);
        const bottomHeight = constrain(height - y, 0, height);
        const maxWidth = Math.max(leftWidth, rightWidth);
        const maxHeight = Math.max(topHeight, bottomHeight);
        const diagonal = Math.sqrt(maxWidth * maxWidth + maxHeight * maxHeight);
        return diagonal;
    }
    private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const { rippleClassName } = this.props;
        const { offsetX, offsetY } = e.nativeEvent as { offsetX: number, offsetY: number };
        let { ripples } = this.state;
        const max = this.calcRippleMax(offsetX, offsetY);
        const ripple = new RippleItem(offsetX, offsetY, Spring.generic(max * 0.1, max, 0, 150));
        ripples = [...ripples, ripple];
        if (ripples.length === 1) { registerRipple(this); }
        const pressed = true;
        this.setState({ pressed, ripples });
        const { onMouseDown } = this.props;
        if (onMouseDown) { onMouseDown(e); }
    }
    private onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        const pressed = false;
        this.setState({ pressed });
        const { onMouseUp } = this.props;
        if (onMouseUp) { onMouseUp(e); }
    }
}
