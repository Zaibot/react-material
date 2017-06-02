import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import Animated from '../animated';
import colors from '../colors';
import Content, { ISize } from '../content';
import Material from '../material';
import cx from './style.less';

const constrain = (val: number, min: number, max: number) => val < min ? min : val > max ? max : val;

export interface IMenuProps {
    disabled?: boolean;
    accent?: boolean;
    onClick?: any;
    open: boolean;
}
export interface IMenuState {
    currentw: number;
    currenth: number;
    height: number;
    width: number;
    progress: number;
    toggle: number;
    opening: boolean;
}
export interface IMenuAnimation {
    width: number;
    height: number;
}

const special = 1.61803398875;

const snap = (val: number, target: number, distance: number) => Math.abs(val - target) <= distance ? target : val;

@Animated
export default class Menu extends React.Component<IMenuProps, IMenuState> {
    public state = {
        currenth: 0,
        currentw: 0,
        height: 0,
        opening: false,
        progress: 0,
        toggle: 0,
        width: 0,
    };
    private _div: HTMLDivElement;
    private _canAni = true;

    public onPreAnimate(time: number, advance: number, state: IMenuAnimation = { width: 0, height: 0 }): IMenuAnimation {
        return state;
    }

    public onAnimate(time: number, advance: number, state: IMenuAnimation): IMenuAnimation {
        const stepWeight1 = (advance / 75);
        const stepWeight = (advance / 200);
        const stepWeight2 = (advance / 250);

        const { width, height, opening, toggle } = this.state;
        const opened = this.state.currentw > width * .8 && this.state.currenth > height * .8;
        const currentw = snap(
            this.state.currentw + ((this.props.open ? width : 0) - (!opening && opened && this.state.progress > 0 ? 0 : this.state.currentw)) * stepWeight1,
            width,
            1);
        const currenth = snap(
            this.state.currenth + ((this.props.open ? height : 0) - (!opening && opened && this.state.progress > 0 ? 0 : this.state.currenth)) * stepWeight1,
            height,
            1);
        const progress = opening
            ? (opened ? constrain(this.state.progress + special * stepWeight, 0, 1) : this.state.progress)
            : constrain(this.state.progress - special * stepWeight2, 0, 1);
        if (currentw !== this.state.currentw
            || currenth !== this.state.currenth
            || progress !== this.state.progress) {
            this.setState({ currentw, currenth, progress });
        }
        return state;
    }

    public render() {
        const { onClick, disabled, children } = this.props;
        const { accent } = this.props;
        const css = cx('component', { open });
        const accented = accent;
        return (
            <Material
                className={mdc(colors.bg.grey.n50, colors.text.black.dark)}
                onClick={onClick}
                menu
                slim
                style={{ maxWidth: this.state.currentw, maxHeight: this.state.currenth, opacity: this.state.currentw > 3 ? 1 : 0 }}>
                <Content opacity={this.state.progress} onSize={this._height}>
                    {children}
                </Content>
            </Material>
        );
    }

    protected componentWillReceiveProps(nextProps: IMenuProps) {
        if (nextProps.open !== this.props.open) {
            const opening = nextProps.open;
            const toggle = Date.now();
            this.setState({ opening, toggle });
        }
    }

    private _height = (d: ISize) => {
        const width = d.x;
        const height = d.y;
        this.setState({ width, height });
    }
}
