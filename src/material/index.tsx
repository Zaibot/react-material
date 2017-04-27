import React from 'react';
import Ripple from './ripple';
import cx from './style.less';

export type MaterialProps = {
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
} & React.HTMLProps<HTMLDivElement>;

let magicNumber = 0;
let materials: Material[] = [];
let queued: any = 0;
function registerRipple(material: Material) {
    materials.push(material);
    if (!queued && materials.length === 1) {
        queued = window.requestAnimationFrame(updateRipple);
    }
}
// const rippleIncrement = 8;
// const rippleIncrement = 6;
// const rippleEnd = 200;
// const rippleFade = 100;
const rippleFrames = 45;
const rippleFadeMultiplier = .5;
// const rippleOpacity = 0.12;
const rippleOpacity = 0.24;
// const rippleFadeRange = rippleEnd - rippleFade;
function updateRipple() {
    queued = 0;
    for (const m of materials) {
        const { width, height } = m._panel.getBoundingClientRect();
        // tslint:disable-next-line
        const max = Math.sqrt(width * width + height * height) * 2;
        const rippleIncrement = max / rippleFrames;
        const rippleEnd = max;
        const rippleFade = max * rippleFadeMultiplier;
        const rippleFadeRange = rippleEnd - rippleFade;
        m._ripples = m._ripples
            .filter((r: any) => r.props.z < rippleEnd)
            .map((r: any, idx, arr) => (
                <Ripple
                    key={r.key}
                    className={r.props.className}
                    color={r.props.color}
                    x={r.props.x}
                    y={r.props.y}
                    z={r.props.z + (r.props.z < rippleFade ? rippleIncrement : (idx === arr.length - 1 && m._pressed ? 0 : rippleIncrement))}
                    opacity={(r.props.z < rippleFade
                        ? 1
                        : r.props.z > rippleEnd
                            ? 0
                            : ((rippleFadeRange - (r.props.z - rippleFade)) / rippleFadeRange)) * rippleOpacity} /> as any
            ));
        m.forceUpdate();
    }
    materials = materials.filter((x) => x._ripples.length);

    if (!queued && materials.length) {
        queued = window.requestAnimationFrame(updateRipple);
    }
}

export type MaterialState = {
};

export default class Material extends React.Component<MaterialProps, MaterialState> {
    public _ripples: React.ReactChild[] = [];
    public _panel: HTMLDivElement;
    public _pressed: boolean;
    public state = {
    };

    public render() {
        // tslint:disable
        const {
            ripple,
            onMouseDown, onMouseUp, style,
            className, color, rippleColor,
            ambient, inline, round, rounded, slim,
            aswitch, card, indicator, appbar, snackbar, menu, submenu, floating, drawer, dialog, children,
            ...divAttributes,
          } = this.props;
        // tslint:enable
        const css = cx('component', className, {
            ambient, key: !ambient,
            inline, round, rounded, slim,
            aswitch, card, indicator, appbar, snackbar, menu, submenu, floating, drawer, dialog,
        });
        return (
            <div
                className={css}
                onMouseDown={onMouseDown || ripple ? this.onMouseDown : null}
                onMouseUp={onMouseUp || ripple ? this.onMouseUp : null}
                ref={this.setRef}
                style={{ backgroundColor: color, ...style }}
                {...divAttributes}>
                {children}
                {this._ripples}
            </div>
        );
    }

    private setRef = (e: HTMLDivElement) => {
        this._panel = e;
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
