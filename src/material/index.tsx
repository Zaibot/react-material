import React from 'react';
import Animated from '../animated';
import Ripple from './ripple';
import cx from './style.less';

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

export interface IMaterialProps extends React.HTMLProps<HTMLDivElement> {
    divRef?: (el: HTMLDivElement) => void;
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

let magicNumber = 0;
const materials: Material[] = [];
const queued: any = 0;
function registerRipple(material: Material) {
    materials.push(material);
    // if (!queued && materials.length === 1) {
    //     queued = window.requestAnimationFrame(updateRipple);
    // }
}

const releaseMaterials = () => {
    for (const material of materials) {
        material._pressed = false;
    }
    // if (!queued) {
    //     queued = window.requestAnimationFrame(updateRipple);
    // }
};

document.addEventListener(`mouseup`, releaseMaterials);
document.addEventListener(`touchend`, releaseMaterials);

const rippleTime = 800; // about 800ms
const rippleFrames = 45;
const rippleFadeMultiplier = .5;
const rippleOpacity = 0.16;

@Animated
export default class Material extends React.Component<IMaterialProps, any> {
    public _ripples: React.ReactChild[] = [];
    public _panel: HTMLDivElement;
    public _pressed: boolean;

    public onPreAnimate(time: number, advance: number, state: ClientRect): ClientRect {
        if (!this._panel) { return state; }
        return this._panel.getBoundingClientRect();
    }

    public onAnimate(time: number, advance: number, state: ClientRect): ClientRect {
        if (!state) { return state; }
        if (!this._ripples.length) { return state; }
        const { width, height } = state;
        // tslint:disable-next-line
        const max = Math.sqrt(width * width + height * height) * Math.PI;
        const rippleIncrement = advance * max / rippleTime;
        const rippleEnd = max;
        const rippleFade = max * rippleFadeMultiplier;
        const rippleFadeRange = rippleEnd - rippleFade;
        this._ripples = this._ripples
            .filter((r: any) => r.props.z < rippleEnd)
            .map((r: any, idx, arr) => (
                <Ripple
                    key={r.key}
                    className={r.props.className}
                    color={r.props.color}
                    x={r.props.x}
                    y={r.props.y}
                    z={r.props.z + (r.props.z < rippleFade ? rippleIncrement : (idx === arr.length - 1 && this._pressed ? 0 : rippleIncrement))}
                    opacity={(r.props.z < rippleFade
                        ? 1
                        : r.props.z > rippleEnd
                            ? 0
                            : ((rippleFadeRange - (r.props.z - rippleFade)) / rippleFadeRange)) * rippleOpacity} /> as any
            ));
        this.setState({});
        return state;
    }

    public render() {
        // tslint:disable
        const {
            ripple, rippleClassName, elevation,
            onMouseDown, onMouseUp, style,
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
        // tslint:enable
        return (
            <div
                className={css}
                onMouseDown={onMouseDown || ripple ? this.onMouseDown : null}
                onMouseUp={onMouseUp || ripple ? this.onMouseUp : null}
                ref={this.setRef}
                style={style}
                {...divAttributes}>
                {children}
                {this._ripples}
            </div>
        );
    }

    private setRef = (e: HTMLDivElement) => {
        this._panel = e;
        if (this.props.divRef) { this.props.divRef(e); }
    }
    private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        this._pressed = true;

        const { rippleClassName } = this.props;
        const ripple = (
            <Ripple
                key={++magicNumber}
                className={rippleClassName}
                color={this.props.rippleColor}
                x={(e.nativeEvent as any).offsetX}
                y={(e.nativeEvent as any).offsetY}
                z={0}
                opacity={1} />
        );
        this._ripples.push(ripple);
        if (this._ripples.length === 1) {
            registerRipple(this);
        }
        const { onMouseDown } = this.props;
        if (onMouseDown) {
            onMouseDown(e);
        }
    }
    private onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        this._pressed = false;

        const { onMouseUp } = this.props;
        if (onMouseUp) {
            onMouseUp(e);
        }
    }
}
