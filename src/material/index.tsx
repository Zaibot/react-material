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
    pressed: boolean;
    ripples: JSX.Element[];
}

let magicNumber = 0;
const materials: Material[] = [];
const queued: any = 0;
function registerRipple(material: Material) {
    materials.push(material);
}

const releaseMaterials = () => {
    const pressed = false;
    for (const material of materials) {
        material.setState({ pressed });
    }
};

document.addEventListener(`mouseup`, releaseMaterials);
document.addEventListener(`touchend`, releaseMaterials);

const rippleTime = 800; // about 800ms
const rippleFrames = 45;
const rippleFadeMultiplier = .5;
const rippleOpacity = 0.36;

@Animated
export default class Material extends React.Component<IMaterialProps, IMaterialState> {
    public state: IMaterialState = {
        pressed: false,
        ripples: [],
    };
    public _panel: HTMLDivElement;

    public onPreAnimate(time: number, advance: number, state: ClientRect): ClientRect {
        if (!this._panel) { return state; }
        return this._panel.getBoundingClientRect();
    }

    public onAnimate(time: number, advance: number, state: ClientRect): ClientRect {
        let { ripples } = this.state;
        if (!state) { return state; }
        if (!ripples.length) { return state; }
        const { pressed } = this.state;
        const { width, height } = state;
        // tslint:disable-next-line
        const max = Math.sqrt(width * width + height * height) * Math.PI;
        const rippleIncrement = advance * max / rippleTime;
        const rippleEnd = max;
        const rippleFade = max * rippleFadeMultiplier;
        const rippleFadeRange = rippleEnd - rippleFade;
        ripples = this.state.ripples
            .filter((r: any) => r.props.z < rippleEnd)
            .map((r: any, idx, arr) => (
                <Ripple
                    key={r.key}
                    className={r.props.className}
                    color={r.props.color}
                    x={r.props.x}
                    y={r.props.y}
                    z={r.props.z + (r.props.z < rippleFade ? rippleIncrement : (idx === arr.length - 1 && pressed ? 0 : rippleIncrement))}
                    opacity={(r.props.z < rippleFade
                        ? 1
                        : r.props.z > rippleEnd
                            ? 0
                            : ((rippleFadeRange - (r.props.z - rippleFade)) / rippleFadeRange)) * rippleOpacity} /> as any
            ));
        this.setState({ ripples });
        return state;
    }

    public render() {
        // tslint:disable
        const {
            base,
            ripple, rippleClassName, elevation,
            onMouseDown, onMouseUp, style,
            className, color, rippleColor,
            ambient, inline, round, rounded, slim,
            aswitch, card, indicator, appbar, snackbar, menu, submenu, floating, drawer, dialog, children,
            divRef,
            ...divAttributes,
          } = this.props;
        const {
          ripples
        } = this.state;
        const css = cx('component', className, elevationToCss(elevation), {
            ambient, key: !ambient,
            inline, round, rounded, slim,
            aswitch, card, indicator, appbar, snackbar, menu, submenu, floating, drawer, dialog,
        });
        // tslint:enable
        return React.cloneElement(base || <div />, {
            className: css,
            onMouseDown: onMouseDown || ripple ? this.onMouseDown : null,
            onMouseUp: onMouseUp || ripple ? this.onMouseUp : null,
            ref: this.setRef,
            style,
            ...divAttributes,
        }, [children, ...ripples]);
    }

    private shouldComponentUpdate(nextProps: IMaterialProps, nextState: IMaterialState) {
        return true;
        // return nextState.pressed !== this.state.pressed
        //     || nextState.ripples !== this.state.ripples
        //     || nextProps.ambient !== this.props.ambient
        //     || nextProps.aswitch !== this.props.aswitch
        //     || nextProps.card !== this.props.card
        //     || nextProps.indicator !== this.props.indicator
        //     || nextProps.appbar !== this.props.appbar
        //     || nextProps.snackbar !== this.props.snackbar
        //     || nextProps.menu !== this.props.menu
        //     || nextProps.submenu !== this.props.submenu
        //     || nextProps.floating !== this.props.floating
        //     || nextProps.drawer !== this.props.drawer
        //     || nextProps.dialog !== this.props.dialog
        //     || nextProps.color !== this.props.color
        //     || nextProps.inline !== this.props.inline
        //     || nextProps.slim !== this.props.slim
        //     || nextProps.round !== this.props.round
        //     || nextProps.rounded !== this.props.rounded
        //     || nextProps.ripple !== this.props.ripple
        //     || nextProps.rippleColor !== this.props.rippleColor
        //     || nextProps.className !== this.props.className
        //     || nextProps.rippleClassName !== this.props.rippleClassName
        //     || nextProps.elevation !== this.props.elevation;
    }

    private setRef = (e: HTMLDivElement) => {
        this._panel = e;
        if (this.props.divRef) { this.props.divRef(e); }
    }
    private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const { rippleClassName } = this.props;
        let { ripples } = this.state;
        const pressed = true;
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
        ripples = [...ripples, ripple];
        if (ripples.length === 1) {
            registerRipple(this);
        }
        this.setState({ pressed, ripples });
        const { onMouseDown } = this.props;
        if (onMouseDown) {
            onMouseDown(e);
        }
    }
    private onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        const pressed = false;
        this.setState({ pressed });
        const { onMouseUp } = this.props;
        if (onMouseUp) {
            onMouseUp(e);
        }
    }
}
